import layout from '../../templates/components/modals-container/progress';
import Base from './base';
import {computed, get, set} from '@ember/object';
import {alias} from '@ember/object/computed';
import {later} from '@ember/runloop';
import {A} from '@ember/array';
import {run} from '@ember/runloop';

/**
 * Here `promises` means functions that return Promise
 *
 * @class ProgressModal
 * @namespace Components
 * @extends Components.BaseModal
 */
export default Base.extend({

  layout,

  /**
   * Number of fulfilled promises
   *
   * @property done
   * @type number
   * @default 0
   * @private
   */
  done: 0,

  /**
   * Number of promises
   *
   * This value is set initially and must be used instead of `promises.length`,
   * because `promises`-array is changed while execution
   *
   * @property promisesCount
   * @type number
   * @default 0
   * @private
   */
  promisesCount: 0,

  /**
   * @property results
   * @type array
   * @default []
   * @private
   */
  results: computed(function () {
    return A([]);
  }),

  /**
   * List of promises to fulfill
   *
   * @property promises
   * @type {Promise[]}
   * @default null
   * @private
   * @readonly
   */
  promises: alias('options.promises'),

  /**
   * @property progress
   * @type number
   * @default 0
   * @private
   * @readonly
   */
  progress: computed('done', 'promisesCount', function () {
    const done = get(this, 'done');
    const promisesCount = get(this, 'promisesCount');
    if (!promisesCount) {
      return 100;
    }
    return done / promisesCount * 100;
  }),

  didInsertElement() {
    const promises = get(this, 'promises');
    set(this, 'promisesCount', get(promises, 'length'));
    if (promises && promises.length) {
      this.next(get(this, 'promises').shift());
    }
  },

  /**
   * @method next
   * @param {PromiseFactory} promiseFactory
   * @private
   */
  next(promiseFactory) {
    promiseFactory()
      .then(result => {
        run(() => {
          get(this, 'results').pushObject(result);
          this.incrementProperty('done');
        });
        const promises = get(this, 'promises');
        if (promises.length) {
          this.next(promises.shift());
        }
        else {
          // wait for last "tick" animation
          later(() => this.send('confirm', get(this, 'results')), 500);
        }
        return result;
      })
      .catch(error => {
        this.send('decline', [get(this, 'results'), error]);
        return error;
      });
  }

});