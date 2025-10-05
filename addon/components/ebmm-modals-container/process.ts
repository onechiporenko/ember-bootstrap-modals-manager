import {
  type EbmmConfirmPayload,
  type EbmmDeclinePayload,
} from '../../services/modals-manager';
import Base, { type ModalArgs } from './base';

/**
 * @category Default Modals
 */
export default class ProcessModal extends Base {
  constructor(owner: unknown, args: ModalArgs) {
    super(owner, args);
    this.initProcess();
  }

  initProcess(): void {
    const process = this.args.options.process;
    if (process) {
      process()
        .then((v: EbmmConfirmPayload): void => this.confirm(v))
        .catch((e: EbmmDeclinePayload): void => this.decline(e));
    }
  }
}
