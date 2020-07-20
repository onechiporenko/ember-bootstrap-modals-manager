import { layout as templateLayout } from '@ember-decorators/component';
import BaseModal from 'ember-modals-manager-internal/components/emmi-modals-container/base';
import layout from 'ember-bootstrap-modals-manager/templates/components/ebmm-modals-container/base';

export default
@templateLayout(layout)
class _BaseModal extends BaseModal {
}
