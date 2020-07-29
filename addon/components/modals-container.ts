import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import ModalsManager, {
  EbmmConfirmPayload, EbmmDeclinePayload,
  EbmmModalOptions
} from '../services/modals-manager';

class ModalsContainer<T> extends Component {

  @service
  protected modalsManager: ModalsManager<T>;

  @readOnly('modalsManager.options')
  protected readonly options: EbmmModalOptions;

  @readOnly('modalsManager.modalIsOpened')
  protected readonly modalIsOpened: boolean;

  @readOnly('modalsManager.componentName')
  protected readonly componentName: string;

  @action
  confirm(v: EbmmConfirmPayload): void {
    this.modalsManager.onConfirmClick(v);
  }

  @action
  decline(v: EbmmDeclinePayload): void {
    this.modalsManager.onDeclineClick(v);
  }
}

export default ModalsContainer;
