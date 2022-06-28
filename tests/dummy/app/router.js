import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('demo');
  this.route('docs', function () {
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
      this.route('passing-values');
    });

    this.route('examples', function () {
      this.route('alert-demo');
      this.route('alert-custom-demo');
      this.route('confirm-demo');
      this.route('confirm-custom-demo');
      this.route('prompt-demo');
      this.route('prompt-custom-demo');
      this.route('check-confirm-demo');
      this.route('check-confirm-custom-demo');
      this.route('prompt-confirm-demo');
      this.route('prompt-confirm-custom-demo');
      this.route('process-demo');
      this.route('process-custom-demo');
      this.route('progress-demo');
      this.route('progress-custom-demo');
      this.route('passing-values-demo');
      this.route('with-form-demo');
    });
  });
});
