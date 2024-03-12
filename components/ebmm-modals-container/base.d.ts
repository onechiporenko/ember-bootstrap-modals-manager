import Component from '@glimmer/component';
import { EbmmConfirmPayload, EbmmDeclinePayload, EbmmModalOptions } from '../../services/modals-manager';
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
    confirm(v: EbmmConfirmPayload): void;
    /**
     * @category Action Handlers
     */
    decline(v: EbmmDeclinePayload): void;
}
//# sourceMappingURL=base.d.ts.map