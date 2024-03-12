import BaseModal from './base';
import { EbmmConfirmPayload } from '../../services/modals-manager';
/**
 * @category Default Modals
 */
export default class PromptModal extends BaseModal {
    promptValue: EbmmConfirmPayload;
    inputType: string;
    protected get confirmDisabled(): boolean;
    /**
     * @category Action Handlers
     */
    confirm(): void;
    /**
     * @category Action Handlers
     */
    updatePromptValue(val: string): void;
}
//# sourceMappingURL=prompt.d.ts.map