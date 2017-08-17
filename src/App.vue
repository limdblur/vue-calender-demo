<template>
  <div id="app">
    <my-header></my-header>
    <div class="main">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    </div>
    <div v-transfer-dom>
      <loading v-show="loadingStatus" text="加载中..."></loading>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Loading, TransferDomDirective as TransferDom } from 'vux'
import MyHeader from './components/Header.vue'
export default {
  name: 'app',
  computed: {
    ...mapState(['loadingStatus'])
  },
  components: {
    MyHeader,
    Loading
  },
  directives: {
    TransferDom
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import './assets/css/variable.less';
#app{
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .main{
    flex: 1;
    overflow-y: auto;
    -webkit-overflwo-scrolling: touch;
  }
}
.vux-loading{
  .weui-toast{
    width: 5.6em;
    min-height: 5.6em;
  }
  .weui-toast__content{
    font-size: @gufen-small-btn-size;
    margin: 0.375rem auto;
  }
}

</style>
