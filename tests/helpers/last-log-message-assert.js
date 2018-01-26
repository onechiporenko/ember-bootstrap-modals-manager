import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('lastLogMessageAssert', function(app, assert, msg) {
  const lastLogMsg = find('.logs').text().trim().split('\n').pop();
  assert.equal(lastLogMsg, msg);
});
