import PromptModal from './prompt';
/**
 * @category Default Modals
 */
export default class CheckConfirmModal extends PromptModal {
    promptValue: boolean;
    protected readonly simplifiedInput = true;
    protected get confirmDisabled(): boolean;
}
//# sourceMappingURL=check-confirm.d.ts.map