<template>
  <div class="toast-plugin" v-show="show">
    {{text}}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
        text: ''
      }
    },
    methods: {
      shows () {
        this.show = true
      }
    },
    watch: {
      show (val) {
        console.log(val)
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.show = false
        }, 1500)
      }
    }
  }
</script>

<style lang="less">
  .toast-plugin {
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
    width: 5rem;
    height: 5rem;
    color: #fff;
    border-radius: 0.15rem;
    font-size: 0.5rem;
    background: rgba(0,0,0,.7);
  }
</style>
