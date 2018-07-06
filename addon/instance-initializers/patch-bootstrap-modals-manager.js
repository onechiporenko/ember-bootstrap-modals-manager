import {get, setProperties} from '@ember/object';

export function initialize(appInstance) {
  const modalsManager = appInstance.lookup('service:modals-manager');
  setProperties(get(modalsManager, 'defaultOptions'), {
    confirmIsActive: false,
    confirmButtonType: 'primary',
    confirmIconActive: '',
    confirmIconInactive: '',
    declineIsActive: false,
    declineButtonType: 'secondary',
    declineIconActive: '',
    declineIconInactive: '',
  });
}

export default {
  name: 'bootstrap-modals-manager',
  initialize
};
