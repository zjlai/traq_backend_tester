import _ from 'underscore'

// leave the export, even if you don't use it
export default ({ Vue }) => {
  Vue.prototype.$_ = _
}
