import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import ModalsManager, {
  EbmmConfirmPayload,
  EbmmDeclinePayload,
} from '../services/modals-manager';

export default class ModalsContainer<T> extends Component {
  @service
  protected modalsManager!: ModalsManager<T>;

  @action
  confirm(v: EbmmConfirmPayload): void {
    this.modalsManager.onConfirmClick(v);
  }

  @action
  decline(v: EbmmDeclinePayload): void {
    this.modalsManager.onDeclineClick(v);
  }
}
