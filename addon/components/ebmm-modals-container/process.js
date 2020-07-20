import { layout as templateLayout } from '@ember-decorators/component';
import ProcessModal from 'ember-modals-manager-internal/components/emmi-modals-container/process';
import layout from 'ember-bootstrap-modals-manager/templates/components/ebmm-modals-container/process';

export default
@templateLayout(layout)
class _ProcessModal extends ProcessModal {
}
