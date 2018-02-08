import PromptModal from './prompt';
import {not} from '@ember/object/computed';
import layout from '../../templates/components/modals-container/prompt';

/**
 * Check-confirm-modal
 *
 * @class CheckConfirmModal
 * @namespace Components
 * @extends Components.PromptModal
 */
export default PromptModal.extend({
  layout,

  /**
   * @property promptValue
   * @type boolean
   * @default false
   * @private
   * @readonly
   */
  promptValue: false,

  /**
   * @property simplifiedInput
   * @type boolean
   * @default true
   * @private
   * @readonly
   */
  simplifiedInput: true,

  /**
   * @property confirmDisabled
   * @type boolean
   * @default true
   * @private
   * @readonly
   */
  confirmDisabled: not('promptValue')
});
