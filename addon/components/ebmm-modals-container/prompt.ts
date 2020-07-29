import { tracked } from '@glimmer/tracking';
import { action, computed, set } from '@ember/object';
import { isEmpty } from '@ember/utils';
import BaseModal from './base';
import { EbmmConfirmPayload } from '../../services/modals-manager';

/**
 * Prompt-modal
 *
 * @class PromptModal
 * @namespace Components
 * @extends Components.BaseModal
 */
export default class PromptModal extends BaseModal {

  @tracked
  promptValue: EbmmConfirmPayload = '';

  inputType = 'text';

  @computed('promptValue', 'args.options.disallowEmpty')
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
    set(this, 'promptValue', val);
  }

}
