import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('confirmModal', function() {
  click(`.modal-footer button:last`);
});
