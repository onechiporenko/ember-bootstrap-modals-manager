<div class="font-sans text-black leading-normal">
  {{#docs-header as |header|}}
    {{#header.link "demo"}}
      Demo
    {{/header.link}}
  {{/docs-header}}
  <div class="docs-container docs-md">
    <section class="max-w-md mx-auto pb-8">
      {{docs-hero
        logo="ember"
        slimHeading="Bootstrap"
        strongHeading="Modals Manager"
        byline="Modals-manager for modals from ember-bootstrap"}}

`ember-bootstrap-modals-manager` is an Ember-addon that provides a simple mechanism for interaction with user using modals. This addon is based on modals from `ember-bootstrap`.

**Restriction** from the [Bootstrap#modals](https://getbootstrap.com/docs/3.3/javascript/#modals):

> Multiple open modals not supported

You can check how this addon works on [demo-page](https://onechiporenko.github.io/ember-bootstrap-modals-manager/demo).

<div class="my-16 text-right">
  {{#link-to "docs" class="bg-grey-darkest hover:bg-black text-white py-2 px-4 no-underline rounded"}}
    Read the docs →
  {{/link-to}}
</div>
    </section>
  </div>
</div>