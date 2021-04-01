import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@glimmer/component';
import layout from 'ember-power-select-blockless/templates/components/power-select-blockless';

@templateLayout(layout)
class CustomPowerSelectBlockless extends Component {
  searchField = null;
}

export default CustomPowerSelectBlockless;
