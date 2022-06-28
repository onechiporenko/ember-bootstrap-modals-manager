// BEGIN-SNIPPET controller-with-service
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service
  modalsManager;
}
// END-SNIPPET
