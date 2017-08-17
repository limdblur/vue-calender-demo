/*
* @Author: Administrator
* @Date:   2017-07-26 09:22:13
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-28 14:08:07
*/

import * as types from './mutation-type.js'

const mutations = {
  [types.CHANGE_BACK_STATUS] (state, status) {
    state.backStatus = status
  },
  [types.CHANGE_FILTER_STATUS] (state, status) {
    state.filterStatus = status
  },
  [types.CHANGE_NAV_STATUS] (state, status) {
    state.navStatus = status
  },
  [types.CHANGE_LOADING_STATUS] (state, status) {
    state.loadingStatus = status
  },
  [types.CHANGE_TITLE] (state, title) {
    state.title = title
  },
  [types.FETCH_CUSTOMER_DETAIL] (state, data) {
    state.customerDetail = data
  },
  [types.FETCH_META_DATA] (state, data) {
    state.metaData = data
  }
}

export default mutations
