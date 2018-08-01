# Install

**Firstly:**

{{#docs-snippet name="install.sh" title="Install"}}
ember i ember-bootstrap-modals-manager
{{/docs-snippet}}

`ember-bootstrap` will be added to the `dependencies` in the `package.json` and installed if it wasn't installed before.

**Important** `ember-bootstap-modals-manager@1.x` should be used **only** for `ember-bootstrap@1.x`!

**Secondly:**

Add component `modals-container` to the `application.hbs`:

{{#docs-snippet name="application.hbs" title="application.hbs"}}
{{outlet}}
{{modals-container}}
{{/docs-snippet}}

**Thirdly:**

Inject a service `modals-manager` where you want to use modals:

{{#docs-snippet name="any-context.js" title="Modals Manager injection"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  modalsManager: service()
});
{{/docs-snippet}}

That's it. Now you are able to use predefined modals from `modals-manager`.