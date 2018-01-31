import { registerAsyncHelper } from '@ember/test';
import $ from 'jquery';

export default registerAsyncHelper('confirmButtonState', function(app, assert, state) {
  const btnSelector = '.modal-footer button:last';
  state ?
    assert.ok($(btnSelector).is(':disabled')) :
    assert.ok($(btnSelector).is(':enabled'));
});
