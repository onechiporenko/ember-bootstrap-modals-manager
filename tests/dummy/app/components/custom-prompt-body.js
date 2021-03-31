import Component from '@glimmer/component';
import layout from '../templates/components/custom-prompt-body';
import { layout as templateLayout } from '@ember-decorators/component';
import { action } from '@ember/object';

@templateLayout(layout)
class CustomPromptBodyComponent extends Component {
  @action
  updatePromptValueInternal(e) {
    this.args.updatePromptValue(e.target.value);
  }
}

export default CustomPromptBodyComponent;
