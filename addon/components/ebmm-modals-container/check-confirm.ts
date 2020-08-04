import { tracked } from '@glimmer/tracking';
import PromptModal from './prompt';
import { not } from '@ember/object/computed';

export default class CheckConfirmModal extends PromptModal {

  @tracked
  promptValue = false;

  protected readonly simplifiedInput = true;

  @not('promptValue')
  protected readonly confirmDisabled: boolean;
}
