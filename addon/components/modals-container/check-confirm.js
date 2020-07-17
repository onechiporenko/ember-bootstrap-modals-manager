import { layout as templateLayout } from '@ember-decorators/component';
import CheckConfirmModal from 'ember-modals-manager-internal/components/modals-container/check-confirm';
import layout from 'ember-bootstrap-modals-manager/templates/components/modals-container/check-confirm';

export default
@templateLayout(layout)
class _CheckConfirmModal extends CheckConfirmModal {
}
