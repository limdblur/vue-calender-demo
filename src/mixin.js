/*
* @Author: Administrator
* @Date:   2017-08-02 14:37:03
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-02 14:41:07
*/

export const MethodsMixin = {
  methods: {
    getQueryString (name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      const r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  }
}
