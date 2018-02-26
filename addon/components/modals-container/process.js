import Base from './base';
import layout from '../../templates/components/modals-container/process';
import {get} from '@ember/object';

/**
 * Here `process` means function thar return Promise
 *
 * @class Process
 * @namespace Components
 * @extends Components.BaseModal
 */
export default Base.extend({
  layout,

  didInsertElement() {
    const process = get(this, 'options.process');
    if (process) {
      process()
        .then(v => this.send('confirm', v))
        .catch(e => this.send('decline', e));
    }
  }
});
