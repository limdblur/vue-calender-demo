<template>
  <div class="test">
  <h2>这是测试页面</h2>
  </div>
</template>

<script>
import { MethodsMixin } from '../mixin.js'
export default {
  mixins: [MethodsMixin],
  mounted () {
    console.log(this)
    this.$el.querySelector('h2').style.color = 'red'
    this.$toastPlugin.toast.show({
      text: '百变的text'
    })
    console.log(this.getQueryString('activity_id'))
  }
}
</script>
