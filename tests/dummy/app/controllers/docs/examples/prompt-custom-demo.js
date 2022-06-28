// BEGIN-SNIPPET prompt-custom-demo-controller
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DocsExamplesPromptCustomDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showPrompt() {
    this.modalsManager
      .prompt({
        title: 'Prompt Title',
        body: 'Prompt Body',
        footer: 'Prompt Footer',
        titleComponent: 'custom-prompt-header',
        bodyComponent: 'custom-prompt-body',
        footerComponent: 'custom-prompt-footer',
      })
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
