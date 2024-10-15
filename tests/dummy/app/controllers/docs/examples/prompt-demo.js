/* eslint-disable @typescript-eslint/no-unused-vars */
// BEGIN-SNIPPET prompt-demo-controller
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DocsExamplesPromptDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showPrompt() {
    this.modalsManager
      .prompt({ title: 'Prompt Title', body: 'Prompt Body' })
      .then((promptValue) => {
        // called after user clicks "Yes" in the modal
        // takes a single argument with user's input value
      })
      .catch(() => {
        // called after user clicks "No" in the modal
      });
  }
}
// END-SNIPPET
