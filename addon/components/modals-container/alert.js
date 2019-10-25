import { layout as templateLayout } from '@ember-decorators/component';
import AlertModal from 'ember-modals-manager-internal/components/modals-container/alert';
import layout from 'ember-modals-manager-internal/templates/components/modals-container/alert';

export default
@templateLayout(layout)
class _AlertModal extends AlertModal {
}
