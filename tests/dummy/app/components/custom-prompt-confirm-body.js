import Component from '@glimmer/component';
import { action } from '@ember/object';

class CustomPromptConfirmBodyComponent extends Component {
  @action
  updatePromptValueInternal(e) {
    this.args.updatePromptValue(e.target.value);
  }
}

export default CustomPromptConfirmBodyComponent;
