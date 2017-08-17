/*
* @Author: Administrator
* @Date:   2017-07-27 15:21:15
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-27 15:25:09
*/

export const getQueryString = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
