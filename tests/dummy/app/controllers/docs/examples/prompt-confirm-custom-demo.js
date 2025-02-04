/* eslint-disable @typescript-eslint/no-unused-vars */
// BEGIN-SNIPPET prompt-confirm-custom-demo-controller
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DocsExamplesPromptConfirmCustomDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showPromptConfirm() {
    this.modalsManager
      .promptConfirm({
        title: 'Prompt Confirm Title',
        body: 'Say "password" and come in',
        footer: 'Prompt Confirm Footer',
        titleComponent: 'custom-prompt-confirm-header',
        bodyComponent: 'custom-prompt-confirm-body',
        footerComponent: 'custom-prompt-confirm-footer',
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
