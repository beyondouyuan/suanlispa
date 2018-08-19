/*
 * @Author: beyondouyuan
 * @Date:   2018-07-31 21:31:29
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-07-31 21:39:24
 */
import Slide from './slide'
const slider = {
  install: function(Vue) {
    Vue.component('slide', Slide)
  }
}
export default slider
