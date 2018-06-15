import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('lastLogMessageAssert', function(app, assert, msg) {
  const lastLogMsg = find('.logs').html().trim().split('<br>').slice(0, -1).pop().trim();
  assert.equal(lastLogMsg, msg);
});
