import BaseModal from './base';
import {get, set} from '@ember/object';
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

  actions: {

    /**
     * @method actions.confirm
     */
    confirm() {
      this._super(get(this, 'promptValue'));
    },

    /**
     * @method actions.updatePromptValue
     * @param {string} val
     */
    updatePromptValue(val) {
      set(this, 'promptValue', val);
    }
  }

});
