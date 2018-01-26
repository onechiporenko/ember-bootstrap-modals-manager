import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('modalIsOpened',
  function(app, assert, expected) {
    if (expected) {
      const modals = findWithAssert('.modal');
      assert.equal(modals.length, 1);
    }
    else {
      const modals = find('.modal');
      assert.equal(modals.length, 0);
    }
  }
);