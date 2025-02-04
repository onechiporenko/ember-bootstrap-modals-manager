import { click, find, visit } from '@ember/test-helpers';
import {
  getConfirmButtonState,
  getConfirmModal,
  getCustomModalText,
  getDeclineModal,
  getModalIsOpened,
  getPromptValue,
  lastLogMessageAssert,
  openModal,
} from 'ember-modals-manager-internal/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

const confirmButtonState = getConfirmButtonState(
  '.modal-footer button:last-child',
);
const confirmModal = getConfirmModal('.modal-footer button:last-child');
const declineModal = getDeclineModal('.modal-footer button');
const cancelProgress = declineModal;
const customModalText = getCustomModalText({
  header: '.modal-header',
  body: '.modal-body',
  footer: '.modal-footer',
});
const modalIsOpened = getModalIsOpened('.modal');
const promptValue = getPromptValue('.modal-body input');

module('Acceptance | modals', function (hooks) {
  setupApplicationTest(hooks);

  test('alert-modal', async function (assert) {
    await visit('/demo');
    await openModal('alert');
    await modalIsOpened(assert, true);
    assert.ok(
      await find('.modal-header').innerText.includes(
        'Custom Alert Modal Title',
      ),
      `header has "Custom Alert Modal Title"`,
    );
    customModalText(assert, 'header', 'Custom Alert Modal Title');
    customModalText(assert, 'body', 'Custom Alert Modal Body');
    await confirmModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Alert was confirmed');
  });

  test('Custom alert-modal', async function (assert) {
    await visit('/demo');
    await openModal('custom-alert');
    await modalIsOpened(assert, true);
    customModalText(assert, 'header', 'Custom Alert Title Component');
    customModalText(assert, 'body', 'Custom Alert Body Component');
    customModalText(assert, 'footer', 'Custom Alert Footer Component');
    await confirmModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Custom Alert was confirmed');
  });

  test('confirm-modal', async function (assert) {
    await visit('/demo');
    await openModal('confirm');
    await modalIsOpened(assert, true);
    customModalText(assert, 'header', 'Custom Confirm Modal Title');
    customModalText(assert, 'body', 'Custom Confirm Modal Body');
    await confirmModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Confirm was confirmed');

    await openModal('confirm');
    await modalIsOpened(assert, true);
    await declineModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Confirm was declined');
  });

  test('Custom confirm-modal', async function (assert) {
    await visit('/demo');
    await openModal('custom-confirm');
    await modalIsOpened(assert, true);
    customModalText(assert, 'header', 'Custom Confirm Title Component');
    customModalText(assert, 'body', 'Custom Confirm Body Component');
    customModalText(assert, 'footer', 'Custom Confirm Footer Component');
    await confirmModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Custom Confirm was confirmed');

    await openModal('custom-confirm');
    await modalIsOpened(assert, true);
    await declineModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Custom Confirm was declined');
  });

  test('prompt-modal', async function (assert) {
    await visit('/demo');
    await openModal('prompt');
    await modalIsOpened(assert, true);
    customModalText(assert, 'header', 'Custom Prompt Modal Title');
    customModalText(assert, 'body', 'Custom Prompt Modal Body');
    customModalText(assert, 'body', 'Input Label');
    await promptValue('test');
    await confirmModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Prompt was confirmed (with "test")');

    await openModal('prompt');
    await modalIsOpened(assert, true);
    await declineModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Prompt was declined');
  });

  test('prompt-modal with disabled Confirm button', async function (assert) {
    await visit('/demo');
    await click('.disallow-empty input');
    await openModal('prompt');
    await modalIsOpened(assert, true);
    customModalText(assert, 'header', 'Custom Prompt Modal Title');
    await confirmButtonState(assert, true);
    await promptValue('test');
    confirmButtonState(assert, false);
    await confirmModal();
    await modalIsOpened(assert, false);
  });

  test('Custom prompt-modal', async function (assert) {
    await visit('/demo');
    await openModal('custom-prompt');
    await modalIsOpened(assert, true);
    customModalText(assert, 'header', 'Custom Prompt Title Component');
    customModalText(assert, 'body', 'Custom Prompt Body Component');
    customModalText(assert, 'footer', 'Custom Prompt Footer Component');
    await promptValue('test');
    await confirmModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(
      assert,
      'Custom Prompt was confirmed (with "test")',
    );

    await openModal('custom-prompt');
    await modalIsOpened(assert, true);
    await declineModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Custom Prompt was declined');
  });

  test('Custom prompt-modal with disabled Confirm button', async function (assert) {
    await visit('/demo');
    await click('.disallow-empty input');
    await openModal('custom-prompt');
    customModalText(assert, 'header', 'Custom Prompt Title Component');
    await modalIsOpened(assert, true);
    confirmButtonState(assert, true);
    await promptValue('test');
    confirmButtonState(assert, false);
    await confirmModal();
    await modalIsOpened(assert, false);
  });

  test('prompt-confirm-modal', async function (assert) {
    await visit('/demo');
    await openModal('prompt-confirm');
    await modalIsOpened(assert, true);
    confirmButtonState(assert, true);
    customModalText(assert, 'header', 'Custom Prompt Confirm Modal Title');
    customModalText(assert, 'body', 'Please enter a "modal" without quotes');
    customModalText(assert, 'body', 'Input Label');
    await promptValue('modal');
    confirmButtonState(assert, false);
    await confirmModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(
      assert,
      'Prompt-Confirm was confirmed (with "modal")',
    );

    await openModal('prompt-confirm');
    await modalIsOpened(assert, true);
    confirmButtonState(assert, true);
    await declineModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Prompt-Confirm was declined');
  });

  test('Custom prompt-confirm-modal', async function (assert) {
    await visit('/demo');
    await openModal('custom-prompt-confirm');
    await modalIsOpened(assert, true);
    confirmButtonState(assert, true);
    customModalText(assert, 'header', 'Custom Prompt Confirm Title Component');
    customModalText(assert, 'body', 'Custom Prompt Confirm Body Component');
    customModalText(assert, 'body', 'Please enter a "modal" without quotes');
    customModalText(assert, 'footer', 'Custom Prompt Confirm Footer Component');
    await promptValue('modal');
    await confirmButtonState(assert, false);
    await confirmModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(
      assert,
      'Custom Prompt-Confirm was confirmed (with "modal")',
    );

    await openModal('custom-prompt-confirm');
    await modalIsOpened(assert, true);
    confirmButtonState(assert, true);
    await declineModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Custom Prompt-Confirm was declined');
  });

  test('check-confirm-modal', async function (assert) {
    await visit('/demo');
    await openModal('check-confirm');
    await modalIsOpened(assert, true);
    confirmButtonState(assert, true);
    customModalText(assert, 'header', 'Custom Check Confirm Modal Title');
    customModalText(assert, 'body', 'Confirm your suggestion');
    customModalText(assert, 'body', 'Input Label');
    await click('.modal-body input[type="checkbox"]');
    confirmButtonState(assert, false);
    await confirmModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Check-Confirm was confirmed');

    await openModal('check-confirm');
    await modalIsOpened(assert, true);
    confirmButtonState(assert, true);
    await declineModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Check-Confirm was declined');
  });

  test('Custom check-confirm-modal', async function (assert) {
    await visit('/demo');
    await openModal('custom-check-confirm');
    await modalIsOpened(assert, true);
    confirmButtonState(assert, true);
    customModalText(assert, 'header', 'Custom Check Confirm Title Component');
    customModalText(assert, 'body', 'Custom Check Confirm Body Component');
    customModalText(assert, 'footer', 'Custom Check Confirm Footer Component');
    await click('.modal-body input[type="checkbox"]');
    confirmButtonState(assert, false);
    await confirmModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Custom Check-Confirm was confirmed');

    await openModal('custom-check-confirm');
    await modalIsOpened(assert, true);
    confirmButtonState(assert, true);
    await declineModal();
    await modalIsOpened(assert, false);
    await lastLogMessageAssert(assert, 'Custom Check-Confirm was declined');
  });

  test('progress-modal (success)', async function (assert) {
    await visit('/demo');
    await openModal('progress');
    const done = assert.async();
    await modalIsOpened(assert, true);
    assert.ok(await find('.modal-body .progress-bar'), 'Progress bar exists');
    await modalIsOpened(assert, true);
    setTimeout(async () => {
      await modalIsOpened(assert, false);
      await lastLogMessageAssert(
        assert,
        'Progress was finished (with [0,1,2,3,4])',
      );
      return done();
    }, 6500);
  });

  test('progress-modal (error)', async function (assert) {
    await visit('/demo');
    await click('.progress-will-fail input');
    await openModal('progress');
    const done = assert.async();
    await modalIsOpened(assert, true);
    assert.ok(find('.modal-body .progress-bar'), 'Progress bar exists');
    assert.notOk(find('.modal-footer button'), 'Footer is without buttons');
    setTimeout(async () => {
      // actually it's another modal (alert)
      await modalIsOpened(assert, true);
      assert.notOk(
        find('.modal-body .progress-bar'),
        'Progress bar does not exist',
      );
      customModalText(assert, 'body', 'Promise was rejected');
      await lastLogMessageAssert(
        assert,
        'Progress was failed (completed [0,1]). Error - "Promise was rejected"',
      );
      return done();
    }, 3500);
  });

  test('progress-modal (error settled)', async function (assert) {
    await visit('/demo');
    await click('.progress-will-fail input');
    await click('.progress-settled input');
    await openModal('progress');
    const done = assert.async();
    await modalIsOpened(assert, true);
    setTimeout(async () => {
      await modalIsOpened(assert, false);
      await lastLogMessageAssert(
        assert,
        'Progress was finished (with [[0,1,2,3,4],["Promise was rejected"]])',
      );
      return done();
    }, 7500);
  });

  test('progress-modal (cancelable)', async function (assert) {
    await visit('/demo');
    await click('.progress-cancelable input');
    await openModal('progress');
    const done = assert.async();
    await modalIsOpened(assert, true);
    setTimeout(async () => await cancelProgress(), 3500);
    setTimeout(async () => {
      await modalIsOpened(assert, false);
      await lastLogMessageAssert(
        assert,
        'Progress was finished (with [0,1,2,3])',
      );
      return done();
    }, 5000);
  });

  test('Custom progress-modal (success)', async function (assert) {
    await visit('/demo');
    await openModal('custom-progress');
    const done = assert.async();
    await modalIsOpened(assert, true);
    customModalText(assert, 'header', 'Custom Progress Title Component');
    customModalText(assert, 'body', 'Custom Progress Body Component');
    customModalText(assert, 'body', '/ 5');
    customModalText(assert, 'footer', 'Custom Progress Footer Component');
    assert.ok(find('.modal-body .progress-bar'), 'Progress bar exists');
    assert.notOk(find('.modal-footer button'), 'Footer is without buttons');
    setTimeout(async () => {
      await modalIsOpened(assert, false);
      await lastLogMessageAssert(
        assert,
        'Progress was finished (with [0,1,2,3,4])',
      );
      return done();
    }, 6000);
  });

  test('process-modal (success)', async function (assert) {
    await visit('/demo');
    await openModal('process');
    const done = assert.async();
    await modalIsOpened(assert, true);
    customModalText(
      assert,
      'body',
      'Some long process (you must add font-awesome to your project to use `fa`-icons)',
    );
    assert.notOk(await find('.modal-footer button'), 'Footer has not buttons');
    setTimeout(async () => {
      await modalIsOpened(assert, false);
      lastLogMessageAssert(assert, 'Process was confirmed (with some result)');
      return done();
    }, 5500);
  });

  test('process-modal (error)', async function (assert) {
    await visit('/demo');
    await click('.process-will-fail input');
    await openModal('process');
    const done = assert.async();
    await modalIsOpened(assert, true);
    setTimeout(() => {
      modalIsOpened(assert, false);
      lastLogMessageAssert(assert, 'Process was declined (with some error)');
      return done();
    }, 5500);
  });

  test('Custom process-modal', async function (assert) {
    await visit('/demo');
    await openModal('custom-process');
    const done = assert.async();
    await modalIsOpened(assert, true);
    customModalText(assert, 'header', 'Custom Process Title Component');
    customModalText(assert, 'body', 'Custom Process Body Component');
    customModalText(
      assert,
      'body',
      'Some long process (you must add font-awesome to your project to use `fa`-icons)',
    );
    customModalText(assert, 'footer', 'Custom Process Footer Component');
    setTimeout(() => {
      modalIsOpened(assert, false);
      lastLogMessageAssert(assert, 'Process was confirmed (with some result)');
      return done();
    }, 5500);
  });
});
