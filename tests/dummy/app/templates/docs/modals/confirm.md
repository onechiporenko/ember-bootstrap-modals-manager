# `confirm`

Similar to the `window.confirm`. It shows modal with two buttons ("Yes" and "No").

It's used to the ask user about confirmation for some action.

{{#docs-snippet name="show-confirm-modal.js" title="Confirm Modal"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Controller.extend({
  modalsManager: service(),

  actions: {
    showConfirm() {
      get(this, 'modalsManager')
        .confirm({title: 'Confirm Title', body: 'Confirm Body'})
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

{{#docs-snippet name="show-custom-confirm-modal.js" title="Custom Confirm Modal"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Controller.extend({
  modalsManager: service(),

  actions: {
    showConfirm() {
      get(this, 'modalsManager')
        .confirm({
          title: 'Confirm Title',
          body: 'Confirm Body',
          footer: 'Confirm Footer',
          titleComponent: 'custom-confirm-title',
          bodyComponent: 'custom-confirm-body',
          footerComponent: 'custom-confirm-footer'
        })
        .then(() => {})
        .catch(() => {});
    }
  }
});
{{/docs-snippet}}

### Title Component

It takes a single parameter `options`. Its value is an object passed to the `modalsManager.confirm`.

{{docs-snippet name="components-custom-confirm-header.hbs" title="components/custom-confirm-header.hbs"}}

### Body Component

It takes a single parameter `options`. Its value is an object passed to the `modalsManager.confirm`.

{{docs-snippet name="components-custom-confirm-body.hbs" title="components/custom-confirm-body.hbs"}}

### Footer Component

It takes three parameters. First on is an `options` described before. Second one is an action `confirm` used to confirm modal. Third one is an action `decline` used to decline modal. Both of them may be used like:

{{docs-snippet name="components-custom-confirm-footer.hbs" title="components/custom-confirm-footer.hbs"}}