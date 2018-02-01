import Component from '@ember/component';
import layout from '../templates/components/modals-container';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';
import {readOnly} from '@ember/object/computed';

/**
 * You should place this component in the `application.hbs`:
 *
 * ```hbs
 * {{modals-container}}
 * ```
 *
 * That's all what you have to do with it
 *
 * @class ModalsContainer
 * @namespace Components
 * @extends Ember.Component
 */
export default Component.extend({
  layout,

  /**
   * @property modalsManager
   * @type Services.ModalsManager
   * @private
   * @readonly
   */
  modalsManager: service(),

  /**
   * @property options
   * @type object
   * @private
   * @readonly
   */
  options: readOnly('modalsManager.options'),

  /**
   * @property modalIsOpened
   * @type boolean
   * @default false
   * @private
   * @readonly
   */
  modalIsOpened: readOnly('modalsManager.modalIsOpened'),

  /**
   * @property componentName
   * @type string
   * @default null
   * @private
   * @readonly
   */
  componentName: readOnly('modalsManager.componentName'),

  actions: {

    /**
     * @method actions.confirm
     * @param {*} [v]
     */
    confirm(v) {
      get(this, 'modalsManager').onConfirmClick(v);
    },

    /**
     * @method actions.decline
     * @param {*} [v]
     */
    decline(v) {
      get(this, 'modalsManager').onDeclineClick(v);
    }
  }
});
