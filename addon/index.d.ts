export {
  EbmmPromiseFactory,
  EbmmConfirmPayload,
  EbmmDeclinePayload,
  EbmmModalOptions,
  default as ModalsManager,
} from './services/modals-manager';

export { default as ModalsContainer } from './components/modals-container';
export { default as AlertModal } from './components/ebmm-modals-container/alert';
export {
  ModalArgs,
  default as BaseModal,
} from './components/ebmm-modals-container/base';
export { default as ConfirmModal } from './components/ebmm-modals-container/confirm';
export { default as PromptModal } from './components/ebmm-modals-container/prompt';
export { default as CheckConfirmModal } from './components/ebmm-modals-container/check-confirm';
export { default as PromptConfirmModal } from './components/ebmm-modals-container/prompt-confirm';
export { default as ProcessModal } from './components/ebmm-modals-container/process';
export { default as ProgressModal } from './components/ebmm-modals-container/progress';
