import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';
import { assert } from '@ember/debug';
import Service from '@ember/service';
import { isArray } from '@ember/array';
import RSVP, { defer } from 'rsvp';

export declare type EbmmPromiseFactory = () => RSVP.Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
export declare type EbmmConfirmPayload = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export declare type EbmmDeclinePayload = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export declare interface EbmmModalOptions {
  title?: string;
  titleComponent?: string;
  body?: string;
  bodyComponent?: string;
  footer?: string;
  footerComponent?: string;
  confirm?: string;
  decline?: string;
  cancel?: string;
  promptValue?: string;
  process?: EbmmPromiseFactory;
  promises?: EbmmPromiseFactory[];
  settled?: boolean;
  disallowEmpty?: boolean;
}

export default class ModalsManager<T> extends Service {

  modalIsOpened = false;

  modalsContainerPath = 'ebmm-modals-container';

  modalDefer: RSVP.Deferred<T> | null = null;

  defaultOptions: EbmmModalOptions = {
    title: ' ',
    body: ' ',
    footer: ' ',
    confirm: 'Yes',
    decline: 'No',
    cancel: 'Cancel'
  };

  @tracked
  options: EbmmModalOptions = {} as EbmmModalOptions;

  componentName: string | null = null;

  show(componentName: string, options: EbmmModalOptions): RSVP.Promise<T> {
    assert('Only one modal may be opened in the same time!', !this.modalIsOpened);
    const opts = Object.assign({}, this.defaultOptions, options);
    set(this, 'modalIsOpened', true);
    set(this, 'options', opts);
    set(this, 'componentName', componentName);
    const modalDefer = defer<T>();
    set(this, 'modalDefer', modalDefer);
    return modalDefer.promise;
  }

  /**
   * Shows `alert`-modal
   */
  alert(options: EbmmModalOptions): RSVP.Promise<T> {
    return this.show(`${this.modalsContainerPath}/alert`, options);
  }

  /**
   * Shows `confirm`-modal
   */
  confirm(options: EbmmModalOptions): RSVP.Promise<T> {
    return this.show(`${this.modalsContainerPath}/confirm`, options);
  }

  /**
   * Shows `prompt`-modal
   */
  prompt(options: EbmmModalOptions): RSVP.Promise<T> {
    return this.show(`${this.modalsContainerPath}/prompt`, options);
  }

  /**
   * Shows `prompt-confirm`-modal
   */
  promptConfirm(options: EbmmModalOptions): RSVP.Promise<T> {
    assert('"options.promptValue" must be defined and not empty', !!options.promptValue);
    return this.show(`${this.modalsContainerPath}/prompt-confirm`, options);
  }

  /**
   * Show `check-confirm`-modal
   */
  checkConfirm(options: EbmmModalOptions): RSVP.Promise<T> {
    return this.show(`${this.modalsContainerPath}/check-confirm`, options);
  }

  /**
   * Shows `progress`-modal. This modal doesn't have any controls and is auto-closed when progress is completed
   */
  progress(options: EbmmModalOptions): RSVP.Promise<T> {
    assert('`options.promises` must be an array', options && isArray(options.promises));
    return this.show(`${this.modalsContainerPath}/progress`, options);
  }

  process(options: EbmmModalOptions): RSVP.Promise<T> {
    assert('`options.process` must be defined', options && options.process);
    return this.show(`${this.modalsContainerPath}/process`, options);
  }

  onConfirmClick(v: EbmmConfirmPayload): void {
    set(this, 'modalIsOpened', false);
    this.modalDefer?.resolve(v);
    this.clearOptions();
  }

  onDeclineClick(v: EbmmDeclinePayload): void {
    set(this, 'modalIsOpened', false);
    this.modalDefer?.reject(v);
    this.clearOptions();
  }

  protected clearOptions(): void {
    set(this, 'options', {} as EbmmModalOptions);
  }
}
