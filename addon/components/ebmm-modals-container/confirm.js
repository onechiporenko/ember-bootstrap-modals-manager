import { layout as templateLayout } from '@ember-decorators/component';
import ConfirmModal from 'ember-modals-manager-internal/components/emmi-modals-container/confirm';
import layout from 'ember-bootstrap-modals-manager/templates/components/ebmm-modals-container/confirm';

export default
@templateLayout(layout)
class _ConfirmModal extends ConfirmModal {
}
