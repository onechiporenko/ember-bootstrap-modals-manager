import { action } from '@ember/object';
import Component from '@glimmer/component';

class CustomPromptConfirmBodyComponent extends Component {
  @action
  updatePromptValueInternal(e) {
    this.args.updatePromptValue(e.target.value);
  }
}

export default CustomPromptConfirmBodyComponent;
