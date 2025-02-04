// BEGIN-SNIPPET confirm-custom-demo-controller
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DocsExamplesConfirmCustomDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showConfirm() {
    this.modalsManager
      .confirm({
        title: 'Confirm Title',
        body: 'Confirm Body',
        footer: 'Confirm Footer',
        titleComponent: 'custom-confirm-header',
        bodyComponent: 'custom-confirm-body',
        footerComponent: 'custom-confirm-footer',
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
