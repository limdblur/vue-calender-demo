/*
* @Author: Administrator
* @Date:   2017-07-26 09:22:13
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-28 14:05:17
*/

export const changeBackStatus = ({ commit }, status) => {
  commit('CHANGE_BACK_STATUS', status)
}

export const changeFilterStatus = ({ commit }, status) => {
  commit('CHANGE_FILTER_STATUS', status)
}

export const changeNavStatus = ({ commit }, status) => {
  commit('CHANGE_NAV_STATUS', status)
}

export const changeLoadingStatus = ({ commit }, status) => {
  commit('CHANGE_LOADING_STATUS', status)
}

export const changeTitle = ({ commit }, title) => {
  commit('CHANGE_TITLE', title)
}

export const fetchCustomerDetail = ({ commit }, data) => {
  commit('FETCH_CUSTOMER_DETAIL', data)
}

export const fetchMetaData = ({ commit }, data) => {
  commit('FETCH_META_DATA', data)
}
