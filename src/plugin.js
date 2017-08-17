/*
* @Author: Administrator
* @Date:   2017-08-01 09:22:20
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-02 11:32:09
*/
import ToastComponent from './components/toast.vue'

let $vm
export const ToastTestPlugin = {
  install (Vue, options) {
    // 创建实例
    if (!$vm) {
      const Toast = Vue.extend(ToastComponent)
      $vm = new Toast({
        el: document.createElement('div')
      })
      console.log($vm)
      document.body.appendChild($vm.$el)
    }

    const toast = {
      show (option = {}) {
        // $vm.show = true
        $vm.shows()
        $vm.text = option.text || '加载中。。。'
      }
    }

    if (!Vue.$toastPlugin) {
      Vue.$toastPlugin = {
        toast
      }
    } else {
      Vue.$toastPlugin.toast = toast
    }

    Vue.mixin({
      created () {
        this.$toastPlugin = Vue.$toastPlugin
      }
    })
  }
}
