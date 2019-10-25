# `alert`

Similar to the `window.alert`. It shows modal with a single button.

It's used to notify user about something.

{{#docs-snippet name="show-alert-modal.js" title="Alert Modal"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {action, get} from '@ember/object';

export default class AlertModalDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showAlert() {
    get(this, 'modalsManager')
      .alert({title: 'Alert Title', body: 'Alert Body'})
      .then(() => {
        // called after user clicks "Yes" in the modal
      });
  }
}
{{/docs-snippet}}


## Customization

{{#docs-snippet name="show-custom-alert-modal.js" title="Custom Alert Modal"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {action, get} from '@ember/object';

export default class AlertModalDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showAlert() {
    get(this, 'modalsManager')
      .alert({
        titleComponent: 'custom-alert-title',
        title: 'Title',
        bodyComponent: 'custom-alert-body',
        body: 'Body',
        footerComponent: 'custom-alert-footer',
        footer: 'Footer'
      })
      .then(() => {});
  }
}
{{/docs-snippet}}

### Title Component

It takes a single parameter `options`. Its value is an object passed to the `modalsManager.alert`.

{{docs-snippet name="components-custom-alert-header.hbs" title="components/custom-alert-header.hbs"}}

### Body Component

It takes a single parameter `options`. Its value is an object passed to the `modalsManager.alert`.

{{docs-snippet name="components-custom-alert-body.hbs" title="components/custom-alert-body.hbs"}}

### Footer Component

It takes two parameters. First one is an `options` described before. Second one is an action `confirm` used to confirm modal. It may be used like:

{{docs-snippet name="components-custom-alert-footer.hbs" title="components/custom-alert-footer.hbs"}}
