import PromptModal from './prompt';

/**
 * @category Default Modals
 */
export default class PromptConfirmModal extends PromptModal {
  get confirmDisabled(): boolean {
    return this.promptValue !== this.args.options.promptValue;
  }
}
