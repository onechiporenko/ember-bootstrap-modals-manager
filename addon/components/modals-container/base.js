import { layout as templateLayout } from '@ember-decorators/component';
import BaseModal from 'ember-modals-manager-internal/components/modals-container/base';
import layout from 'ember-modals-manager-internal/templates/components/modals-container/base';

export default
@templateLayout(layout)
class _BaseModal extends BaseModal {
}
