import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('customModalText', function(app, assert, part, text) {
  assert.ok(find(`.modal-${part}`).text().trim().includes(text), `${part} has "${text}"`);
});
