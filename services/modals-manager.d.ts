import Component from '@glimmer/component';
import Service from '@ember/service';
import RSVP from 'rsvp';
export declare type EbmmPromiseFactory = () => RSVP.Promise<any>;
export declare type EbmmConfirmPayload = any;
export declare type EbmmDeclinePayload = any;
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
    confirmButtonSize?: string;
    confirmButtonType?: string;
    confirmIconActive?: string;
    confirmIconInactive?: string;
    declineIsActive?: boolean;
    declineButtonSize?: string;
    declineButtonType?: string;
    declineIconActive?: string;
    declineIconInactive?: string;
}
/**
 * @category Services
 */
export default class ModalsManager<T> extends Service {
    protected modalIsOpened: boolean;
    protected modalDefer: RSVP.Deferred<T> | null;
    defaultOptions: EbmmModalOptions;
    protected options: EbmmModalOptions;
    protected componentToRender: string | unknown | null;
    /**
     * @throws {Error} if some modal is already opened
     * @param componentToRender Component's child-class represents needed modal
     * @param options options passed to the rendered modal
     */
    show(componentToRender: typeof Component, options: EbmmModalOptions): RSVP.Promise<T>;
    /**
     * @category Default Modals
     */
    alert(options: EbmmModalOptions): RSVP.Promise<T>;
    /**
     * @category Default Modals
     */
    confirm(options: EbmmModalOptions): RSVP.Promise<T>;
    /**
     * @category Default Modals
     */
    prompt(options: EbmmModalOptions): RSVP.Promise<T>;
    /**
     * @category Default Modals
     * @throws {Error} if `options.promptValue` is not provided
     */
    promptConfirm(options: EbmmModalOptions): RSVP.Promise<T>;
    /**
     * @category Default Modals
     */
    checkConfirm(options: EbmmModalOptions): RSVP.Promise<T>;
    /**
     * @category Default Modals
     * @throws {Error} if `options.promises` is not an array
     */
    progress(options: EbmmModalOptions): RSVP.Promise<T>;
    /**
     * @category Default Modals
     * @throws {Error} if `options.process` is not defined
     */
    process(options: EbmmModalOptions): RSVP.Promise<T>;
    /**
     * @category Action Handlers
     */
    onConfirmClick(v: EbmmConfirmPayload): void;
    /**
     * @category Action Handlers
     */
    onDeclineClick(v: EbmmDeclinePayload): void;
    protected clearOptions(): void;
}
//# sourceMappingURL=modals-manager.d.ts.map