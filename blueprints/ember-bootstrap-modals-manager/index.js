/* eslint-env node */

module.exports = {
  name: 'ember-bootstrap-modals-manager',
  description: 'Configure ember-bootstrap-modals-manager',

  afterInstall() {
    return this.addEmberBootstrap();
  },

  addEmberBootstrap() {
    const dependencies = this.project.dependencies();
    if (!('ember-bootstrap' in dependencies)) {
      return this.addAddonToProject('ember-bootstrap');
    }
  }
};
