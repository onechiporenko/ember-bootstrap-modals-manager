import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('promptValue', function(app, val) {
  fillIn('.modal-body input', val);
});
