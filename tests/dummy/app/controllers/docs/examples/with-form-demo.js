// BEGIN-SNIPPET with-form-demo-controller
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DocsExamplesWithFormDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showModalWithForm() {
    return this.modalsManager
      .show('modal-with-form')
      .then((formValues) => {
        // form is submitted
        // here `formValues` is an object with values from inputs
      })
      .catch(() => {
        // modal is closed without submit
      });
  }
}
// END-SNIPPET
