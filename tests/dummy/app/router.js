import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
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
  this.route('demo');
  this.route('docs');
});
