// BEGIN-SNIPPET check-confirm-custom-demo-controller
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DocsExamplesCheckConfirmCustomDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showCheckConfirm() {
    this.modalsManager
      .checkConfirm({
        title: 'Check Confirm Title',
        footer: 'Prompt Confirm Footer',
        titleComponent: 'custom-check-confirm-header',
        bodyComponent: 'custom-check-confirm-body',
        footerComponent: 'custom-check-confirm-footer',
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
