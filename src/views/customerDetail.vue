<template>
  <div class="customer-detail">
    <ul class="customer-detail-list">
      <li class="title vux-1px-b"><span>客户信息</span></li>
      <li class="item vux-1px-b" v-for="(item, index) in showData" :key="index">
        <span class="key">{{item.key}}</span>
        <span class="value">{{item.value === false ? '否' : item.value | date(3)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      showData: []
    }
  },
  mounted () {
    if (!this.metaData.length) {
      this.$router.push('/customer')
      return
    }
    this.getData()
  },
  // keep-alive 组件激活时调用
  activated () {
    this.getData()
  },
  methods: {
    getData () {
      const newMeta = this.metaData.map(item => {
        return {code: item.code, show_name: item.show_name}
      })
      const keys = Object.keys(this.customerDetail)
      this.showData = []
      newMeta.forEach(item => {
        if (keys.indexOf(item.code) !== -1) {
          return this.showData.push({key: item.show_name, value: this.customerDetail[item.code]})
        }
      })
    }
  },
  computed: {
    ...mapState(['customerDetail', 'metaData'])
  }
}
</script>

<style lang="less">
  @import '../assets/css/variable.less';
  .customer-detail{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &-list{
      li{
        height: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: @gufen-small-btn-size;
        margin: 0 1.25rem;
        span{
          &.key{
            color: #666;
          }
        }
        &.title{
          padding-left: 1.25rem;
          margin: 0;
          font-weight: bold;
          color: @gufen-warning-color;
          span{
            padding-left: 0.4rem;
            border-left: 0.15rem solid @gufen-warning-color;
          }
        }
      }
    }
  }
</style>
