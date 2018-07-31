# `checkConfirm`

Almost same as `promptConfirm` however it contains a checkbox instead of text-field. "Yes"-button is disabled until checkbox is not checked.

{{#docs-snippet name="show-check-confirm-modal.js" title="Check Confirm Modal"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Controller.extend({
  modalsManager: service(),

  actions: {
    showCheckConfirmModal() {
      get(this, 'modalsManager')
        .checkConfirm({
          title: 'Confirm Title',
          body: 'Confirm your suggestion',
          inputLabel: 'Input Label'
        })
        .then(() => {
          // called after user clicks "Yes" in the modal
        })
        .catch(() => {
          // called after user clicks "No" in the modal
        });
    }
  }
});
{{/docs-snippet}}

## Customization

{{#docs-snippet name="show-custom-check-confirm-modal.js" title="Custom Check Confirm Modal"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Controller.extend({
  modalsManager: service(),

  actions: {
    showCheckConfirm() {
      get(this, 'modalsManager')
        .checkConfirm({
          title: 'Check Confirm Title',
          footer: 'Prompt Confirm Footer',
          titleComponent: 'custom-check-confirm-header',
          bodyComponent: 'custom-check-confirm-body',
          footerComponent: 'custom-check-confirm-footer'
        })
        .then(() => {})
        .catch(() => {});
    }
  }
});
{{/docs-snippet}}

### Title Component

It takes a single parameter `options`. Its value is an object passed to the `modalsManager.prompt`.

{{docs-snippet name="components-custom-check-confirm-header.hbs" title="components/custom-check-confirm-header.hbs"}}

### Body Component

It takes two parameters. First one is an `options` described before. Second one is an action `updatePromptValue`. It's used to update prompted value in the modal-scope. Usage example:

{{docs-snippet name="components-custom-check-confirm-body.hbs" title="components/custom-check-confirm-body.hbs"}}

### Footer Component

It takes four parameters. First one is an `options` described before. Second one is a `confirmDisabled`. This flag determines if confirm-button should be disabled. Last two are actions `confirm` and `decline` used as click-handler for "Yes" and "No" buttons. Usage example:

{{docs-snippet name="components-custom-check-confirm-footer.hbs" title="components/custom-check-confirm-footer.hbs"}}