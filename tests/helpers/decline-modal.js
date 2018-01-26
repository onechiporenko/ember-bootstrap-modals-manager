import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('declineModal', function() {
  click(`.modal-footer button:first`);
});
