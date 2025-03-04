// BEGIN-SNIPPET alert-custom-demo-controller
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DocsExamplesAlertCustomDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showAlert() {
    this.modalsManager
      .alert({
        titleComponent: 'custom-alert-header',
        title: 'Title',
        bodyComponent: 'custom-alert-body',
        body: 'Body',
        footerComponent: 'custom-alert-footer',
        footer: 'Footer',
      })
      .then(() => {
        // called after user clicks "Yes" in the modal
      });
  }
}
// END-SNIPPET
