import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action, computed, get, set, getProperties } from '@ember/object';
import { not } from '@ember/object/computed';
import { A } from '@ember/array';

export default class DemoController extends Controller {
  @service()
  modalsManager;
  messages = A([]);

  options = {};

  @computed('options')
  get stringifiedOptions() {
    return JSON.stringify(get(this, 'options'), (k, v) => {
      return typeof v === 'function' ? 'Function' : v;
    }, 2);
  }

  confirmButtonType = 'primary';
  declineButtonType = 'secondary';

  confirmIsActive = false;
  confirmIconActive = '';
  confirmIconInactive = '';
  declineIsActive = false;
  declineIconActive = '';
  declineIconInactive = '';

  type = 'success';

  size = null;

  confirmButtonSize = 'md';

  declineButtonSize = 'md';

  @computed()
  get backdropTransitionDuration() {
    return 150;
  }

  set backdropTransitionDuration(v) {
    return Number(v);
  }

  renderInPlace = true;

  @computed()
  get transitionDuration() {
    return 300;
  }

  set transitionDuration(v) {
    return Number(v);
  }

  buttonSizeChoices = ['xs', 'sm', 'md', 'lg'];

  sizeChoices = ['sm', 'lg'];

  typeChoices = [
    '',
    'success',
    'info',
    'warning',
    'danger'
  ];

  buttonTypeChoices = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'link',
    'default'
  ];

  confirmIconChoices = [
    'fa fa-check',
    'fa fa-check-circle'
  ];

  declineIconChoices = [
    'fa fa-ban',
    'fa fa-times'
  ];

  disallowEmptyPrompt = false;

  showLabel = false;
  animate = false;
  striped = false;
  settled = false;
  cancelable = false;
  @not('striped')
  notStriped;
  progressWillFail = false;
  processWillFail = false;

  addMessage(msg) {
    get(this, 'messages').pushObject(msg);
  }

  generatePromiseFactoriesList(count) {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(() => new Promise(resolve => setTimeout(() => resolve(i), 1000)));
    }
    if (get(this, 'progressWillFail')) {
      list.splice(2, 0, () => new Promise((resolve, reject) => setTimeout(() => reject('Promise was rejected'), 1000)));
    }
    return A(list);
  }

  @action
  showAlertModal() {
    const options = {
      title: 'Custom Alert Modal Title',
      body: 'Custom Alert Modal Body',
      size: get(this, 'size'),
      confirmButtonSize: get(this, 'confirmButtonSize'),
      declineButtonSize: get(this, 'declineButtonSize'),
      backdropTransitionDuration: get(this, 'backdropTransitionDuration'),
      renderInPlace: get(this, 'renderInPlace'),
      transitionDuration: get(this, 'transitionDuration'),
      confirmButtonType: get(this, 'confirmButtonType'),
      declineButtonType: get(this, 'declineButtonType'),
      confirmIsActive: get(this, 'confirmIsActive'),
      confirmIconActive: get(this, 'confirmIconActive'),
      confirmIconInactive: get(this, 'confirmIconInactive'),
      declineIsActive: get(this, 'declineIsActive'),
      declineIconActive: get(this, 'declineIconActive'),
      declineIconInactive: get(this, 'declineIconInactive')
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .alert(options)
      .then(() => this.addMessage('Alert was confirmed'));
  }

  @action
  showConfirmModal() {
    const options = {
      title: 'Custom Confirm Modal Title',
      body: 'Custom Confirm Modal Body',
      size: get(this, 'size'),
      confirmButtonSize: get(this, 'confirmButtonSize'),
      declineButtonSize: get(this, 'declineButtonSize'),
      backdropTransitionDuration: get(this, 'backdropTransitionDuration'),
      renderInPlace: get(this, 'renderInPlace'),
      transitionDuration: get(this, 'transitionDuration'),
      confirmButtonType: get(this, 'confirmButtonType'),
      declineButtonType: get(this, 'declineButtonType'),
      confirmIsActive: get(this, 'confirmIsActive'),
      confirmIconActive: get(this, 'confirmIconActive'),
      confirmIconInactive: get(this, 'confirmIconInactive'),
      declineIsActive: get(this, 'declineIsActive'),
      declineIconActive: get(this, 'declineIconActive'),
      declineIconInactive: get(this, 'declineIconInactive')
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .confirm(options)
      .then(() => this.addMessage('Confirm was confirmed'))
      .catch(() => this.addMessage('Confirm was declined'));
  }

  @action
  showPromptModal() {
    const options = {
      title: 'Custom Prompt Modal Title',
      body: 'Custom Prompt Modal Body',
      inputLabel: 'Input Label',
      size: get(this, 'size'),
      confirmButtonSize: get(this, 'confirmButtonSize'),
      declineButtonSize: get(this, 'declineButtonSize'),
      backdropTransitionDuration: get(this, 'backdropTransitionDuration'),
      renderInPlace: get(this, 'renderInPlace'),
      transitionDuration: get(this, 'transitionDuration'),
      disallowEmpty: get(this, 'disallowEmptyPrompt'),
      confirmButtonType: get(this, 'confirmButtonType'),
      declineButtonType: get(this, 'declineButtonType'),
      confirmIsActive: get(this, 'confirmIsActive'),
      confirmIconActive: get(this, 'confirmIconActive'),
      confirmIconInactive: get(this, 'confirmIconInactive'),
      declineIsActive: get(this, 'declineIsActive'),
      declineIconActive: get(this, 'declineIconActive'),
      declineIconInactive: get(this, 'declineIconInactive')
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .prompt(options)
      .then(v => this.addMessage(`Prompt was confirmed (with "${v}")`))
      .catch(() => this.addMessage('Prompt was declined'));
  }

  @action
  showPromptConfirmModal() {
    const options = {
      title: 'Custom Prompt Confirm Modal Title',
      body: 'Please enter a "modal" without quotes',
      inputLabel: 'Input Label',
      promptValue: 'modal',
      size: get(this, 'size'),
      confirmButtonSize: get(this, 'confirmButtonSize'),
      declineButtonSize: get(this, 'declineButtonSize'),
      backdropTransitionDuration: get(this, 'backdropTransitionDuration'),
      renderInPlace: get(this, 'renderInPlace'),
      transitionDuration: get(this, 'transitionDuration'),
      confirmButtonType: get(this, 'confirmButtonType'),
      declineButtonType: get(this, 'declineButtonType'),
      confirmIsActive: get(this, 'confirmIsActive'),
      confirmIconActive: get(this, 'confirmIconActive'),
      confirmIconInactive: get(this, 'confirmIconInactive'),
      declineIsActive: get(this, 'declineIsActive'),
      declineIconActive: get(this, 'declineIconActive'),
      declineIconInactive: get(this, 'declineIconInactive')
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .promptConfirm(options)
      .then(v => this.addMessage(`Prompt-Confirm was confirmed (with "${v}")`))
      .catch(() => this.addMessage('Prompt-Confirm was declined'));
  }

  @action
  showCheckConfirmModal() {
    const options = {
      title: 'Custom Check Confirm Modal Title',
      body: 'Confirm your suggestion',
      inputLabel: 'Input Label',
      size: get(this, 'size'),
      confirmButtonSize: get(this, 'confirmButtonSize'),
      declineButtonSize: get(this, 'declineButtonSize'),
      backdropTransitionDuration: get(this, 'backdropTransitionDuration'),
      renderInPlace: get(this, 'renderInPlace'),
      transitionDuration: get(this, 'transitionDuration'),
      confirmButtonType: get(this, 'confirmButtonType'),
      declineButtonType: get(this, 'declineButtonType'),
      confirmIsActive: get(this, 'confirmIsActive'),
      confirmIconActive: get(this, 'confirmIconActive'),
      confirmIconInactive: get(this, 'confirmIconInactive'),
      declineIsActive: get(this, 'declineIsActive'),
      declineIconActive: get(this, 'declineIconActive'),
      declineIconInactive: get(this, 'declineIconInactive')
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .checkConfirm(options)
      .then(() => this.addMessage(`Check-Confirm was confirmed`))
      .catch(() => this.addMessage('Check-Confirm was declined'));
  }

  @action
  showProgressModal() {
    const options = {
      title: 'Progress Modal Title',
      body: '',
      size: get(this, 'size'),
      backdropTransitionDuration: get(this, 'backdropTransitionDuration'),
      renderInPlace: get(this, 'renderInPlace'),
      transitionDuration: get(this, 'transitionDuration'),
      promises: this.generatePromiseFactoriesList(5),
      showLabel: get(this, 'showLabel'),
      striped: get(this, 'striped'),
      animate: get(this, 'animate'),
      settled: get(this, 'settled'),
      cancelable: get(this, 'cancelable'),
      type: get(this, 'type')
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .progress(options)
      .then(v => this.addMessage(`Progress was finished (with ${JSON.stringify(v)})`))
      .catch(([result, error]) => {
        this.addMessage(`Progress was failed (completed ${JSON.stringify(result)}). Error - "${error}"`);
        return get(this, 'modalsManager')
          .alert({
            title: 'Something goes wrong',
            body: `Fulfilled - ${result}. Error - ${JSON.stringify(error)}`
          });
      });
  }

  @action
  showProcessModal() {
    const options = {
      body: 'Some long process (you must add font-awesome to your project to use `fa`-icons)',
      iconClass: 'text-center fa fa-spinner fa-spin fa-3x fa-fw',
      size: get(this, 'size'),
      backdropTransitionDuration: get(this, 'backdropTransitionDuration'),
      renderInPlace: get(this, 'renderInPlace'),
      transitionDuration: get(this, 'transitionDuration'),
      title: '',
      process: () => new Promise((resolve, reject) => setTimeout(() => {
        get(this, 'processWillFail') ? reject('some error') : resolve('some result');
      }, 3000))
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .process(options)
      .then(v => this.addMessage(`Process was confirmed (with ${v})`))
      .catch(e => this.addMessage(`Process was declined (with ${e})`));
  }

  @action
  showCustomAlertModal() {
    const options = {
      titleComponent: 'custom-alert-header',
      bodyComponent: 'custom-alert-body',
      footerComponent: 'custom-alert-footer',
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .alert(options)
      .then(() => this.addMessage('Custom Alert was confirmed'));
  }

  @action
  showCustomConfirmModal() {
    const options = {
      titleComponent: 'custom-confirm-header',
      bodyComponent: 'custom-confirm-body',
      footerComponent: 'custom-confirm-footer',
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .confirm(options)
      .then(() => this.addMessage('Custom Confirm was confirmed'))
      .catch(() => this.addMessage('Custom Confirm was declined'));
  }

  @action
  showCustomPromptModal() {
    const options = {
      titleComponent: 'custom-prompt-header',
      bodyComponent: 'custom-prompt-body',
      footerComponent: 'custom-prompt-footer',
      disallowEmpty: get(this, 'disallowEmptyPrompt')
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .prompt(options)
      .then(v => this.addMessage(`Custom Prompt was confirmed (with "${v}")`))
      .catch(() => this.addMessage('Custom Prompt was declined'));
  }

  @action
  showCustomPromptConfirmModal() {
    const options = {
      titleComponent: 'custom-prompt-confirm-header',
      bodyComponent: 'custom-prompt-confirm-body',
      footerComponent: 'custom-prompt-confirm-footer',
      promptValue: 'modal'
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .promptConfirm(options)
      .then(v => this.addMessage(`Custom Prompt-Confirm was confirmed (with "${v}")`))
      .catch(() => this.addMessage('Custom Prompt-Confirm was declined'));
  }

  @action
  showCustomCheckConfirmModal() {
    const options = {
      title: 'Custom Check Confirm Modal Title',
      body: 'Confirm your suggestion',
      titleComponent: 'custom-check-confirm-header',
      bodyComponent: 'custom-check-confirm-body',
      footerComponent: 'custom-check-confirm-footer'
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .checkConfirm(options)
      .then(() => this.addMessage(`Custom Check-Confirm was confirmed`))
      .catch(() => this.addMessage('Custom Check-Confirm was declined'));
  }

  @action
  showCustomProgressModal() {
    const options = {
      title: 'Progress Modal Title',
      body: '',
      titleComponent: 'custom-progress-header',
      bodyComponent: 'custom-progress-body',
      footerComponent: 'custom-progress-footer',
      promises: this.generatePromiseFactoriesList(5),
      showLabel: get(this, 'showLabel'),
      striped: get(this, 'striped'),
      animate: get(this, 'animate'),
      settled: get(this, 'settled'),
      cancelable: get(this, 'cancelable'),
      type: get(this, 'type')
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .progress(options)
      .then((v) => this.addMessage(`Progress was finished (with ${JSON.stringify(v)})`))
      .catch(([result, error]) => {
        this.addMessage(`Progress was failed (completed ${JSON.stringify(result)}). Error - "${error}"`);
        return get(this, 'modalsManager')
          .alert({
            title: 'Something goes wrong',
            body: `Fulfilled - ${result}. Error - ${JSON.stringify(error)}`
          });
      });
  }

  @action
  showCustomProcessModal() {
    const options = {
      title: 'Process Modal Title',
      body: 'Some long process (you must add font-awesome to your project to use `fa`-icons)',
      titleComponent: 'custom-process-header',
      bodyComponent: 'custom-process-body',
      footerComponent: 'custom-process-footer',
      iconClass: 'text-center fa fa-spinner fa-spin fa-3x fa-fw',
      process: () => new Promise((resolve, reject) => setTimeout(() => {
        get(this, 'processWillFail') ? reject('some error') : resolve('some result');
      }, 3000))
    };
    set(this, 'options', options);
    get(this, 'modalsManager')
      .process(options)
      .then(v => this.addMessage(`Process was confirmed (with ${v})`))
      .catch(e => this.addMessage(`Process was declined (with ${e})`));
  }

  @action
  showCustomFormModal() {
    set(this, 'options', '.show(\'modal-with-form\')');
    get(this, 'modalsManager')
      .show('modal-with-form')
      .then(v => this.addMessage(`Modal with form was confirmed (with ${JSON.stringify(getProperties(v, 'firstName', 'lastName', 'email'))})`))
      .catch(() => this.addMessage('Modal with form declined'));
  }

  @action
  cleanMessage() {
    set(this, 'messages', A([]));
  }
}
