import { layout as templateLayout } from '@ember-decorators/component';
import PromptModal from 'ember-modals-manager-internal/components/emmi-modals-container/prompt';
import layout from 'ember-bootstrap-modals-manager/templates/components/ebmm-modals-container/prompt';

export default
@templateLayout(layout)
class _PromptModal extends PromptModal {
}
