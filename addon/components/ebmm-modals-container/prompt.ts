import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import BaseModal from './base';
import { EbmmConfirmPayload } from '../../services/modals-manager';

export default class PromptModal extends BaseModal {
  @tracked
  promptValue: EbmmConfirmPayload = '';

  inputType = 'text';

  protected get confirmDisabled(): boolean {
    return this.args.options.disallowEmpty ? isEmpty(this.promptValue) : false;
  }

  /**
   * @event confirm
   */
  @action
  confirm(): void {
    super.confirm(this.promptValue);
  }

  /**
   * @event updatePromptValue
   * @param {*} val
   */
  @action
  updatePromptValue(val: string): void {
    this.promptValue = val;
  }
}
