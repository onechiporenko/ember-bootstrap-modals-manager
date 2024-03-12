import Component from '@glimmer/component';
import ModalsManager, { EbmmConfirmPayload, EbmmDeclinePayload } from '../services/modals-manager';
export default class ModalsContainer<T> extends Component {
    protected modalsManager: ModalsManager<T>;
    /**
     * @category Action Handlers
     */
    confirm(v: EbmmConfirmPayload): void;
    /**
     * @category Action Handlers
     */
    decline(v: EbmmDeclinePayload): void;
}
//# sourceMappingURL=modals-container.d.ts.map