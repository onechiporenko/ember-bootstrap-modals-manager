# Predefined modals

Every modal described below takes a single parameter. It's a POJO with properties:

* **General**

  * `title` - modal's title

  * `body` - modal's body message

  * `footer` - text shown near the footer buttons (empty string by default)

  * `titleComponent` - custom component rendered as modal's title

  * `bodyComponent` - custom component rendered as modal's body

  * `footerComponent` - custom component rendered as modals' footer

  * `size` - modal's size. Set to `null` (default), `lg` or `sm`

  * `backdropTransitionDuration` - the duration of the backdrop fade transition

  * `renderInPlace` - if `true` component will render in place, rather than be wormholed

  * `transitionDuration` - the duration of the fade transition

  * `modalClass` - add a custom class to any modal

  * `position` - vertical position, either 'top' (default) or 'center'. 'center' will apply the `modal-dialog-centered` class

  * `scrollable` - allows scrolling within the modal body. 'true' will apply the `modal-dialog-scrollable` class

* **Confirm Button**

  * `confirm` - text for confirm-button

  * `confirmIsActive` - is confirm-button active

  * `confirmButtonSize` - property for size styling, set to `lg`, `md`, `sm` or `xs`

  * `confirmButtonType` - type of confirm-button ('primary')

  * `confirmIconActive` - icon for confirm-button when it's active

  * `confirmIconInactive` - icon for confirm-button when it's not active

* **Decline Button** (not used in the `alert`-modal)

  * `decline` - text for decline-button

  * `declineIsActive` - is decline-button active

  * `declineButtonSize` - property for size styling, set to `lg`, `md`, `sm` or `xs`

  * `declineButtonType` - type of decline-button ('secondary')

  * `declineIconActive` - icon for decline-button when it's active

  * `declineIconInactive` - icon for decline-button when it's not active

There are custom properties used in the some modals:

* **Prompt**

  * `inputLabel` - label for input shown in the modal's body

* **Check Confirm**

  * `inputLabel` - label for the checkbox shown in the modal's body

* **Prompt Confirm**

  * `inputLabel` - label for the input shown in the modal's body

  * `promptValue` - value that must be prompted in the modal's body to confirm modal

* **Progress**

  * `showLabel` - if true a label will be shown inside the progress bar

  * `striped` - create a striped effect

  * `animate` - animate the stripes

  * `type` - property for type styling

* **Process**

   * `iconClass` - icon shown as a "spinner"

You may set default options for all modals with:

{{#docs-snippet name="default-options.js"}}
set(modalsManager, 'defaultOptions', {...});
{{/docs-snippet}}
