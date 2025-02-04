import { action } from '@ember/object';
import Component from '@glimmer/component';

class CustomPromptBodyComponent extends Component {
  @action
  updatePromptValueInternal(e) {
    this.args.updatePromptValue(e.target.value);
  }
}

export default CustomPromptBodyComponent;
