// BEGIN-SNIPPET progress-demo-controller
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { Promise } from 'rsvp';

export default class DocsExamplesProgressDemoController extends Controller {
  @service()
  modalsManager;

  @action
  showProgress() {
    this.modalsManager
      .progress({
        promises: [
          // this is required
          () => new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
          () => new Promise((resolve) => setTimeout(() => resolve(2), 1000)),
          () => new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
        ],
      })
      .then((result) => {
        // called after chain of `promises` is executed.
        // here "result" is an array of values for fulfilled promises
      })
      .catch(([result, error]) => {
        // called when at least one promise is rejected
        // here "result" is an array of already fulfilled promises
        // here "error" is a reason why last promise was rejected
        return this.modalsManager.alert({
          title: 'Something goes wrong',
          body: `Fulfilled - ${result}. Error - ${JSON.stringify(error)}`,
        });
      });
  }
}
// END-SNIPPET
