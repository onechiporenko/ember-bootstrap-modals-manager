# Passing Values to Custom Components

Modals making use of Custom Components may pass values to those components by assigning a value to a property of the object passed as an argument when invoking the modal. In the example below

 
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
      .alert({bodyComponent: 'my-custom-body-component', username: 'Jane Doe'})
      .then(() => {
        // called after user clicks "Yes" in the modal
      });
  }
}
{{/docs-snippet}}

Inside the template for the custom component `my-custom-body-component` the value of the `username` may be accessed in the usual way.

{{#docs-snippet name="my-custom-body-component.hbs" title="My Custom Body Component Template"}}
<div>
The users name is : {{@username}}
</div>
{{/docs-snippet}}

Clearly care needs to be taken that the properties used for passing values do not reuse the standard property names used by `ember-bootstrap-modals-manager`. 
