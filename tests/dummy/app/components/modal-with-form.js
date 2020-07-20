// BEGIN-SNIPPET components-modal-with-form.js
import { layout as templateLayout } from '@ember-decorators/component';
import BaseModal from './ebmm-modals-container/base';
import layout from '../templates/components/modal-with-form';
import { validator, buildValidations } from 'ember-cp-validations';
import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default
@templateLayout(layout)
class ModalWithForm extends BaseModal {

  @computed()
  get formData () {
    const Validations = buildValidations({
      firstName: validator('presence', true),
      lastName: validator('presence', true),
      email: [
        validator('presence', true),
        validator('format', {
          type: 'email'
        })
      ]
    });
    return EmberObject
      .extend(Validations, {})
      .create(getOwner(this).ownerInjection());
  }

}
// END-SNIPPET
