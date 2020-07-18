import { layout as templateLayout } from '@ember-decorators/component';
import PromptConfirmModal from 'ember-modals-manager-internal/components/modals-container/prompt-confirm';
import layout from 'ember-bootstrap-modals-manager/templates/components/modals-container/prompt-confirm';

export default
@templateLayout(layout)
class _PromptConfirmModal extends PromptConfirmModal {
}
