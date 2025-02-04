import { tracked } from '@glimmer/tracking';

import PromptModal from './prompt';

/**
 * @category Default Modals
 */
export default class CheckConfirmModal extends PromptModal {
  @tracked
  promptValue = false;

  protected readonly simplifiedInput = true;

  protected get confirmDisabled(): boolean {
    return !this.promptValue;
  }
}
