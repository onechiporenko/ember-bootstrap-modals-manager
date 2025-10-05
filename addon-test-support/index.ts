import { click, fillIn, find } from '@ember/test-helpers';
import { assert } from 'qunit';

type Assert = typeof assert;

export function getConfirmButtonState(
  selector: string,
): (a: Assert, s: boolean) => void {
  return function (assert: Assert, state: boolean): void {
    const btn = document.querySelector<HTMLButtonElement>(selector);
    if (state) {
      assert.ok(btn?.disabled);
    } else {
      assert.ok(!btn?.disabled);
    }
  };
}

export function getConfirmModal(selector: string): () => void {
  return async function (): Promise<void> {
    return await click(selector);
  };
}

export function getDeclineModal(selector: string): () => void {
  return async function (): Promise<void> {
    await click(selector);
  };
}

export function getCustomModalText(selectorsMap: {
  [key: string]: string;
}): (a: Assert, p: string, t: string) => void {
  return function (assert: Assert, part: string, text: string) {
    const selector = selectorsMap[part];
    if (!selector) {
      throw new Error(`Selector for part "${part}" not found in selectorsMap`);
    }
    const el: HTMLElement = find(selector) as HTMLElement;
    assert.ok(el?.innerText.includes(text), `${part} has "${text}"`);
  };
}

export function lastLogMessageAssert(assert: Assert, msg: string): void {
  const lastLogMsg = find('.logs')
    ?.innerHTML?.split('<br>')
    .slice(0, -1)
    .pop()
    ?.trim();
  assert.equal(lastLogMsg, msg);
}

export function getModalIsOpened(
  selector: string,
): (a: Assert, e: boolean) => void {
  return function (assert: Assert, expected: boolean): void {
    if (expected) {
      const modals = find(selector);
      assert.ok(!!modals, 'modal is opened');
    } else {
      const modals = find(selector);
      assert.notOk(!!modals, 'modal is not opened');
    }
  };
}

export async function openModal(type: string): Promise<void> {
  return await click(`button.${type}-modal`);
}

export function getPromptValue(selector: string): (v: string) => void {
  return async function (val: string): Promise<void> {
    await fillIn(selector, val);
  };
}
