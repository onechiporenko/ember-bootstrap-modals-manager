// BEGIN-SNIPPET alert-demo-controller
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DocsExamplesAlertDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showAlert() {
    this.modalsManager
      .alert({ title: 'Alert Title', body: 'Alert Body' })
      .then(() => {
        // called after user clicks "Yes" in the modal
      });
  }
}
// END-SNIPPET
