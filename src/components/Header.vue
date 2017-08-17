<template>
  <header class="app-header">
    <div class="common-header">
      <div>
        <a href="javascript:;" class="back" v-show="backStatus" @click="goBack">返回</a>
      </div>
      <p class="title" @click="goCalender">{{title}}</p>
      <div>
        <a href="javascript:;" class="filter" v-show="filterStatus" @click="changeNavStatus">筛选</a>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['backStatus', 'filterStatus', 'title', 'navStatus'])
  },
  methods: {
    goCalender () {
      this.$router.push('/calender')
    },
    goBack () {
      this.$router.back()
    },
    changeNavStatus () {
      this.$store.dispatch('changeNavStatus', !this.navStatus)
    }
  }
}
</script>

<style lang="less">
  @import '../assets/css/variable.less';

  .app-header{
    .common-header{
      display: flex;
      height: 2.0rem;
      font-size: @gufen-btn-size;
      background: @gufen-header-color;
      color: #fff;
      >div{
        width: 3.5rem;
        height: 100%;
      }
      .title{
        flex: 1;
        text-align: center;
      }
      a,p{
        display: flex;
        align-items: center;
        justify-content: center;
      }
      a{
        position: relative;
        padding: 0 0.5rem;
        height: 100%;
      }
      .back{
        &:before{
          display: block;
          content: "";
          width: 0.3rem;
          height: 0.3rem;
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(-45deg);
          margin-right: 0.25rem;
        }
      }
      .filter{
        &:before{
          display: block;
          content: "";
          width: .7rem;
          height: .7rem;
          background: url('../assets/img/filter.png') no-repeat center center/ 100% 100%;
          margin-right: 0.25rem;
        }
      }
    }
  }
</style>
