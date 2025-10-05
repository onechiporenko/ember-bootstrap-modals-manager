import { A } from '@ember/array';
import { action } from '@ember/object';
import { runTask } from 'ember-lifeline';
import RSVP from 'rsvp';
import { tracked, TrackedArray } from 'tracked-built-ins';

import {
  type EbmmConfirmPayload,
  type EbmmDeclinePayload,
  type EbmmPromiseFactory,
} from '../../services/modals-manager';
import Base, { type ModalArgs } from './base';
import type Owner from '@ember/owner';

const noResult = Symbol('no-result');

/**
 * @category Default Modals
 */
export default class ProgressModal<T> extends Base {
  /**
   * Number of fulfilled promises
   */
  @tracked
  protected done = 0;

  /**
   * Number of promises
   *
   * This value is set initially and must be used instead of `promises.length`,
   * because `promises`-array is changed while execution
   */
  @tracked
  protected promisesCount = 0;

  @tracked
  protected canceled = false;

  protected get settled(): boolean {
    return this.args.options.settled ? this.args.options.settled : false;
  }

  @tracked
  protected errors = new TrackedArray<EbmmDeclinePayload>([]);

  @tracked
  protected results = new TrackedArray<EbmmConfirmPayload>([]);

  protected get promises(): EbmmPromiseFactory[] {
    return this.args.options.promises ? this.args.options.promises : A([]);
  }

  get progress(): number {
    if (!this.promisesCount) {
      return 100;
    }
    return (this.done / this.promisesCount) * 100;
  }

  constructor(owner: Owner, args: ModalArgs) {
    super(owner, args);
    this.initProgress();
  }

  /**
   * @category Action Handlers
   */
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
          this.errors.push(error);
          this._next(noResult);
        } else {
          this.decline([this.results, error]);
        }
        return error;
      });
  }

  _next(result: unknown): void {
    runTask(this, () => {
      if (result !== noResult) {
        this.results.push(result);
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
    runTask(
      this,
      () =>
        this.confirm(this.settled ? [this.results, this.errors] : this.results),
      500,
    );
  }
}
