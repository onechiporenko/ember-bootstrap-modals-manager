import BaseModal from './base';
import {computed, get, set} from '@ember/object';
import {isEmpty} from '@ember/utils';
import layout from '../../templates/components/modals-container/prompt';

/**
 * Prompt-modal
 *
 * @class PromptModal
 * @namespace Components
 * @extends Components.BaseModal
 */
export default BaseModal.extend({
  layout,

  /**
   * @property promptValue
   * @type string
   * @default ''
   * @private
   * @readonly
   */
  promptValue: '',

  /**
   * @property inputType
   * @type string
   * @default 'text'
   * @private
   * @readonly
   */
  inputType: 'text',

  /**
   * @property confirmDisabled
   * @type boolean
   * @default true
   * @private
   * @readonly
   */
  confirmDisabled: computed('promptValue', 'options.disallowEmpty', function () {
    return get(this, 'options.disallowEmpty') ? isEmpty(get(this, 'promptValue')) : false;
  }),

  actions: {

    /**
     * @method actions.confirm
     */
    confirm() {
      this._super(get(this, 'promptValue'));
    },

    /**
     * @method actions.updatePromptValue
     * @param {*} val
     */
    updatePromptValue(val) {
      set(this, 'promptValue', val);
    }
  }

});
