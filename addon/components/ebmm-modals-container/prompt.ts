import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

import { type EbmmConfirmPayload } from '../../services/modals-manager';
import BaseModal from './base';

/**
 * @category Default Modals
 */
export default class PromptModal extends BaseModal {
  @tracked
  promptValue: EbmmConfirmPayload = '';

  inputType = 'text';

  protected get confirmDisabled(): boolean {
    return this.args.options.disallowEmpty ? isEmpty(this.promptValue) : false;
  }

  /**
   * @category Action Handlers
   */
  @action
  confirm(): void {
    super.confirm(this.promptValue);
  }

  /**
   * @category Action Handlers
   */
  @action
  updatePromptValue(val: string): void {
    this.promptValue = val;
  }
}
