/*
 * @Author: beyondouyuan
 * @Date:   2018-04-26 12:54:08
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-08-17 22:27:03
 */
import axios from 'axios'
import store from '@/store'
/**
 * [创建axios 实例]
 * @type {[type]}
 */
let requestStart = new Date()
// 初始化请求配置
const service = axios.create({
    baseURL: process.env.BASE_API,
    // 处理跨域跟路径
    // baseURL: process.env.ENV_CONFIG == 'dev' ? '' : process.env.BASE_API,
    timeout: 50000,
    loading: true,
    method: 'POST',
    withCredentials: false
})

/**
 * [统一拦截请求]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
service.interceptors.request.use(config => {
    requestStart = new Date()
    const { loading } = config
    // 发起请求时是否使用全局loading
    loading && store.dispatch('LoadingAction', true)
    return config
}, error => {
    console.log(error) // 打印测试
    Promise.reject(error)
})
/**
 * [统一拦截响应]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
service.interceptors.response.use(
    response => {
        const requestEnd = new Date()
        const requestTime = requestEnd.getTime() - requestStart.getTime()
        if (requestTime < 1200) {
            setTimeout(() => {
                store.dispatch('LoadingAction', false)
            }, 1200 - requestTime)
        } else {
            store.dispatch('LoadingAction', false)
        }
        return Promise.resolve(response)
    },
    error => {
        setTimeout(() => {
            store.dispatch('LoadingAction', false)
        }, 1200)
        console.log('error ' + error) // 打印测试
        return Promise.reject(error)
    }

)

export default service
