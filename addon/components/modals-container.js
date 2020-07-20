import { layout as templateLayout } from '@ember-decorators/component';
import EmmiModalsContainer from 'ember-modals-manager-internal/components/emmi-modals-container';
import layout from 'ember-modals-manager-internal/templates/components/emmi-modals-container';

export default
@templateLayout(layout)
class ModalsContainer extends EmmiModalsContainer {
}
