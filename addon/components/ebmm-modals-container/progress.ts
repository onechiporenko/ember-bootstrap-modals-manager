import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import RSVP from 'rsvp';
import Base, { ModalArgs } from './base';
import {
  EbmmConfirmPayload,
  EbmmDeclinePayload,
  EbmmPromiseFactory,
} from '../../services/modals-manager';

export default class ProgressModal<T> extends Base {
  /**
   * Number of fulfilled promises
   *
   * @property done
   * @type number
   * @default 0
   */
  @tracked
  protected done = 0;

  /**
   * Number of promises
   *
   * This value is set initially and must be used instead of `promises.length`,
   * because `promises`-array is changed while execution
   *
   * @property promisesCount
   * @type number
   * @default 0
   */
  @tracked
  protected promisesCount = 0;

  /**
   * @property canceled
   * @type boolean
   * @default false
   */
  @tracked
  protected canceled = false;

  protected get settled(): boolean {
    return this.args.options.settled ? this.args.options.settled : false;
  }

  protected errors = A<EbmmDeclinePayload>([]);

  protected results = A<EbmmConfirmPayload>([]);

  protected get promises(): EbmmPromiseFactory[] {
    return this.args.options.promises ? this.args.options.promises : A([]);
  }

  get progress(): number {
    if (!this.promisesCount) {
      return 100;
    }
    return (this.done / this.promisesCount) * 100;
  }

  constructor(owner: unknown, args: ModalArgs) {
    super(owner, args);
    this.initProgress();
  }

  @action
  cancel(): void {
    this.canceled = true;
  }

  initProgress(): void {
    this.promisesCount = this.promises.length;
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
      .catch((error) => {
        if (this.settled) {
          this.errors.pushObject(error);
          this._next();
        } else {
          this.decline([this.results, error]);
        }
        return error;
      });
  }

  _next(result?: EbmmConfirmPayload): void {
    run(() => {
      if (arguments.length === 1) {
        this.results.pushObject(result);
      }
      this.done++;
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
    later(
      () =>
        this.confirm(this.settled ? [this.results, this.errors] : this.results),
      500
    );
  }
}
