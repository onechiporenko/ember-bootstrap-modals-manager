// BEGIN-SNIPPET process-demo-controller
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { Promise } from 'rsvp';

export default class DocsExamplesProcessDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showProcess() {
    this.modalsManager
      .process({
        body: 'Some text goes here',
        iconClass: 'text-center fa fa-spinner fa-spin fa-3x fa-fw',
        title: '',
        // this is required
        process: () =>
          new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
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
