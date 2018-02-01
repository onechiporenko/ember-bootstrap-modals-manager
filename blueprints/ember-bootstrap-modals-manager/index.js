/* eslint-env node */

const rsvp = require('rsvp');

module.exports = {
  name: 'ember-bootstrap-modals-manager',
  description: 'Configure ember-bootstrap-modals-manager',

  afterInstall() {
    return this.addEmberBootstrap();
  },

  addEmberBootstrap() {
    const dependencies = this.project.dependencies();
    const promises = [];
    if (!('ember-bootstrap' in dependencies)) {
      promises.push(this.addAddonToProject('ember-bootstrap'));
    }
    return rsvp.all(promises);
  }
};
