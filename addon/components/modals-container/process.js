import { layout as templateLayout } from '@ember-decorators/component';
import ProcessModal from 'ember-modals-manager-internal/components/modals-container/process';
import layout from 'ember-modals-manager-internal/templates/components/modals-container/process';

export default
@templateLayout(layout)
class _ProcessModal extends ProcessModal {
}
