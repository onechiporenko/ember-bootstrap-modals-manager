// BEGIN-SNIPPET confirm-demo-controller
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DocsExamplesConfirmDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showConfirm() {
    this.modalsManager
      .confirm({ title: 'Confirm Title', body: 'Confirm Body' })
      .then(() => {
        // called after user clicks "Yes" in the modal
      })
      .catch(() => {
        // called after user clicks "No" in the modal
      });
  }
}
// END-SNIPPET
