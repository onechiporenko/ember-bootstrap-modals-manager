// BEGIN-SNIPPET components-modal-with-form.js
import { tracked } from '@glimmer/tracking';
import BaseModal from './ebmm-modals-container/base';
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
