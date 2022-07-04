import Component from '@glimmer/component';
import { action } from '@ember/object';

class CustomPromptBodyComponent extends Component {
  @action
  updatePromptValueInternal(e) {
    this.args.updatePromptValue(e.target.value);
  }
}

export default CustomPromptBodyComponent;
