# Install

**Firstly:**

{{#docs-snippet name="install.sh"}}
ember i ember-bootstrap-modals-manager
{{/docs-snippet}}

**Secondly:**

Add component `modals-container` to the `application.hbs`:

{{#docs-snippet name="application.hbs"}}
{{outlet}}
{{modals-container}}
{{/docs-snippet}}

**Thirdly:**

Inject a service `modals-manager` where you want to use modals:

{{#docs-snippet name="any-context.js"}}
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  modalsManager: service()
});
{{/docs-snippet}}

That's it. Now you are able to use predefined modals from `modals-manager`.