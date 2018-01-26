import {test} from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | modals', {
  beforeEach() {
    visit('/');
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

test('prompt-confirm-modal', function (assert) {
  openModal('prompt-confirm');
  modalIsOpened(assert, true);
  confirmState(assert, true);
  customModalText(assert, 'header', 'Custom Prompt Confirm Modal Title');
  customModalText(assert, 'body', 'Please enter a "modal" without quotes');
  promptValue('modal');
  confirmState(assert, false);
  confirmModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Prompt-Confirm was confirmed (with "modal")');

  openModal('prompt-confirm');
  modalIsOpened(assert, true);
  confirmState(assert, true);
  declineModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Prompt-Confirm was declined');
});

test('Custom prompt-confirm-modal', function (assert) {
  openModal('custom-prompt-confirm');
  modalIsOpened(assert, true);
  confirmState(assert, true);
  customModalText(assert, 'header', 'Custom Prompt Confirm Title Component');
  customModalText(assert, 'body', 'Custom Prompt Confirm Body Component');
  customModalText(assert, 'body', 'Please enter a "modal" without quotes');
  customModalText(assert, 'footer', 'Custom Prompt Confirm Footer Component');
  promptValue('modal');
  confirmState(assert, false);
  confirmModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Custom Prompt-Confirm was confirmed (with "modal")');

  openModal('custom-prompt-confirm');
  modalIsOpened(assert, true);
  confirmState(assert, true);
  declineModal();
  modalIsOpened(assert, false);
  lastLogMessageAssert(assert, 'Custom Prompt-Confirm was declined');
});