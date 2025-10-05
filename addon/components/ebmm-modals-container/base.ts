import { action } from '@ember/object';
import Component from '@glimmer/component';

import {
  type EbmmConfirmPayload,
  type EbmmDeclinePayload,
  type EbmmModalOptions,
} from '../../services/modals-manager';

export interface ModalArgs {
  modalIsOpened: boolean;
  options: EbmmModalOptions;
  onConfirm: (v: EbmmConfirmPayload) => void;
  onDecline: (v: EbmmDeclinePayload) => void;
}

/**
 * @category Default Modals
 */
export default class BaseModal extends Component<ModalArgs> {
  /**
   * @category Action Handlers
   */
  @action
  confirm(v: EbmmConfirmPayload): void {
    this.args.onConfirm(v);
  }

  /**
   * @category Action Handlers
   */
  @action
  decline(v: EbmmDeclinePayload): void {
    this.args.onDecline(v);
  }
}
