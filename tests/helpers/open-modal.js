import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('openModal',
  function(app, type) {
    click(`button.${type}-modal`);
  }
);