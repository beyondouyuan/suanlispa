/*
* @Author: beyondouyuan
* @Date:   2018-07-15 00:37:01
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-07-15 00:38:59
*/
import Alert from './index'

export default {
    install(Vue, options = {}) {
        const VueAlert = Vue.extend(Alert)
        let alert = null

        function $Alert(params) {
            return new Promise(resolve => {
                if (!alert) {
                    alert = new VueAlert()

                    alert.$mount()

                    document.querySelector(options.container || 'body').appendChild(alert.$el)
                }
                alert.show(params)
                resolve()
            })
        }

        Vue.prototype.$Alert = $Alert
    }
}
