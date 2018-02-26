import {test} from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | modals', {
  beforeEach() {
    visit('/');
    if (find('.disallow-empty input:checked').length) {
      click('.disallow-empty input');
    }
    if (find('.progress-will-fail input:checked').length) {
      click('.progress-will-fail input');
    }
  }
});

test('alert-modal', function (assert) {
  openModal('alert');
  modalIsOpened(assert, true);
  customModalText(assert, 'header', 'Custom Alert Modal Title');
  customModalText(assert, 'body', 'Custom Alert Modal Body');
  confirmModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Alert was confirmed');
});

test('Custom alert-modal', function (assert) {
  openModal('custom-alert');
  modalIsOpened(assert, true);
  customModalText(assert, 'header', 'Custom Alert Title Component');
  customModalText(assert, 'body', 'Custom Alert Body Component');
  customModalText(assert, 'footer', 'Custom Alert Footer Component');
  confirmModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Custom Alert was confirmed');
});

test('confirm-modal', function (assert) {
  openModal('confirm');
  modalIsOpened(assert, true);
  customModalText(assert, 'header', 'Custom Confirm Modal Title');
  customModalText(assert, 'body', 'Custom Confirm Modal Body');
  confirmModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Confirm was confirmed');

  openModal('confirm');
  modalIsOpened(assert, true);
  declineModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Confirm was declined');
});

test('Custom confirm-modal', function (assert) {
  openModal('custom-confirm');
  modalIsOpened(assert, true);
  customModalText(assert, 'header', 'Custom Confirm Title Component');
  customModalText(assert, 'body', 'Custom Confirm Body Component');
  customModalText(assert, 'footer', 'Custom Confirm Footer Component');
  confirmModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Custom Confirm was confirmed');

  openModal('custom-confirm');
  modalIsOpened(assert, true);
  declineModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Custom Confirm was declined');
});

test('prompt-modal', function (assert) {
  openModal('prompt');
  modalIsOpened(assert, true);
  customModalText(assert, 'header', 'Custom Prompt Modal Title');
  customModalText(assert, 'body', 'Custom Prompt Modal Body');
  customModalText(assert, 'body', 'Input Label');
  promptValue('test');
  confirmModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Prompt was confirmed (with "test")');

  openModal('prompt');
  modalIsOpened(assert, true);
  declineModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Prompt was declined');
});

test('prompt-modal with disabled Confirm button', function (assert) {
  click('.disallow-empty input');
  openModal('prompt');
  modalIsOpened(assert, true);
  customModalText(assert, 'header', 'Custom Prompt Modal Title');
  confirmButtonState(assert, true);
  promptValue('test');
  confirmButtonState(assert, false);
  confirmModal();
  modalIsOpened(assert, false);
});

test('Custom prompt-modal', function (assert) {
  openModal('custom-prompt');
  modalIsOpened(assert, true);
  customModalText(assert, 'header', 'Custom Prompt Title Component');
  customModalText(assert, 'body', 'Custom Prompt Body Component');
  customModalText(assert, 'footer', 'Custom Prompt Footer Component');
  promptValue('test');
  confirmModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Custom Prompt was confirmed (with "test")');

  openModal('custom-prompt');
  modalIsOpened(assert, true);
  declineModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Custom Prompt was declined');
});

test('Custom prompt-modal with disabled Confirm button', function (assert) {
  click('.disallow-empty input');
  openModal('custom-prompt');
  customModalText(assert, 'header', 'Custom Prompt Title Component');
  modalIsOpened(assert, true);
  confirmButtonState(assert, true);
  promptValue('test');
  confirmButtonState(assert, false);
  confirmModal();
  modalIsOpened(assert, false);
});

test('prompt-confirm-modal', function (assert) {
  openModal('prompt-confirm');
  modalIsOpened(assert, true);
  confirmButtonState(assert, true);
  customModalText(assert, 'header', 'Custom Prompt Confirm Modal Title');
  customModalText(assert, 'body', 'Please enter a "modal" without quotes');
  customModalText(assert, 'body', 'Input Label');
  promptValue('modal');
  confirmButtonState(assert, false);
  confirmModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Prompt-Confirm was confirmed (with "modal")');

  openModal('prompt-confirm');
  modalIsOpened(assert, true);
  confirmButtonState(assert, true);
  declineModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Prompt-Confirm was declined');
});

test('Custom prompt-confirm-modal', function (assert) {
  openModal('custom-prompt-confirm');
  modalIsOpened(assert, true);
  confirmButtonState(assert, true);
  customModalText(assert, 'header', 'Custom Prompt Confirm Title Component');
  customModalText(assert, 'body', 'Custom Prompt Confirm Body Component');
  customModalText(assert, 'body', 'Please enter a "modal" without quotes');
  customModalText(assert, 'footer', 'Custom Prompt Confirm Footer Component');
  promptValue('modal');
  confirmButtonState(assert, false);
  confirmModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Custom Prompt-Confirm was confirmed (with "modal")');

  openModal('custom-prompt-confirm');
  modalIsOpened(assert, true);
  confirmButtonState(assert, true);
  declineModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Custom Prompt-Confirm was declined');
});

test('check-confirm-modal', function (assert) {
  openModal('check-confirm');
  modalIsOpened(assert, true);
  confirmButtonState(assert, true);
  customModalText(assert, 'header', 'Custom Check Confirm Modal Title');
  customModalText(assert, 'body', 'Confirm your suggestion');
  customModalText(assert, 'body', 'Input Label');
  click('.modal-body input[type="checkbox"]');
  confirmButtonState(assert, false);
  confirmModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Check-Confirm was confirmed');

  openModal('check-confirm');
  modalIsOpened(assert, true);
  confirmButtonState(assert, true);
  declineModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Check-Confirm was declined');
});

test('Custom check-confirm-modal', function (assert) {
  openModal('custom-check-confirm');
  modalIsOpened(assert, true);
  confirmButtonState(assert, true);
  customModalText(assert, 'header', 'Custom Check Confirm Title Component');
  customModalText(assert, 'body', 'Custom Check Confirm Body Component');
  customModalText(assert, 'footer', 'Custom Check Confirm Footer Component');
  click('.modal-body input[type="checkbox"]');
  confirmButtonState(assert, false);
  confirmModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Custom Check-Confirm was confirmed');

  openModal('custom-check-confirm');
  modalIsOpened(assert, true);
  confirmButtonState(assert, true);
  declineModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Custom Check-Confirm was declined');
});

test('progress-modal (success)', function (assert) {
  openModal('progress');
  const done = assert.async();
  modalIsOpened(assert, true);
  andThen(() => {
    assert.equal(find('.modal-body .progress-bar').length, 1, 'Progress bar exists');
    assert.equal(find('.modal-footer button').length, 0, 'Footer has not buttons');
    keyEvent('.modal', 'keydown', 27).then(() => {  // click Esc
      assert.equal(find('.modal-body .progress-bar').length, 1, 'Progress bar exists');
    });
    triggerEvent('.modal', 'click');
    modalIsOpened(assert, true);
  });
  setTimeout(() => {
    modalIsOpened(assert, false);
    lastLogMessageAssert(assert, 'Progress was finished (with [0,1,2,3,4])');
    return done();
  }, 3000);
});

test('progress-modal (error)', function (assert) {
  click('.progress-will-fail input');
  openModal('progress');
  const done = assert.async();
  modalIsOpened(assert, true);
  andThen(() => {
    assert.equal(find('.modal-body .progress-bar').length, 1, 'Progress bar exists');
    assert.equal(find('.modal-footer button').length, 0, 'Footer has not buttons');
  });
  setTimeout(() => {
    // actually it's another modal (alert)
    modalIsOpened(assert, true);
    assert.equal(find('.modal-body .progress-bar').length, 0, 'Progress bar does not exist');
    customModalText(assert, 'body', 'Promise was rejected');
    lastLogMessageAssert(assert, 'Progress was failed (completed [0,1]). Error - "Promise was rejected"');
    return done();
  }, 1000);
});

test('Custom progress-modal (success)', function (assert) {
  openModal('custom-progress');
  const done = assert.async();
  modalIsOpened(assert, true);
  andThen(() => {
    customModalText(assert, 'header', 'Custom Progress Title Component');
    customModalText(assert, 'body', 'Custom Progress Body Component');
    customModalText(assert, 'body', '/ 5');
    customModalText(assert, 'footer', 'Custom Progress Footer Component');
    assert.equal(find('.modal-body .progress-bar').length, 1, 'Progress bar exists');
    assert.equal(find('.modal-footer button').length, 0, 'Footer has not buttons');
  });
  setTimeout(() => {
    modalIsOpened(assert, false);
    lastLogMessageAssert(assert, 'Progress was finished (with [0,1,2,3,4])');
    return done();
  }, 3000);
});

test('process-modal (success)', function (assert) {
  openModal('process');
  const done = assert.async();
  modalIsOpened(assert, true);
  andThen(() => {
    customModalText(assert, 'body', 'Some long process (you must add font-awesome to your project to use `fa`-icons)');
    assert.equal(find('.modal-footer button').length, 0, 'Footer has not buttons');
    keyEvent('.modal', 'keydown', 27).then(() => {  // click Esc
      assert.equal(find('.modal-body').length, 1, 'Modal exists');
    });
    triggerEvent('.modal', 'click');
    modalIsOpened(assert, true);
  });
  setTimeout(() => {
    modalIsOpened(assert, false);
    lastLogMessageAssert(assert, 'Process was confirmed (with some result)');
    return done();
  }, 3100);
});

test('process-modal (error)', function (assert) {
  click('.process-will-fail input');
  openModal('process');
  const done = assert.async();
  modalIsOpened(assert, true);
  setTimeout(() => {
    modalIsOpened(assert, false);
    lastLogMessageAssert(assert, 'Process was declined (with some error)');
    return done();
  }, 3100);
});

test('Custom process-modal', function (assert) {
  openModal('custom-process');
  const done = assert.async();
  modalIsOpened(assert, true);
  andThen(() => {
    customModalText(assert, 'header', 'Custom Process Title Component');
    customModalText(assert, 'body', 'Custom Process Body Component');
    customModalText(assert, 'body', 'Some long process (you must add font-awesome to your project to use `fa`-icons)');
    customModalText(assert, 'footer', 'Custom Process Footer Component');
  });
  setTimeout(() => {
    modalIsOpened(assert, false);
    lastLogMessageAssert(assert, 'Process was confirmed (with some result)');
    return done();
  }, 3100);
});