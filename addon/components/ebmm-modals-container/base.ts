import Component from '@glimmer/component';
import { action } from '@ember/object';
import { EbmmConfirmPayload, EbmmDeclinePayload, EbmmModalOptions } from '../../services/modals-manager';

export interface ModalSignature {
  Element: HTMLElement;
  Args: {
    modalIsOpened: boolean;
    options: EbmmModalOptions;
    onConfirm: (v: EbmmConfirmPayload) => void;
    onDecline: (v: EbmmDeclinePayload) => void;
  };
  Blocks: undefined;
}

/**
 * @category Default Modals
 */
export default class BaseModal extends Component<ModalSignature> {
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
