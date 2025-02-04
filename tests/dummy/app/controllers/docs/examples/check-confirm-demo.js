// BEGIN-SNIPPET check-confirm-demo-controller
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DocsExamplesCheckConfirmDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showCheckConfirmModal() {
    this.modalsManager
      .checkConfirm({
        title: 'Confirm Title',
        body: 'Confirm your suggestion',
        inputLabel: 'Input Label',
      })
      .then(() => {
        // called after user clicks "Yes" in the modal
      })
      .catch(() => {
        // called after user clicks "No" in the modal
      });
  }
}
// END-SNIPPET
