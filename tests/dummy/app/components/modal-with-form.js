// BEGIN-SNIPPET modal-with-form
import { tracked } from '@glimmer/tracking';
import BaseModal from 'ember-bootstrap-modals-manager/components/ebmm-modals-container/base';
import {
  validatePresence,
  validateFormat,
} from 'ember-changeset-validations/validators';

const validations = {
  firstName: validatePresence(true),
  lastName: validatePresence(true),
  email: validateFormat({ type: 'email' }),
};

export default class ModalWithForm extends BaseModal {
  validations = validations;

  @tracked
  formData = {
    firstName: '',
    lastName: '',
    email: '',
  };
}
// END-SNIPPET
