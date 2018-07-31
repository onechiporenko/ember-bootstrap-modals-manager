import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed, get} from '@ember/object';

export default Controller.extend({

  router: service(),

  isDemo: computed('router.currentURL', function () {
    return get(this, 'router.currentURL').includes('/demo');
  })

});
