import Component from '@ember/component';
import layout from '../templates/components/custom-prompt-body';
import { layout as templateLayout } from '@ember-decorators/component';
import { action } from "@ember/object";

export default
@templateLayout(layout)
class CustomPromptBodyComponent extends Component {
  @action
  updatePromptValueInternal(e) {
    this.updatePromptValue(e.target.value);
  }
}
