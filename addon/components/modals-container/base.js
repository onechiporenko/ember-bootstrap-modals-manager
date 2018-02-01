import Component from '@ember/component';
import {get} from '@ember/object';
import layout from '../../templates/components/modals-container/base';

/**
 * Base Components for modals. All of them extends this one
 *
 * @class BaseModal
 * @namespace Components
 * @extends Ember.Component
 */
export default Component.extend({
  layout,

  /**
   * @property modalIsOpened
   * @type boolean
   * @default false
   * @private
   * @readonly
   */
  modalIsOpened: false,

  /**
   * @property options
   * @type object
   * @default null
   * @private
   * @readonly
   */
  options: null,

  /**
   * @event onConfirm
   */
  onConfirm: null,

  /**
   * @event onDecline
   */
  onDecline: null,

  actions: {

    /**
     * @method actions.confirm
     * @param {*} [v]
     */
    confirm(v) {
      get(this, 'onConfirm')(v);
    },

    /**
     * @method actions.decline
     * @param {*} [v]
     */
    decline(v) {
      get(this, 'onDecline')(v);
    }
  }
});
