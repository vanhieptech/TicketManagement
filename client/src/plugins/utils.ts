
import Vue from 'vue'
import util from './util'
import * as timeFilters from './time'

export default () => {
  util.each(timeFilters, function (value, key) {
    Vue.filter(key, value)
  })
}
