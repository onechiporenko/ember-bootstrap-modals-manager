import {computed, get, set} from '@ember/object';
import {assert} from '@ember/debug';
import Service from '@ember/service';
import {defer} from 'rsvp';

/**
 * ## About
 *
 * `ember-bootstrap-modals-manager` is an Ember-addon that provides a simple mechanism for interaction with user using modals. This addon is based on modals from `ember-bootstrap`.
 *
 * **Restriction** from the [Bootstrap#modals](https://getbootstrap.com/docs/3.3/javascript/#modals):
 *
 * > ##### Multiple open modals not supported
 *
 * ## Demo
 *
 * You can check how this addon works on [demo-page](https://onechiporenko.github.io/ember-bootstrap-modals-manager/).
 *
 * ## Install
 *
 * **Firstly:**
 *
 * ```bash
 * ember i ember-bootstrap-modals-manager
 * ```
 *
 * **Secondly:**
 *
 * Add component `modals-container` to the `application.hbs`:
 *
 * ```hbs
 * {{outlet}}
 * {{modals-container}}
 * ```
 *
 * **Thirdly:**
 *
 * Inject a service `modals-manager` where you want to use modals:
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 *
 * export default Controller.extend({
 *   modalsManager: service()
 * });
 * ```
 *
 * That's it. Now you are able to use predefined modals from `modals-manager`. More detailed below.
 *
 * ### Predefined modals
 *
 * Every modal described below takes a single parameter. It's a POJO with properties:
 *
 * * `title` - modals title
 * * `body` - modals body message
 * * `footer` - text shown near the footer buttons (empty string by default)
 * * `confirm` - text for "submit"-button
 * * `decline` - text for "decline"-button
 *
 * You may set default options for all modals with:
 *
 * ```js
 * set(modalsManager, 'defaultOptions', {...});
 * ```
 *
 * ### `alert`
 *
 * Similar to the `window.alert`. It shows modal with a single button.
 *
 * It's used to notify user about something.
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 * import {get} from '@ember/object';
 *
 * export default Controller.extend({
 *   modalsManager: service(),
 *
 *   actions: {
 *     showAlert() {
 *       get(this, 'modalsManager')
 *         .alert({title: 'Alert Title', body: 'Alert Body'})
 *         .then(() => {
 *           // called after user clicks "Yes" in the modal
 *         });
 *     }
 *   }
 * });
 * ```
 *
 * ### `confirm`
 *
 * Similar to the `window.confirm`. It shows modal with two buttons ("Yes" and "No").
 *
 * It's used to the ask user about confirmation for some action.
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 * import {get} from '@ember/object';
 *
 * export default Controller.extend({
 *   modalsManager: service(),
 *
 *   actions: {
 *     showConfirm() {
 *       get(this, 'modalsManager')
 *         .confirm({title: 'Confirm Title', body: 'Confirm Body'})
 *         .then(() => {
 *           // called after user clicks "Yes" in the modal
 *         })
 *         .catch(() => {
 *           // called after user clicks "No" in the modal
 *         });
 *     }
 *   }
 * });
 * ```
 *
 * ### `prompt`
 *
 * Similar to the `window.prompt`. It shows modal with two buttons and single input-field.
 *
 * It's used to get some input from user.
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 * import {get} from '@ember/object';
 *
 * export default Controller.extend({
 *   modalsManager: service(),
 *
 *   actions: {
 *     showPrompt() {
 *       get(this, 'modalsManager')
 *         .prompt({title: 'Prompt Title', body: 'Prompt Body'})
 *         .then(promptValue => {
 *           // called after user clicks "Yes" in the modal
 *           // takes a single argument with user's input value
 *         })
 *         .catch(() => {
 *           // called after user clicks "No" in the modal
 *         });
 *     }
 *   }
 * });
 * ```
 *
 * Extra option `disallowEmpty` with `true`-value will disable Confirm-button until user input at least something:
 *
 * ```js
 * modalsManager.prompt({disallowEmpty: true, title: '', body: ''});
 * ```
 *
 * ### `promptConfirm`
 *
 * Almost the same as `prompt`, however its "Yes"-button is disabled until user write needed value to the input-field.
 *
 * As a `confirm` it's used to the ask user about confirmation for some action, but it's more demanding.
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 * import {get} from '@ember/object';
 *
 * export default Controller.extend({
 *   modalsManager: service(),
 *
 *   actions: {
 *     showPromptConfirm() {
 *       get(this, 'modalsManager')
 *         .promptConfirm({
 *           title: 'Prompt Confirm Title',
 *           body: 'Say "password" and come in',
 *           promptValue: 'password' // it's required
 *         })
 *         .then(promptValue => {
 *           // called after user clicks "Yes" in the modal
 *           // "Yes" will be active only when user prints "password" in the input-field
 *           // takes a single argument with user input value
 *         })
 *         .catch(() => {
 *           // called after user clicks "No" in the modal
 *         });
 *     }
 *   }
 * });
 * ```
 *
 * ## Go Pro
 *
 * ### Custom components for `title`, `body` and `footer`
 *
 * Every modal-port like header, body and footer may be customized not only with message and even with a Component.
 *
 * ### `alert`
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 * import {get} from '@ember/object';
 *
 * export default Controller.extend({
 *   modalsManager: service(),
 *
 *   actions: {
 *     showAlert() {
 *       get(this, 'modalsManager')
 *         .alert({
 *           titleComponent: 'custom-alert-title',
 *           title: 'Title',
 *           bodyComponent: 'custom-alert-body',
 *           body: 'Body',
 *           footerComponent: 'custom-alert-footer',
 *           footer: 'Footer'
 *         })
 *         .then(() => {});
 *     }
 *   }
 * });
 * ```
 *
 * #### Title Component
 *
 * It takes a single parameter `options`. Its value is an object passed to the `modalsManager.alert`.
 *
 * ```hbs
 * {{! components/custom-alert-header.hbs}}
 * <h4 class="modal-title"><i class="glyphicon glyphicon-warning-sign"></i> {{options.title}}</h4>
 * ```
 *
 * #### Body Component
 *
 * It takes a single parameter `options`. Its value is an object passed to the `modalsManager.alert`.
 *
 * ```hbs
 * {{! components/custom-alert-body.hbs}}
 * <p class="alert alert-info">{{options.body}}</p>
 * ```
 *
 * #### Footer Component
 *
 * It takes two parameters. First one is an `options` described before. Second one is an action `confirm` used to confirm modal. It may be used like:
 *
 * ```hbs
 * {{! components/custom-alert-footer.hbs}}
 * {{options.footer}}
 * {{#bs-button onClick=(action confirm)}}Confirm{{/bs-button}}
 * ```
 *
 * ### `confirm`
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 * import {get} from '@ember/object';
 *
 * export default Controller.extend({
 *   modalsManager: service(),
 *
 *   actions: {
 *     showConfirm() {
 *       get(this, 'modalsManager')
 *         .confirm({
 *           title: 'Confirm Title',
 *           body: 'Confirm Body',
 *           footer: 'Confirm Footer',
 *           titleComponent: 'custom-confirm-title',
 *           bodyComponent: 'custom-confirm-body',
 *           footerComponent: 'custom-confirm-footer'
 *         })
 *         .then(() => {})
 *         .catch(() => {});
 *     }
 *   }
 * });
 * ```
 *
 * #### Title Component
 *
 * It takes a single parameter `options`. Its value is an object passed to the `modalsManager.confirm`.
 *
 * ```hbs
 * {{! components/custom-confirm-title.hbs}}
 * <h4 class="modal-title"><i class="glyphicon glyphicon-question-sign"></i> {{options.title}}</h4>
 * ```
 *
 * #### Body Component
 *
 * It takes a single parameter `options`. Its value is an object passed to the `modalsManager.confirm`.
 *
 * ```hbs
 * {{! components/custom-confirm-body.hbs}}
 * <p class="alert alert-success">{{options.body}}</p>
 * ```
 *
 * #### Footer Component
 *
 * It takes three parameters. First on is an `options` described before. Second one is an action `confirm` used to confirm modal. Third one is an action `decline` used to decline modal. Both of them may be used like:
 *
 * ```hbs
 * {{! components/custom-confirm-footer.hbs}}
 * {{options.footer}}
 * {{#bs-button onClick=(action decline)}}Decline{{/bs-button}}
 * {{#bs-button onClick=(action confirm)}}Confirm{{/bs-button}}
 * ```
 *
 * ### `prompt`
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 * import {get} from '@ember/object';
 *
 * export default Controller.extend({
 *   modalsManager: service(),
 *
 *   actions: {
 *     showPrompt() {
 *       get(this, 'modalsManager')
 *         .prompt({
 *           title: 'Prompt Title',
 *           body: 'Prompt Body',
 *           footer: 'Prompt Footer',
 *           titleComponent: 'custom-prompt-header',
 *           bodyComponent: 'custom-prompt-body',
 *           footerComponent: 'custom-prompt-footer'
 *         })
 *         .then(promptValue => {})
 *         .catch(() => {});
 *     }
 *   }
 * });
 * ```
 *
 * #### Title Component
 *
 * It takes a single parameter `options`. Its value is an object passed to the `modalsManager.prompt`.
 *
 * ```hbs
 * {{! component/custom-prompt-header.hbs}}
 * <h4 class="modal-title"><i class="glyphicon glyphicon-info-sign"></i> {{options.header}}</h4>
 * ```
 *
 * #### Body Component
 *
 * It takes two parameters. First one is an `options` described before. Second one is an action `updatePromptValue`. It's used to update prompted value in the modal-scope. Usage example:
 *
 * ```hbs
 * {{! components/custom-prompt-body.hbs}}
 * <p class="alert alert-warning">{{options.body}}</p>
 * <input type="text" class="form-control" oninput={{action updatePromptValue value="target.value"}} />
 * ```
 *
 * ##### Footer Component
 *
 * It takes three parameters. First on is an `options` described before. Second one is an action `confirm` used to confirm modal. Third one is an action `decline` used to decline modal. Both of them may be used like:
 *
 * ```hbs
 * {{! components/custom-prompt-footer.hbs}}
 * {{options.footer}}
 * {{#bs-button onClick=(action decline)}}Decline{{/bs-button}}
 * {{#bs-button onClick=(action confirm)}}Confirm{{/bs-button}}
 * ```
 *
 * ### `promptConfirm`
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 * import {get} from '@ember/object';
 *
 * export default Controller.extend({
 *   modalsManager: service(),
 *
 *   actions: {
 *     showPromptConfirm() {
 *       get(this, 'modalsManager')
 *         .promptConfirm({
 *           title: 'Prompt Confirm Title',
 *           body: 'Say "password" and come in',
 *           footer: 'Prompt Confirm Footer',
 *           titleComponent: 'custom-prompt-confirm-header',
 *           bodyComponent: 'custom-prompt-confirm-body',
 *           footerComponent: 'custom-prompt-confirm-footer',
 *           promptValue: 'password' // it's required
 *         })
 *         .then(promptValue => {})
 *         .catch(() => {});
 *     }
 *   }
 * });
 * ```
 *
 * #### Title Component
 *
 * It takes a single parameter `options`. Its value is an object passed to the `modalsManager.promptConfirm`.
 *
 * ```hbs
 * <h4 class="modal-title"><i class="glyphicon glyphicon-asterisk"></i> {{options.title}}</h4>
 * ```
 *
 * #### Body Component
 *
 * It takes two parameters. First one is an `options` described before. Second one is an action `updatePromptValue`. It's used to update prompted value in the modal-scope. Usage example:
 *
 * ```hbs
 * {{! components/custom-prompt-confirm-body.hbs}}
 * <p class="alert alert-danger">
 *   {{options.body}}
 *   Please enter a "{{options.promptValue}}" without quotes
 * </p>
 * <input type="text" class="form-control" oninput={{action updatePromptValue value="target.value"}} />
 * ```
 *
 * #### Footer Component
 *
 * It takes four parameters. First one is an `options` described before. Second one is a `confirmDisabled`. This flag determines if confirm-button should be disabled. Last two are actions `confirm` and `decline` used as click-handler for "Yes" and "No" buttons. Usage example:
 *
 * ```hbs
 * {{! components/custom-prompt-confirm-footer.hbs}}
 * {{options.footer}}
 * {{#bs-button onClick=(action decline)}}Decline{{/bs-button}}
 * {{#bs-button disabled=confirmDisabled onClick=(action confirm)}}Confirm{{/bs-button}}
 * ```
 *
 * @module EmberBootstrapModalsManager
 * @main EmberBootstrapModalsManager
 */

/**
 * Check {{#crossLinkModule "EmberBootstrapModalsManager"}}{{/crossLinkModule}}-docs for usage examples
 *
 * @class ModalsManager
 * @namespace Services
 * @extends Ember.Service
 */
export default Service.extend({

  /**
   * @property modalIsOpened
   * @type boolean
   * @default false
   * @private
   */
  modalIsOpened: false,

  /**
   * @property modalDefer
   * @type RSVP.Defer
   * @default null
   * @private
   */
  modalDefer: null,

  /**
   * POJO with default options for all modals
   *
   * @property defaultOptions
   * @type object
   */
  defaultOptions: computed(function () {
    return {
      title: 'Default Title',
      body: 'Default Body',
      footer: '',
      confirm: 'Yes',
      decline: 'No'
    };
  }),

  /**
   * @property options
   * @type object
   * @private
   */
  options: computed(function () {
    return {};
  }),

  /**
   * @property componentName
   * @type string
   * @default null
   * @private
   */
  componentName: null,

  /**
   * Shows provided modal
   *
   * @method show
   * @param {string} componentName
   * @param {object} options
   * @return {RSVP.Promise}
   */
  show(componentName, options) {
    assert('Only one modal may be opened in the same time!', !get(this, 'modalIsOpened'));
    const defaultOptions = get(this, 'defaultOptions');
    const opts = Object.assign({}, defaultOptions, options);
    set(this, 'modalIsOpened', true);
    set(this, 'options', opts);
    set(this, 'componentName', componentName);
    const modalDefer = defer();
    set(this, 'modalDefer', modalDefer);
    return modalDefer.promise;
  },

  /**
   * Shows `alert`-modal
   *
   * @method alert
   * @param {object} options
   * @returns {RSVP.Promise}
   */
  alert(options) {
    return this.show('modals-container/alert', options);
  },

  /**
   * Shows `confirm`-modal
   *
   * @method confirm
   * @param {object} options
   * @returns {RSVP.Promise}
   */
  confirm(options) {
    return this.show('modals-container/confirm', options);
  },

  /**
   * Shows `prompt`-modal
   *
   * @method prompt
   * @param {object} options
   * @returns {RSVP.Promise}
   */
  prompt(options) {
    return this.show('modals-container/prompt', options);
  },

  /**
   * Shows `prompt-confirm`-modal
   *
   * @method promptConfirm
   * @param {object} options
   * @returns {RSVP.Promise}
   */
  promptConfirm(options) {
    assert('"options.promptValue" must be defined and not empty', !!options.promptValue);
    return this.show('modals-container/prompt-confirm', options);
  },

  /**
   * @method onConfirmClick
   * @param {*} [val]
   * @private
   */
  onConfirmClick(val) {
    set(this, 'modalIsOpened', false);
    get(this, 'modalDefer').resolve(val);
    set(this, 'options', {});
  },

  /**
   * @method onDeclineClick
   * @private
   */
  onDeclineClick() {
    set(this, 'modalIsOpened', false);
    get(this, 'modalDefer').reject();
    set(this, 'options', {});
  }
});
