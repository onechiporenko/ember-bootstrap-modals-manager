/* eslint-env node */

module.exports = {
  name: 'ember-bootstrap-modals-manager',
  description: 'Configure ember-bootstrap-modals-manager',

  normalizeEntityName: function () {
    // do nothing
  },

  afterInstall() {
    return this.addEmberBootstrap();
  },

  addEmberBootstrap() {
    if (!('ember-bootstrap' in this.project.dependencies())) {
      return this.addAddonToProject('ember-bootstrap');
    }
  },
};
