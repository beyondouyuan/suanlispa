/*
 * @Author: beyondouyuan
 * @Date:   2018-04-08 12:03:42
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-08-10 00:04:41
 */
import router from '@/router'
import store from '@/store'
import {
    getStorage,
    getSessionStorage
} from '@/utils/tool'



router.beforeEach((to, redirect, next) => {
    // 需要做校验的路由
    if (to.matched.some(m => m.meta.auth)) {
        const userInfo = getSessionStorage('userInfo')
        // 已登陆
        if (userInfo) {
            next()
        } else { // 未登陆
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next()
    }
})

router.afterEach(() => {
})
