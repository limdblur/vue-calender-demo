/*
* @Author: Administrator
* @Date:   2017-07-26 09:22:13
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-28 14:06:26
*/

import * as actions from './actions.js'
import * as getters from './getters.js'
import mutations from './mutations.js'

const state = {
  backStatus: false,
  filterStatus: false,
  navStatus: false,
  loadingStatus: false,
  title: '股份大会',
  customerDetail: {},
  metaData: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
