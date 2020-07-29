import { tryInvoke } from '@ember/utils';
import Base, { ModalArgs } from './base';
import { EbmmConfirmPayload, EbmmDeclinePayload } from '../../services/modals-manager';

/**
 * Here `process` means function thar return Promise
 *
 * @class Process
 * @namespace Components
 * @extends Components.BaseModal
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
        .then((v: EbmmConfirmPayload): void => tryInvoke(this, 'confirm', [v]))
        .catch((e: EbmmDeclinePayload): void => tryInvoke(this, 'decline', [e]));
    }
  }
}

