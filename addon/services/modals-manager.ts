import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import Service from '@ember/service';
import { isArray } from '@ember/array';
import RSVP, { defer } from 'rsvp';

import AlertModal from '../components/ebmm-modals-container/alert';
import ConfirmModal from '../components/ebmm-modals-container/confirm';
import PromptModal from '../components/ebmm-modals-container/prompt';
import PromptConfirmModal from '../components/ebmm-modals-container/prompt-confirm';
import CheckConfirmModal from '../components/ebmm-modals-container/check-confirm';
import ProcessModal from '../components/ebmm-modals-container/process';
import ProgressModal from '../components/ebmm-modals-container/progress';
import { ModalSignature } from '../components/ebmm-modals-container/base';

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
  confirmButtonDefaultText?: string;
  confirmButtonFulfilledText?: string;
  confirmButtonPendingText?: string;
  confirmButtonRejectedText?: string;
  declineButtonDefaultText?: string;
  declineButtonFulfilledText?: string;
  declineButtonPendingText?: string;
  declineButtonRejectedText?: string;
  cancel?: string;
  promptValue?: string;
  process?: EbmmPromiseFactory;
  promises?: EbmmPromiseFactory[];
  settled?: boolean;
  disallowEmpty?: boolean;
  modalClass?: string;
  backdrop?: boolean;
  backdropClose?: boolean;
  fade?: boolean;
  keyboard?: boolean;
  position?: 'top' | 'center';
  scrollable?: boolean;
  size?: 'lg' | 'sm' | null;
  backdropTransitionDuration?: number;
  renderInPlace?: boolean;
  transitionDuration?: number;
  confirmIsActive?: boolean;
  confirmButtonSize?: 'lg' | 'sm' | null;
  confirmButtonType?: string;
  confirmIconActive?: string;
  confirmIconInactive?: string;
  declineIsActive?: boolean;
  declineButtonSize?: 'lg' | 'sm' | null;
  declineButtonType?: string;
  declineIconActive?: string;
  declineIconInactive?: string;
  closeButton?: boolean;
  cancelable?: boolean;
  inputLabel?: string;
  animate?: boolean;
  type?: string;
  striped?: boolean;
  showLabel?: boolean;
  iconClass?: string;
}

/**
 * @category Services
 */
export default class ModalsManager<T> extends Service {
  @tracked
  protected modalIsOpened = false;

  @tracked
  protected modalDefer: RSVP.Deferred<T> | null = null;

  @tracked
  defaultOptions: EbmmModalOptions = {
    title: ' ',
    body: ' ',
    footer: ' ',
    confirmButtonDefaultText: 'Yes',
    confirmButtonFulfilledText: 'Yes',
    confirmButtonPendingText: 'Yes',
    confirmButtonRejectedText: 'Yes',
    declineButtonDefaultText: 'No',
    declineButtonFulfilledText: 'No',
    declineButtonPendingText: 'No',
    declineButtonRejectedText: 'No',
    cancel: 'Cancel',
    backdrop: true,
    backdropClose: true,
    backdropTransitionDuration: 150,
    fade: true,
    keyboard: true,
    position: 'top',
    renderInPlace: false,
    scrollable: false,
    size: null,
    transitionDuration: 300,
    confirmIsActive: false,
    confirmButtonSize: null,
    confirmButtonType: 'primary',
    confirmIconActive: '',
    confirmIconInactive: '',
    declineIsActive: false,
    declineButtonSize: null,
    declineButtonType: 'secondary',
    declineIconActive: '',
    declineIconInactive: '',
    modalClass: ''
  };

  @tracked
  protected options: EbmmModalOptions = {} as EbmmModalOptions;

  @tracked
  protected componentToRender: string | unknown | null = null;

  /**
   * @throws {Error} if some modal is already opened
   * @param componentToRender Component's child-class represents needed modal
   * @param options options passed to the rendered modal
   */
  show(componentToRender: typeof Component<ModalSignature>, options: EbmmModalOptions): RSVP.Promise<T> {
    assert('Only one modal may be opened in the same time!', !this.modalIsOpened);
    const component = componentToRender;
    const opts = Object.assign({}, this.defaultOptions, options);
    this.componentToRender = component;
    this.modalIsOpened = true;
    this.options = opts;
    const modalDefer = defer<T>();
    this.modalDefer = modalDefer;
    return modalDefer.promise;
  }

  /**
   * @category Default Modals
   */
  alert(options: EbmmModalOptions): RSVP.Promise<T> {
    return this.show(AlertModal, options);
  }

  /**
   * @category Default Modals
   */
  confirm(options: EbmmModalOptions): RSVP.Promise<T> {
    return this.show(ConfirmModal, options);
  }

  /**
   * @category Default Modals
   */
  prompt(options: EbmmModalOptions): RSVP.Promise<T> {
    return this.show(PromptModal, options);
  }

  /**
   * @category Default Modals
   * @throws {Error} if `options.promptValue` is not provided
   */
  promptConfirm(options: EbmmModalOptions): RSVP.Promise<T> {
    assert('"options.promptValue" must be defined and not empty', !!options.promptValue);
    return this.show(PromptConfirmModal, options);
  }

  /**
   * @category Default Modals
   */
  checkConfirm(options: EbmmModalOptions): RSVP.Promise<T> {
    return this.show(CheckConfirmModal, options);
  }

  /**
   * @category Default Modals
   * @throws {Error} if `options.promises` is not an array
   */
  progress(options: EbmmModalOptions): RSVP.Promise<T> {
    assert('`options.promises` must be an array', options && isArray(options.promises));
    return this.show(ProgressModal, options);
  }

  /**
   * @category Default Modals
   * @throws {Error} if `options.process` is not defined
   */
  process(options: EbmmModalOptions): RSVP.Promise<T> {
    assert('`options.process` must be defined', !!(options && options?.process));
    return this.show(ProcessModal, options);
  }

  /**
   * @category Action Handlers
   */
  onConfirmClick(v: EbmmConfirmPayload): void {
    this.modalIsOpened = false;
    this.modalDefer && this.modalDefer.resolve(v);
    this.clearOptions();
  }

  /**
   * @category Action Handlers
   */
  onDeclineClick(v: EbmmDeclinePayload): void {
    this.modalIsOpened = false;
    // eslint-disable-next-line ember/no-array-prototype-extensions
    this.modalDefer && this.modalDefer.reject(v);
    this.clearOptions();
  }

  protected clearOptions(): void {
    this.options = {} as EbmmModalOptions;
  }
}
