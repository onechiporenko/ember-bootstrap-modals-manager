import ModalsManager from 'ember-modals-manager-internal/services/modals-manager';

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
 * ### `checkConfirm`
 *
 * Almost same as `promptConfirm` however it contains a checkbox instead of text-field. "Yes"-button is disabled until checkbox is not checked.
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
 *     showCheckConfirmModal() {
 *       get(this, 'modalsManager')
 *         .checkConfirm({
 *           title: 'Confirm Title',
 *           body: 'Confirm your suggestion',
 *           inputLabel: 'Input Label'
 *         })
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
 * ### `progress`
 *
 * This modal used to show a progress-bar for chain of Promises executed one by one. This modal doesn't have any controls like confirm/decline-buttons in the footer or "&times;" in the header and can't be closed by pressing `Esc` or clicking somewhere outside a modal. Modal will be confirmed and self-closed after all promises are fulfilled or it will be declined (and self-closed) if at least one promise becomes rejected.
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 * import {get} from '@ember/object';
 * import {Promise} from 'rsvp';
 *
 * export default Controller.extend({
 *   modalsManager: service(),
 *
 *   actions: {
 *     showPromptConfirm() {
 *       const modalsManager = get(this, 'modalsManager');
 *       modalsManager
 *         .progress({
 *           body: '',
 *           promises: [ // this is required
 *             () => new Promise(resolve => setTimeout(resolve(1), 100)),
 *             () => new Promise(resolve => setTimeout(resolve(2), 100)),
 *             () => new Promise(resolve => setTimeout(resolve(3), 100))
 *           ]
 *         })
 *         .then(result => {
 *           // called after chain of `promises` is executed.
 *           // here "result" is an array of values for fulfilled promises
 *         })
 *         .catch(([result, error]) => {
 *           // called when at least one promise is rejected
 *           // here "result" is an array of already fulfilled promises
 *           // here "error" is a reason why last promise was rejected
 *           return modalsManager
 *             .alert({
 *               title: 'Something goes wrong',
 *               body: `Fulfilled - ${result}. Error - ${JSON.stringify(error)}`
 *             });
 *         });
 *     }
 *   }
 * });
 * ```
 *
 * Options `striped`, `animate`, `type` and `showLabel` will be passed to the progress-bar. See docs for [ember-bootstrap#progress](http://www.ember-bootstrap.com/#/components/progress)
 *
 * **IMPORTANT** Here `options.promises` is a list of _FUNCTIONS_ that returns Promises!
 *
 * ### `process`
 *
 * This modal is used to show a "placeholder" while some process is running. This modal doesn't have any controls like confirm/decline-buttons in the footer or "×" in the header and can't be closed by pressing Esc or clicking somewhere outside a modal. Modal will be confirmed and self-closed after provided promise (`process`) is fulfilled or it will be declined (and self-closed) if it becomes rejected.
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 * import {get} from '@ember/object';
 * import {Promise} from 'rsvp';
 *
 * export default Controller.extend({
 *   modalsManager: service(),
 *
 *   actions: {
 *     showProcessModal() {
 *       get(this, 'modalsManager')
 *         .process({
 *           body: 'Some text goes here',
 *           iconClass: 'text-center fa fa-spinner fa-spin fa-3x fa-fw',
 *           title: '',
 *           // this is required
 *           process: () => new Promise(resolve => setTimeout(resolve(1), 100))
 *         })
 *         .then(result => {
 *           // called after `process` is resolved
 *           // here "result" is value of fulfilled Promise
 *         })
 *         .catch(error => {
 *           // called after `process` is rejected
 *           // here "error" is a reason why last promise was rejected
 *         });
 *     }
 *   }
 * });
 * ```
 *
 * **IMPORTANT** Here `options.process` is a _FUNCTION_ that return Promise!
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
 * #### Footer Component
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
 * ### `checkConfirm`
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
 *     showCheckConfirm() {
 *       get(this, 'modalsManager')
 *         .checkConfirm({
 *           title: 'Check Confirm Title',
 *           footer: 'Prompt Confirm Footer',
 *           titleComponent: 'custom-check-confirm-header',
 *           bodyComponent: 'custom-check-confirm-body',
 *           footerComponent: 'custom-check-confirm-footer'
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
 * It takes a single parameter `options`. Its value is an object passed to the `modalsManager.prompt`.
 *
 * ```hbs
 * {{! component/custom-check-confirm-header.hbs}}
 * <h4 class="modal-title"><i class="glyphicon glyphicon-asterisk"></i> Custom Check Confirm Title Component</h4>
 * ```
 *
 * #### Body Component
 *
 * It takes two parameters. First one is an `options` described before. Second one is an action `updatePromptValue`. It's used to update prompted value in the modal-scope. Usage example:
 *
 * ```hbs
 * {{! components/custom-check-confirm-body.hbs}}
 * <p class="alert alert-danger">Custom Check Confirm Body Component</p>
 * <div class="form-group">
 *   <div class="checkbox">
 *     <label>
 *       <input type="checkbox" onchange={{action updatePromptValue value="target.value"}}/> Custom Label
 *     </label>
 *   </div>
 * </div>
 * ```
 *
 * #### Footer Component
 *
 * It takes four parameters. First one is an `options` described before. Second one is a `confirmDisabled`. This flag determines if confirm-button should be disabled. Last two are actions `confirm` and `decline` used as click-handler for "Yes" and "No" buttons. Usage example:
 *
 * ```hbs
 * {{! components/custom-check-confirm-footer.hbs}}
 * Custom Check Confirm Footer Component {{#bs-button onClick=(action decline)}}Decline{{/bs-button}} {{#bs-button
 * disabled=confirmDisabled onClick=(action confirm) type="primary"}}Confirm{{/bs-button}}
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
 * ### `progress`
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 * import {get} from '@ember/object';
 * import {Promise} from 'rsvp';
 *
 * export default Controller.extend({
 *   modalsManager: service(),
 *
 *   actions: {
 *     showPromptConfirm() {
 *       const modalsManager = get(this, 'modalsManager');
 *       modalsManager
 *         .progress({
 *           body: '',
 *           titleComponent: 'custom-progress-header',
 *           bodyComponent: 'custom-progress-body',
 *           footerComponent: 'custom-progress-footer',
 *           promises: [ // this is required
 *             () => new Promise(resolve => setTimeout(resolve(1), 100)),
 *             () => new Promise(resolve => setTimeout(resolve(2), 100)),
 *             () => new Promise(resolve => setTimeout(resolve(3), 100))
 *           ]
 *         })
 *         .then(result => {
 *           // called after chain of `promises` is executed.
 *           // here "result" is an array of values for fulfilled promises
 *         })
 *         .catch(([result, error]) => {
 *           // called when at least one promise is rejected
 *           // here "result" is an array of already fulfilled promises
 *           // here "error" is a reason why last promise was rejected
 *           return modalsManager
 *             .alert({
 *               title: 'Something goes wrong',
 *               body: `Fulfilled - ${result}. Error - ${JSON.stringify(error)}`
 *             });
 *         });
 *     }
 *   }
 * });
 * ```
 *
 * #### Title Component
 *
 * It takes a single parameter `options`. Its value is an object passed to the `modalsManager.progress`.
 *
 * ```hbs
 * <h4 class="modal-title"><i class="glyphicon glyphicon-info-sign"></i> Custom Progress Title Component</h4>
 * ```
 *
 * #### Body Component
 *
 * It takes four parameters. First one is an options described before. Second one is an `overall` - number of `promises` passed to the modal. Third one is a `done` - number of already fulfilled promises. Fourth one is a `progress` - calculated percentage value of the fulfilled promises that me be used in the progress-bar. Usage example:
 *
 * ```hbs
 * <p class="alert alert-info">Custom Progress Body Component {{done}} / {{overall}}</p>
 *{{#bs-progress as |p|}}
 *  {{p.bar
 *    value=progress
 *    showLabel=options.showLabel
 *    striped=options.striped
 *    animate=options.animate
 *    type=options.type
 *  }}
 *{{/bs-progress}}
 * ```
 *
 * #### Footer Component
 *
 * It takes one parameter called `options`. It was described before. There are no action-handlers because progress-modal is auto-closed and triggers `decline` and `confirm` by itself and not with user's interaction.
 *
 * ```hbs
 * <p>Custom Progress Footer Component</p>
 * ```
 *
 * ### `process`
 *
 * ```js
 * import Controller from '@ember/controller';
 * import {inject as service} from '@ember/service';
 * import {get} from '@ember/object';
 * import {Promise} from 'rsvp';
 *
 * export default Controller.extend({
 *   modalsManager: service(),
 *
 *   actions: {
 *     showProcessModal() {
 *       get(this, 'modalsManager')
 *         .process({
 *           bodyComponent: 'custom-process-body',
 *           headerComponent: 'custom-process-footer',
 *           footerComponent: 'custom-process-header',
 *           process: () => new Promise(resolve => setTimeout(resolve(1), 100))
 *         })
 *         .then(result => {})
 *         .catch(error => {});
 *     }
 *   }
 * });
 * ```
 *
 * #### Title Component
 *
 * It takes a single parameter `options`. Its value is an object passed to the `modalsManager.process`.
 *
 * #### Body Component
 *
 * It takes a single parameter `options`. Its value is an object passed to the `modalsManager.process`.
 *
 * #### Footer Component
 *
 * It takes a single parameter `options`. Its value is an object passed to the `modalsManager.process`.
 *
 * @module EmberBootstrapModalsManager
 * @main EmberBootstrapModalsManager
 */
export default ModalsManager.extend({});
