/*
 * @Author: beyondouyuan
 * @Date:   2018-07-08 11:30:57
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-07-13 23:54:16
 */
import Toast from './index'

export default {
    install(Vue, options = {}) {
        const VueToast = Vue.extend(Toast)
        let toast = null

        function $Toast(params) {
            return new Promise(resolve => {
                if (!toast) {
                    toast = new VueToast()

                    toast.$mount()

                    document.querySelector(options.container || 'body').appendChild(toast.$el)
                }
                toast.show(params)
                resolve()
            })
        }

        Vue.prototype.$Toast = $Toast
    }
}
