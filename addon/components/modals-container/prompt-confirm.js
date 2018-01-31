import PromptModal from './prompt';
import {computed, get} from '@ember/object';
import layout from '../../templates/components/modals-container/prompt';

/**
 * Prompt-confirm-modal
 *
 * @class PromptConfirmModal
 * @namespace Components
 * @extends Components.PromptModal
 */
export default PromptModal.extend({
  layout,

  /**
   * @property confirmDisabled
   * @type boolean
   * @default true
   * @private
   * @readonly
   */
  confirmDisabled: computed('promptValue', 'options.promptValue', function () {
    return get(this, 'promptValue') !== get(this, 'options.promptValue');
  })
});
