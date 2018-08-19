/*
 * @Author: beyondouyuan
 * @Date:   2018-03-18 01:48:44
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-08-10 00:02:17
 * mutations.js 对state进行修改
 */
import * as types from './mutations-types'

const mutations = {
    [types.SET_LOADING](state, loading) {
        state.fetchLoading = loading
    },
    [types.TOGGLE_SIDEBAR](state) {
        state.sidebar.opened = !state.sidebar.opened
    },
    [types.CLOSE_SIDEBAR](state, opened) {
        state.sidebar.opened = opened
    },
    [types.SET_ACCOUNT](state, account) {
        state.account = account
    },
    [types.TOGGLE_DROP](state) {
        state.drop = !state.drop
    },
    [types.CLOSE_DROP](state, drop) {
        state.drop = drop
    },
}

export default mutations
