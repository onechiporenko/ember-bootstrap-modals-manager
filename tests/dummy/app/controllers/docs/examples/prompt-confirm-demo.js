/* eslint-disable @typescript-eslint/no-unused-vars */
// BEGIN-SNIPPET prompt-confirm-demo-controller
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DocsExamplesPromptConfirmDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showPromptConfirm() {
    this.modalsManager
      .promptConfirm({
        title: 'Prompt Confirm Title',
        body: 'Say "password" and come in',
        promptValue: 'password', // it's required
      })
      .then((promptValue) => {
        // called after user clicks "Yes" in the modal
        // "Yes" will be active only when user prints "password" in the input-field
        // takes a single argument with user input value
      })
      .catch(() => {
        // called after user clicks "No" in the modal
      });
  }
}
// END-SNIPPET
