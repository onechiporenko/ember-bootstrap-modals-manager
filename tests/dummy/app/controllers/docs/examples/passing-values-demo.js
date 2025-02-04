// BEGIN-SNIPPET passing-values-demo-controller
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import BodyWithCustomOptions from '../../../components/body-with-custom-options';

export default class DocsExamplesPassingValuesDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showAlertWithCustomOptions() {
    this.modalsManager
      .alert({
        bodyComponent: BodyWithCustomOptions,
        username: 'Jane Doe',
      })
      .then(() => {
        // called after user clicks "Yes" in the modal
      });
  }
}
// END-SNIPPET
