/*
 * @Author: beyondouyuan
 * @Date:   2018-07-31 21:31:29
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-07-31 22:57:30
 */
import Carousel from './carousel'
const Carouseler = {
  install: function(Vue) {
    Vue.component('Carousel', Carousel)
  }
}
export default Carouseler
