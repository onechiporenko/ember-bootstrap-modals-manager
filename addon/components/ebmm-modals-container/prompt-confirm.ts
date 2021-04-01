import PromptModal from './prompt';

export default class PromptConfirmModal extends PromptModal {
  get confirmDisabled(): boolean {
    return this.promptValue !== this.args.options.promptValue;
  }
}
