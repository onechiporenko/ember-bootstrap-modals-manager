import AddonDocsRouter, {docsRoute} from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  docsRoute(this, function () {
    this.route('install');

    this.route('modals', function () {
      this.route('alert');
      this.route('confirm');
      this.route('prompt');
      this.route('check-confirm');
      this.route('prompt-confirm');
      this.route('process');
      this.route('progress');
      this.route('with-form');
    });
  });
  this.route('demo');
});

export default Router;