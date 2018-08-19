/*
* @Author: beyondouyuan
* @Date:   2018-03-18 01:48:24
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-04-11 19:21:58
*/

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})



