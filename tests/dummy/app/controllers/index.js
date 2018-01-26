import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';
import {A} from '@ember/array';

export default Controller.extend({
  modalsManager: service(),
  messages: A([]),
  addMessage(msg) {
    get(this, 'messages').pushObject(msg);
  },
  actions: {
    showAlertModal() {
      get(this, 'modalsManager').alert({
        title: 'Custom Alert Modal Title',
        body: 'Custom Alert Modal Body',
      }).then(() => this.addMessage('Alert was confirmed'));
    },
    showConfirmModal() {
      get(this, 'modalsManager').confirm({
        title: 'Custom Confirm Modal Title',
        body: 'Custom Confirm Modal Body'
      })
        .then(() => this.addMessage('Confirm was confirmed'))
        .catch(() => this.addMessage('Confirm was declined'));
    },
    showPromptModal() {
      get(this, 'modalsManager').prompt({
        title: 'Custom Prompt Modal Title',
        body: 'Custom Prompt Modal Body'
      })
        .then(v => this.addMessage(`Prompt was confirmed (with "${v}")`))
        .catch(() => this.addMessage('Prompt was declined'));
    },
    showPromptConfirmModal() {
      get(this, 'modalsManager').promptConfirm({
        title: 'Custom Prompt Confirm Modal Title',
        body: 'Please enter a "modal" without quotes',
        promptValue: 'modal'
      })
        .then(v => this.addMessage(`Prompt-Confirm was confirmed (with "${v}")`))
        .catch(() => this.addMessage('Prompt-Confirm was declined'));
    },

    showCustomAlertModal() {
      get(this, 'modalsManager').alert({
        titleComponent: 'custom-alert-header',
        bodyComponent: 'custom-alert-body',
        footerComponent: 'custom-alert-footer',
      }).then(() => this.addMessage('Custom Alert was confirmed'));
    },
    showCustomConfirmModal() {
      get(this, 'modalsManager').confirm({
        titleComponent: 'custom-confirm-header',
        bodyComponent: 'custom-confirm-body',
        footerComponent: 'custom-confirm-footer',
      })
        .then(() => this.addMessage('Custom Confirm was confirmed'))
        .catch(() => this.addMessage('Custom Confirm was declined'));
    },
    showCustomPromptModal() {
      get(this, 'modalsManager').prompt({
        titleComponent: 'custom-prompt-header',
        bodyComponent: 'custom-prompt-body',
        footerComponent: 'custom-prompt-footer',
      })
        .then(v => this.addMessage(`Custom Prompt was confirmed (with "${v}")`))
        .catch(() => this.addMessage('Custom Prompt was declined'));
    },
    showCustomPromptConfirmModal() {
      get(this, 'modalsManager').promptConfirm({
        titleComponent: 'custom-prompt-confirm-header',
        bodyComponent: 'custom-prompt-confirm-body',
        footerComponent: 'custom-prompt-confirm-footer',
        promptValue: 'modal'
      })
        .then(v => this.addMessage(`Custom Prompt-Confirm was confirmed (with "${v}")`))
        .catch(() => this.addMessage('Custom Prompt-Confirm was declined'));
    },
  }
});
