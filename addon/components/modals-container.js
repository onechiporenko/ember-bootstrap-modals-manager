import { layout as templateLayout } from '@ember-decorators/component';
import ModalsContainer from 'ember-modals-manager-internal/components/modals-container';
import layout from 'ember-modals-manager-internal/templates/components/modals-container';

export default
@templateLayout(layout)
class _ModalsContainer extends ModalsContainer {
}
