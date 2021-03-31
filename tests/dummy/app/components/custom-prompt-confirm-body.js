import Component from '@glimmer/component';
import layout from '../templates/components/custom-prompt-confirm-body';
import { layout as templateLayout } from '@ember-decorators/component';
import { action } from '@ember/object';

@templateLayout(layout)
class CustomPromptConfirmBodyComponent extends Component {
  @action
  updatePromptValueInternal(e) {
    this.args.updatePromptValue(e.target.value);
  }
}

export default CustomPromptConfirmBodyComponent;
