'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
    'ember-cli-babel': {
      includePolyfill: true,
    },
    'ember-prism': {
      theme: 'tomorrow',
      components: ['scss', 'javascript', 'handlebars', 'markup-templating'],
    },
    snippetSearchPaths: ['app', 'addon', 'tests/dummy/app'],
    outputPaths: {
      app: {
        css: {},
      },
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
