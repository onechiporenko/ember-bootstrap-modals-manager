import { tracked } from '@glimmer/tracking';
import { action, computed, set } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { later } from '@ember/runloop';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { tryInvoke } from '@ember/utils';
import RSVP from 'rsvp';
import Base, { ModalArgs } from './base';
import {
  EbmmConfirmPayload,
  EbmmDeclinePayload,
  EbmmPromiseFactory
} from '../../services/modals-manager';

/**
 * Here `promises` means functions that return Promise
 *
 * @class ProgressModal
 * @namespace Components
 * @extends Components.BaseModal
 */
export default class ProgressModal<T> extends Base {

  /**
   * Number of fulfilled promises
   * @type number
   */
  @tracked
  done = 0;

  /**
   * Number of promises
   *
   * This value is set initially and must be used instead of `promises.length`,
   * because `promises`-array is changed while execution
   *
   * @type number
   */
  @tracked
  promisesCount = 0;

  /**
   * @type boolean
   */
  canceled = false;

  /**
   * @type boolean
   */
  @readOnly('args.options.settled')
  protected readonly settled: boolean;

  /**
   * @type EbmmDeclinePayload[]
   */
  protected errors = A<EbmmDeclinePayload>([]);

  /**
   * @type EbmmConfirmPayload[]
   */
  protected results = A<EbmmConfirmPayload>([]);

  /**
   * List of promises to fulfill
   */
  @readOnly('args.options.promises')
  protected readonly promises: EbmmPromiseFactory[];

  /**
   * @type number
   */
  @computed('done', 'promisesCount')
  get progress(): number {
    if (!this.promisesCount) {
      return 100;
    }
    return this.done / this.promisesCount * 100;
  }

  constructor(owner: unknown, args: ModalArgs) {
    super(owner, args);
    this.initProgress();
  }

  @action
  cancel(): void {
    set(this, 'canceled', true);
  }

  initProgress(): void {
    set(this, 'promisesCount', this.promises.length);
    const promise = this.promises.shift();
    if (promise) {
      void this.next(promise);
    }
  }

  next(promiseFactory: EbmmPromiseFactory): RSVP.Promise<T> | void {
    if (this.canceled) {
      return this._complete();
    }
    return promiseFactory()
      .then((result: T) => {
        this._next(result);
        return result;
      })
      .catch(<EmmiDeclinePayload>(error: EmmiDeclinePayload): EmmiDeclinePayload => {
        if (this.settled) {
          this.errors.pushObject(error);
          this._next();
        } else {
          tryInvoke(this, 'decline', [[this.results, error]]);
        }
        return error;
      });
  }

  _next(result?: EbmmConfirmPayload): void {
    run(() => {
      if (arguments.length === 1) {
        this.results.pushObject(result);
      }
      set(this, 'done', this.done + 1);
    });
    const promise = this.promises.shift();
    if (promise) {
      void this.next(promise);
    } else {
      // wait for last "tick" animation
      this._complete();
    }
  }

  _complete(): void {
    later(() => tryInvoke(this, 'confirm', this.settled ? [[this.results, this.errors]] : [this.results]), 500);
  }

}
