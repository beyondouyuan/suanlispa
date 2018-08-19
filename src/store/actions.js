/*
* @Author: beyondouyuan
* @Date:   2018-03-18 01:47:48
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-08-10 00:28:10
* actions.js 即对数据进行各种操作，即通过commit给mutaions实现
*/

import * as types from './mutations-types'
import {
    setSessionStorage,
    removeSessionStorage
} from '@/utils/tool'


export const LoginoutAction = ({commit}) => {
    removeSessionStorage('userInfo')
    commit(types.SET_ACCOUNT, '')
}

export const AccountAction = ({commit}, account) => {
    setSessionStorage('userInfo', account)
    commit(types.SET_ACCOUNT, account)
}

export const LoadingAction = ({commit}, loading) => {
    commit(types.SET_LOADING, loading)
}

export const toggleSideBar = ({commit}) => {
    commit(types.TOGGLE_SIDEBAR)
}

export const handleCloseSideBar = ({commit}, opener) => {
    commit(types.CLOSE_SIDEBAR, opener)
}

export const toggleDrop = ({commit}) => {
    commit(types.TOGGLE_DROP)
}

export const handleCloseDrop = ({commit}, drop) => {
    commit(types.CLOSE_DROP, drop)
}
