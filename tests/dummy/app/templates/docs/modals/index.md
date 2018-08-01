# Predefined modals

Every modal described below takes a single parameter. It's a POJO with properties:

* `options` for each method is an object with fields:

* `title` - modal's title

* `body` - modal's body message

* `footer` - text shown near the footer buttons (empty string by default)
 
* `confirm` - text for confirm-button

* `decline` - text for decline-button

* `confirmIsActive` - is confirm-button active
 
* `confirmButtonType` - type of confirm-button ('primary')
 
* `confirmIconActive` - icon for confirm-button when it's active
 
* `confirmIconInactive` - icon for confirm-button when it's not active
 
* `declineIsActive` - is decline-button active
 
* `declineButtonType` - type of decline-button ('secondary')
 
* `declineIconActive` - icon for decline-button when it's active

* `declineIconInactive` - icon for decline-button when it's not active

You may set default options for all modals with:

{{#docs-snippet name="default-options.js"}}
set(modalsManager, 'defaultOptions', {...});
{{/docs-snippet}}