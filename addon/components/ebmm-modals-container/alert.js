import { layout as templateLayout } from '@ember-decorators/component';
import AlertModal from 'ember-modals-manager-internal/components/emmi-modals-container/alert';
import layout from 'ember-bootstrap-modals-manager/templates/components/ebmm-modals-container/alert';

export default
@templateLayout(layout)
class _AlertModal extends AlertModal {
}
