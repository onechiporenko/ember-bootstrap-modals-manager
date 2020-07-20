import { layout as templateLayout } from '@ember-decorators/component';
import ProgressModal from 'ember-modals-manager-internal/components/emmi-modals-container/progress';
import layout from 'ember-bootstrap-modals-manager/templates/components/ebmm-modals-container/progress';

export default
@templateLayout(layout)
class _ProgressModal extends ProgressModal {
}
