/*
 * @Author: beyondouyuan
 * @Date:   2018-03-18 01:51:39
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-08-10 00:28:29
 * state.js 定义管理所有的数据状态，即存放数据的地方
 */

import {
    getSessionStorage
} from '@/utils/tool'

const state = {
    account: {
      ...getSessionStorage('userInfo')
    },
    sidebar: {
      opened: false
    },
    drop: false,
    fetchLoading: false
}

export default state
