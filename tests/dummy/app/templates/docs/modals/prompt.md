# `prompt`

Similar to the `window.prompt`. It shows modal with two buttons and single input-field.

It's used to get some input from user.

{{#docs-snippet name="show-prompt-modal.js" title="Prompt Modal"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {action, get} from '@ember/object';

export default class PromptModalDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showPrompt() {
    get(this, 'modalsManager')
      .prompt({title: 'Prompt Title', body: 'Prompt Body'})
      .then(promptValue => {
        // called after user clicks "Yes" in the modal
        // takes a single argument with user's input value
      })
      .catch(() => {
        // called after user clicks "No" in the modal
      });
  }
}
{{/docs-snippet}}

Extra option `disallowEmpty` with `true`-value will disable Confirm-button until user input at least something:

{{#docs-snippet name="disallow-empty-prompt.js" title="Settings to disallow empty prompt"}}
modalsManager.prompt({disallowEmpty: true, title: '', body: ''});
{{/docs-snippet}}

## Customization

{{#docs-snippet name="show-custom-prompt-modal.js" title="Custom Prompt Modal"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {action, get} from '@ember/object';

export default class PromptModalDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showPrompt() {
    get(this, 'modalsManager')
      .prompt({
        title: 'Prompt Title',
        body: 'Prompt Body',
        footer: 'Prompt Footer',
        titleComponent: 'custom-prompt-header',
        bodyComponent: 'custom-prompt-body',
        footerComponent: 'custom-prompt-footer'
      })
      .then(promptValue => {})
      .catch(() => {});
  }
}
{{/docs-snippet}}

### Title Component

It takes a single parameter `options`. Its value is an object passed to the `modalsManager.prompt`.

{{docs-snippet name="components-custom-prompt-header.hbs" title="components/custom-prompt-header.hbs"}}

### Body Component

It takes two parameters. First one is an `options` described before. Second one is an action `updatePromptValue`. It's used to update prompted value in the modal-scope. Usage example:

{{docs-snippet name="components-custom-prompt-body.hbs" title="components/custom-prompt-body.hbs"}}

### Footer Component

It takes three parameters. First on is an `options` described before. Second one is an action `confirm` used to confirm modal. Third one is an action `decline` used to decline modal. Both of them may be used like:

{{docs-snippet name="components-custom-prompt-footer.hbs" title="components/custom-prompt-footer.hbs"}}
