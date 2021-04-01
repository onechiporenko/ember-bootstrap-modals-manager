# Modal With Form

Let's create a modal with form. It'll be a component called `modal-with-form`.

Any modal that extends `components/modals-container/base` can be managed with `modals-manager`:

{{#docs-snippet name="skeleton-for-new-modal-js" title="Skeleton for the new Modal (JS)"}}
import BaseModal from './ebmm-modals-container/base';

export default class ModalWithForm extends BaseModal {
  
}
{{/docs-snippet}}

{{#docs-snippet name="skeleton-for-new-modal-hbs" title="Skeleton for the new Modal (HBS)"}}
<BsModal
  @open={{modalIsOpened}}
  @onSubmit={{fn this.confirm}}
  @onHide={{fn this.decline}}
as |modal|>
  <modal.header />
  <modal.body />
  <modal.footer />
</BsModal>
{{/docs-snippet}}

Attribute `modalIsOpened` is declared in the `Base`-modal. Its value is set in the modals-manager and represents modal's state (is it opened or closed). Action handlers `confirm` and `decline` are used to "proceed" modal. Both of them are also declared in the `Base`-modal. Confirmation can be done by clicking on "confirm" button (e.g. 'OK', 'Yes', 'Confirm' etc). Any other modal-closing is going to be processed as "decline".

Footer for modal is going to by like this:

{{#docs-snippet name="modal-footer-hbs" title="Modal's footer"}}
<BsModal
@open={{modalIsOpened}}
@onSubmit={{fn this.confirm}}
@onHide={{fn this.decline}}
as |modal|>
  <modal.footer>
    <BsButton @onClick=modal.close @type="default">Cancel</BsButton>
    <BsButton @onClick=modal.submit @type="success">Create</BsButton>
  </modal.footer>
</BsModal>
{{/docs-snippet}}

It has two buttons - Create and Cancel. First one is 'Confirm' and second one is 'Decline'. Click-handlers for them are taken from `modal`-hash.

Finally, let's add a form to the modal's body. It's going to be not a simple form and a form with validations. So, extra addon called `ember-bootstrap-changeset-validations` is used. It can be installed with next command:
 
{{#docs-snippet name="install-ember-bootstrap-cp-validations"}}
ember i ember-bootstrap-changeset-validations
{{/docs-snippet}}
 
Forms in the `ember-bootstrap` require `model`-property. It can be a model from your application or any other object. Let's create a property called `formData` in the component `modal-with-form`:

{{docs-snippet name="components-modal-with-form.js" title="components/modal-with-form.js"}}

Here validations are added "in-place" where object is defined. More about validations is in the [ember-bootstrap-changeset-validations#usage](https://github.com/kaliber5/ember-bootstrap-changeset-validations#usage) and [ember-changeset#usage](https://github.com/poteto/ember-changeset#usage) itself.

Modal's body with form is:

{{docs-snippet name="components-modal-with-form.hbs" title="templates/components/modal-with-form.hbs"}}

Form has three inputs for fields `firstName`, `lastName` and `email`. All of them are described in the `formData` and has validation requirements.

**Important** `onSubmit`-handler is `(action "confirm")` and not `modal.submit`!  

Full component's example you can check on {{#link-to "demo"}}demo page{{/link-to}}. 

> Form from `modal.body` can be moved to the separated component. In this case "submit"-handler should be passed on it and `formData` should be declared in the new form-component and not in the modal.

Last question is how to use this modal with `modals-manager`? It can be used with method `show`:
 
{{#docs-snippet name="modal-with-form-usage" title="Using of created modal"}}
import Controller from '@ember/controller';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class ModalWithFormDemoController extends Controller {
  @service()
  modalsManager;
  
  @action
  showModalWithForm() {
    return this.modalsManager
      .show('modal-with-form')
      .then(formValues => {
        // form is submitted
        // here `formValues` is an object with values from inputs
      })
      .catch(() => {
        // modal is closed without submit
      });
  }
}
{{/docs-snippet}}
