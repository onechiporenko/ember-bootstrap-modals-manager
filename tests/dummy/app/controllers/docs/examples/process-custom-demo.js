// BEGIN-SNIPPET process-custom-demo-controller
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { Promise } from 'rsvp';

export default class DocsExamplesProcessCustomDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showProcess() {
    this.modalsManager
      .process({
        bodyComponent: 'custom-process-body',
        headerComponent: 'custom-process-footer',
        footerComponent: 'custom-process-header',
        process: () =>
          new Promise((resolve) => setTimeout(() => resolve(1), 100)),
      })
      .then((result) => {
        // called after `process` is resolved
        // here "result" is value of fulfilled Promise
      })
      .catch((error) => {
        // called after `process` is rejected
        // here "error" is a reason why last promise was rejected
      });
  }
}
// END-SNIPPET
