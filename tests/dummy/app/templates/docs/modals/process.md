# `process`

This modal is used to show a "placeholder" while some process is running. This modal doesn't have any controls like confirm/decline-buttons in the footer or "×" in the header and can't be closed by pressing Esc or clicking somewhere outside a modal. Modal will be confirmed and self-closed after provided promise (`process`) is fulfilled or it will be declined (and self-closed) if it becomes rejected.

{{#docs-snippet name="show-process-modal.js" title="Process Modal"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {action, get} from '@ember/object';
import {Promise} from 'rsvp';

export default class ProcessModalDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showProcessModal() {
    get(this, 'modalsManager')
      .process({
        body: 'Some text goes here',
        iconClass: 'text-center fa fa-spinner fa-spin fa-3x fa-fw',
        title: '',
        // this is required
        process: () => new Promise(resolve => setTimeout(resolve(1), 100))
      })
      .then(result => {
        // called after `process` is resolved
        // here "result" is value of fulfilled Promise
      })
      .catch(error => {
        // called after `process` is rejected
        // here "error" is a reason why last promise was rejected
      });
  }
}
{{/docs-snippet}}

**IMPORTANT** Here `options.process` is a _FUNCTION_ that return Promise!

## Customization

{{#docs-snippet name="show-custom-process-modal.js" title="Custom Process Modal"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {action, get} from '@ember/object';
import {Promise} from 'rsvp';

export default class ProcessModalDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showProcessModal() {
    get(this, 'modalsManager')
      .process({
        bodyComponent: 'custom-process-body',
        headerComponent: 'custom-process-footer',
        footerComponent: 'custom-process-header',
        process: () => new Promise(resolve => setTimeout(resolve(1), 100))
      })
      .then(result => {})
      .catch(error => {});
  }
}
{{/docs-snippet}}

### Title Component

It takes a single parameter `options`. Its value is an object passed to the `modalsManager.process`.

{{docs-snippet name="components-custom-process-header.hbs" title="components/custom-process-header.hbs"}}

### Body Component

It takes a single parameter `options`. Its value is an object passed to the `modalsManager.process`.

{{docs-snippet name="components-custom-process-body.hbs" title="components/custom-process-body.hbs"}}

### Footer Component

It takes a single parameter `options`. Its value is an object passed to the `modalsManager.process`.

{{docs-snippet name="components-custom-process-footer.hbs" title="components/custom-process-footer.hbs"}}
