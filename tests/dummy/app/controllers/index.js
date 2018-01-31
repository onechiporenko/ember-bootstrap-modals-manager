import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed, get, set} from '@ember/object';
import {A} from '@ember/array';

export default Controller.extend({
  modalsManager: service(),
  messages: A([]),

  options: computed(function () {
    return {};
  }),

  stringifiedOptions: computed('options', function () {
    return JSON.stringify(get(this, 'options'), null, 2);
  }),

  disallowEmptyPrompt: false,

  addMessage(msg) {
    get(this, 'messages').pushObject(msg);
  },
  actions: {
    showAlertModal() {
      const options = {
        title: 'Custom Alert Modal Title',
        body: 'Custom Alert Modal Body',
      };
      set(this, 'options', options);
      get(this, 'modalsManager')
        .alert(options)
        .then(() => this.addMessage('Alert was confirmed'));
    },
    showConfirmModal() {
      const options = {
        title: 'Custom Confirm Modal Title',
        body: 'Custom Confirm Modal Body'
      };
      set(this, 'options', options);
      get(this, 'modalsManager')
        .confirm(options)
        .then(() => this.addMessage('Confirm was confirmed'))
        .catch(() => this.addMessage('Confirm was declined'));
    },
    showPromptModal() {
      const options = {
        title: 'Custom Prompt Modal Title',
        body: 'Custom Prompt Modal Body',
        disallowEmpty: get(this, 'disallowEmptyPrompt')
      };
      set(this, 'options', options);
      get(this, 'modalsManager')
        .prompt(options)
        .then(v => this.addMessage(`Prompt was confirmed (with "${v}")`))
        .catch(() => this.addMessage('Prompt was declined'));
    },
    showPromptConfirmModal() {
      const options = {
        title: 'Custom Prompt Confirm Modal Title',
        body: 'Please enter a "modal" without quotes',
        promptValue: 'modal'
      };
      set(this, 'options', options);
      get(this, 'modalsManager')
        .promptConfirm(options)
        .then(v => this.addMessage(`Prompt-Confirm was confirmed (with "${v}")`))
        .catch(() => this.addMessage('Prompt-Confirm was declined'));
    },

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
    },
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
    },
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
    },
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
    },
    cleanMessage() {
      set(this, 'messages', A([]));
    }
  }
});
