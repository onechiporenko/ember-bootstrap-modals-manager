# `promptConfirm`

Almost the same as `prompt`, however its "Yes"-button is disabled until user write needed value to the input-field.

As a `confirm` it's used to the ask user about confirmation for some action, but it's more demanding.

{{#docs-snippet name="show-prompt-confirm-modal.js" title="Prompt Confirm Modal"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Controller.extend({
  modalsManager: service(),

  actions: {
    showPromptConfirm() {
      get(this, 'modalsManager')
        .promptConfirm({
          title: 'Prompt Confirm Title',
          body: 'Say "password" and come in',
          promptValue: 'password' // it's required
        })
        .then(promptValue => {
          // called after user clicks "Yes" in the modal
          // "Yes" will be active only when user prints "password" in the input-field
          // takes a single argument with user input value
        })
        .catch(() => {
          // called after user clicks "No" in the modal
        });
    }
  }
});
{{/docs-snippet}}

## Customization

{{#docs-snippet name="show-custom-prompt-confirm-modal.js" title="Custom Prompt Confirm Modal"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Controller.extend({
  modalsManager: service(),

  actions: {
    showPromptConfirm() {
      get(this, 'modalsManager')
        .promptConfirm({
          title: 'Prompt Confirm Title',
          body: 'Say "password" and come in',
          footer: 'Prompt Confirm Footer',
          titleComponent: 'custom-prompt-confirm-header',
          bodyComponent: 'custom-prompt-confirm-body',
          footerComponent: 'custom-prompt-confirm-footer',
          promptValue: 'password' // it's required
        })
        .then(promptValue => {})
        .catch(() => {});
    }
  }
});
{{/docs-snippet}}

### Title Component

It takes a single parameter `options`. Its value is an object passed to the `modalsManager.promptConfirm`.

{{docs-snippet name="components-custom-prompt-confirm-header.hbs" title="components/custom-prompt-confirm-header.hbs"}}

### Body Component

It takes two parameters. First one is an `options` described before. Second one is an action `updatePromptValue`. It's used to update prompted value in the modal-scope. Usage example:

{{docs-snippet name="components-custom-prompt-confirm-body.hbs" title="components/custom-prompt-confirm-body.hbs"}}

### Footer Component

It takes four parameters. First one is an `options` described before. Second one is a `confirmDisabled`. This flag determines if confirm-button should be disabled. Last two are actions `confirm` and `decline` used as click-handler for "Yes" and "No" buttons. Usage example:

{{docs-snippet name="components-custom-prompt-confirm-footer.hbs" title="components/custom-prompt-confirm-footer.hbs"}}