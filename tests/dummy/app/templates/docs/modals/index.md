# Predefined modals

Every modal described below takes a single parameter. It's a POJO with properties:

* `title` - modals title
* `body` - modals body message
* `footer` - text shown near the footer buttons (empty string by default)
* `confirm` - text for "submit"-button
* `decline` - text for "decline"-button

You may set default options for all modals with:

{{#docs-snippet name="default-options.js"}}
set(modalsManager, 'defaultOptions', {...});
{{/docs-snippet}}