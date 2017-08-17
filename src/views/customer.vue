<template>
  <div class="customer">
    <!-- /客户列表 -->
    <section class="customer-content" :class="{'translate-right': navStatus}">
      <div class="search-box">
        <input type="text" placeholder="请输入公司名称" v-model.trim="company">
        <a href="javascript:;" @click="goSearch">查询</a>
      </div>
      <div class="customer-scroll">
      <scroller class="scroller" height="100vh - 5rem" lock-x use-pullup @on-pullup-loading="loadMoreData" v-model="demovalue" ref="scroller"> 
        <div> 
          <ul class="customer-list">
            <li class="customer-list-item" v-for="(item, index) in customerListData" :key="index">
              <a href="javascript:;" class="customer-list-item-title" @click="goDetail(item)">
                <span>公司：{{item.company}}</span>
              </a>
              <div class="customer-info vux-1px-t">
                <div class="customer-info-left">
                  <p>
                    <span class="key">客户姓名</span>：
                    <span class="value">{{item.name || '暂无'}}</span>
                  </p>
                  <p>
                    <span class="key">职务</span>：
                    <span class="value">{{item.position || '暂无'}}</span>
                  </p>
                  <p>
                    <span class="key">联络人</span>：
                    <span class="value">{{item.contact_name}}</span>
                  </p>
                </div>
                <div class="customer-info-right">
                   <p>
                      <span class="key">住宿酒店</span>：
                      <span class="value">{{item.field595ca9fd50e25c000108cc0e || '暂无'}}</span>
                    </p>
                    <p>
                      <span class="key">住宿方式</span>：
                      <span class="value">{{item.field59638170f91fdd00017e5528 || '暂无'}}</span>
                    </p>
                    <p>
                      <span class="key">房间号</span>：
                      <span class="value">{{item.room || '暂无'}}</span>
                    </p>
                </div>
              </div>
              <div class="customer-oprator">
                <div class="part">
                  <a href="javascript:;" class="ensure" @click="ensurePart(item)" v-if="!item.check">确认参会</a>
                  <a href="javascript:;" class="cancel" @click="cancelPart(item)" v-else>取消参会</a>
                </div>
                <a href="javascript:;" class="sign" @click="goSign(item)">签到</a>
              </div>
            </li>
          </ul>
        </div>
         <!--pullup slot-->
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <span v-show="demovalue.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
          <load-more :show-loading="false" tip="没有更多数据了，别扯了" background-color="#fbf9fe"  v-show="demovalue.pullupStatus === 'disabled'" ></load-more>
        </div>
      </scroller>
      </div>
      <div class="customer-content-mask" v-show="navStatus"></div>
    </section>
    <!-- /筛选列表 -->
    <section class="customer-filter" @click.stop.prevent="spaceClick">
      <ul class="filter-list">
        <li class="filter-list-item">
          <h2 class="filter-list-item-title">参会状态</h2>
          <div class="chose-wrap">
            <checker
              v-model="attendanceStatus"
              default-item-class="default-btn"
              selected-item-class="selected-btn"
            >
              <checker-item v-for="(item, index) in ['所有', '已审核', '未审核']" 
              @on-item-click="onItemPartClick"
              @click.prevent.stop.native
              :key="index" 
              :value="item">{{item}}</checker-item>
            </checker>
          </div>
        </li>
        <li class="filter-list-item">
          <h2 class="filter-list-item-title">客户类型</h2>
          <div class="chose-wrap">
            <checker
              v-model="customerType"
              default-item-class="default-btn"
              selected-item-class="selected-btn"
            >
              <checker-item v-for="(item, index) in ['所有', '新客户', '老客户']" 
              @on-item-click="onItemCustomerClick"
              @click.prevent.stop.native
              :key="index" 
              :value="item">{{item}}</checker-item>
            </checker>
          </div>
        </li>
      </ul>
      <div v-transfer-dom>
        <confirm v-model="showConfirm"
        show-input
        title="请输入客户入住房间号"
        :close-on-confirm="false"
        ref="confirm"
        @on-confirm="onConfirm">
        </confirm>
      </div>
    </section>
  </div>
</template>

<script>
import { getQueryString } from '../assets/js/base.js'
import { mapState } from 'vuex'
import { Checker, CheckerItem, Confirm, Scroller, Spinner, LoadMore, TransferDomDirective as TransferDom } from 'vux'
export default {
  data () {
    return {
      istranslate: false,
      showConfirm: false,
      pageNumber: 1,
      pageSize: 20,
      signId: '',
      signItem: {},
      isCheck: false,
      activity_id: getQueryString('activity_id'),
      company: '',
      attendanceStatus: '所有',
      customerType: '所有',
      attendanceStatus2: '所有',
      customerType2: '所有',
      demovalue: {
        pullupStatus: ''
      },
      customerListData: [],
      assignData: {
        pageNumber: 1,
        pageSize: 20,
        activity_id: getQueryString('activity_id')
      }
    }
  },
  activated () {
    this.$refs.scroller.reset()
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData (params) {
      if (!params) {
        params = {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          activity_id: this.activity_id,
          searchLike: [
            {name: 'company', value: ''}
          ],
          searchIs: null
        }
      }
      this.axios.post(`${this.api.prticipantpageUrl}/${this.activity_id}`, params).then(res => {
        const page = res.data.data.page
        this.$store.dispatch('fetchMetaData', res.data.data.metadatas)
        // this.$store.dispatch('changeTitle', `客户列表(${page.totalElements})`)
        // 只有在分页的时候 需要concat 其他都得清空 如 搜索，筛选
        this.customerListData = this.customerListData.concat(page.content || [])
        // 如果 当前页面返回的数量小于pageSize 设为disabled
        if (page.numberOfElements < this.pageSize) {
          this.demovalue.pullupStatus = 'disabled'
        } else {
          this.demovalue.pullupStatus = 'default'
        }
        // 如果展示内容只是简单的增加或者减少，直接调用reset方法即可
        this.$nextTick(() => {
          this.$refs.scroller.reset()
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击查询按钮
    goSearch () {
      if (!this.company) {
        this.$vux.toast.show({
          type: 'warn',
          text: '请输入公司名称'
        })
        return
      }
      this.filterOper()
    },
    loadMoreData () {
      this.pageNumber++
      let params = {}
      params = Object.assign({}, this.assignData, {searchIs: this.checkSearchIs(),
        searchLike: [
          {name: 'company', value: this.company}
        ],
        pageNumber: this.pageNumber
      })
      this.fetchData(params)
    },
    spaceClick () {
      this.$store.dispatch('changeNavStatus', false)
    },
    // 参会状态
    onItemPartClick (val) {
      this.attendanceStatus2 = val
      this.filterOper()
    },
    // 客户类型
    onItemCustomerClick (val) {
      this.customerType2 = val
      this.filterOper()
    },
    // 查看客户信息
    goDetail (item) {
      this.$store.dispatch('fetchCustomerDetail', item)
      this.$router.push('/customerDetail')
    },
    // 确认参会
    ensurePart (item) {
      this.audit(true, item)
    },
    // 取消参会
    cancelPart (item) {
      this.audit(false, item)
    },
    audit (type, item) {
      const params = {
        datas: {check: type},
        ids: [item.id]
      }
      this.axios.post(`${this.api.audit}/${this.activity_id}`, params)
      .then(res => {
        if (res.data.flag === 0) {
          this.$vux.toast.show({
            type: 'success',
            text: type ? '确认参会成功' : '取消参会成功'
          })
          item.check = type // 改变当前项的状态
        } else if (res.data.flag === 60013) {
          this.$vux.toast.show({
            type: 'cancel',
            text: res.data.desc
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 点击签到按钮，需要过度传 item
    goSign (item) {
      this.showConfirm = true
      // this.$refs.confirm.setInputValue(item.room)
      this.signId = item.id
      this.isCheck = item.check
      this.signItem = item
    },
    // 点击 confirm 确认按钮
    onConfirm (msg) {
      if (!msg) {
        this.$vux.toast.show({
          type: 'warn',
          text: '请输入房间号'
        })
        this.showConfirm = true
        return
      } else {
        console.log(msg)
        const params = {
          id: this.signId,
          sign_in: this.isCheck,
          room: msg
        }
        this.axios.post(this.api.updateprticipant, params)
        .then(res => {
          this.signItem.room = msg
          this.$vux.toast.show({
            type: 'success',
            text: '修改成功'
          })
        })
        .catch(err => {
          console.log(err)
        })
        this.showConfirm = false
      }
    },
    // 参会状态和客户类型 返回的searchIs
    checkSearchIs () {
      let searchIs = null // 都等于所有searchIs：null, 只要该项等于所有，该项map不传，
      if (this.attendanceStatus2 === '所有' && this.customerType2 === '所有') {
        searchIs = null
      } else if (this.attendanceStatus2 !== '所有' && this.customerType2 !== '所有') {
        searchIs = [
          {name: 'check', value: this.attendanceStatus2},
          {name: 'formfile.field5963813ff91fdd00017e5526', value: this.customerType2}
        ]
      } else if (this.attendanceStatus2 === '所有' && this.customerType2 !== '所有') {
        searchIs = [
          {name: 'formfile.field5963813ff91fdd00017e5526', value: this.customerType2}
        ]
      } else if (this.attendanceStatus2 !== '所有' && this.customerType2 === '所有') {
        searchIs = [
          {name: 'check', value: this.attendanceStatus2}
        ]
      }
      return searchIs
    },
    // 筛选操作
    filterOper () {
      let params = {}
      params = Object.assign({}, this.assignData, {searchIs: this.checkSearchIs(),
        searchLike: [
          {name: 'company', value: this.company}
        ]
      })
      this.pageNumber = 1
      this.customerListData = []
      this.fetchData(params)
      // 如果展示内容完全重载，那么需要主动设置位置让其能正确回到顶部。适用于改变筛选条件后重载数据的情况
      this.$nextTick(() => {
        this.$refs.scroller.reset({
          top: 0
        })
        this.$refs.scroller.enablePullup()
      })
      this.$store.dispatch('changeNavStatus', false)
    }
  },
  computed: {
    ...mapState(['navStatus'])
  },
  directives: {
    TransferDom
  },
  components: {
    Scroller,
    Spinner,
    Checker,
    CheckerItem,
    Confirm,
    LoadMore
  }
}
</script>

<style lang="less">
  @import '../assets/css/variable.less';
  .weui-dialog__ft{
    .weui-dialog__btn{
      line-height: 48px !important;
    }
  }
  .weui-toast{
    z-index: 6000;
  }
  .customer{
    @diff: 2.0rem;
    position: relative;
    height: calc(~"100vh - @{diff}");
    &-content{
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      padding: 0.75rem;
      background: #f5f5f5;
      transition: .4s all ease;
      &.translate-right{
        transform: translate3d(-12.75rem, 0, 0);
      }
      &-mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0);
      }
      .search-box{
        position: relative;
        display: flex;
        height: @gufen-btn-height;
        &:before{
          position: absolute;
          top: 50%;
          left: 0.5rem;
          transform: translate(0, -50%);
          display: block;
          content: "";
          width: 0.65rem;
          height: 0.65rem;
          background: url('../assets/img/search.png') no-repeat left top/100% 100%;
        }
        input{
          display: block;
          flex: 1;
          border: 1px solid #ccc;
          padding-left: 1.75rem;
          border-radius: @gufen-border-radius;
          background: #fff;
        }
        a{
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 3.5rem;
          margin-left: 0.35rem;
          background: @gufen-primary-color;
          border-radius: @gufen-border-radius;
          font-size: @gufen-small-btn-size;
        }
      }
      .customer-scroll{
        @diff: 5rem;
        height: calc(~"100vh - @{diff}");
        /* flex: 1;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;  */
        .scroller{
          height: 100%;
        }
        
      }
      .customer-list{
        &-item{
          background: #fff;
          padding: 0 0.5rem;
          border-radius: @gufen-border-radius;
          margin-top: 0.25rem;
          box-shadow: 0 5px 10px  #ccc;
          &-title{
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.7rem;
            //border-bottom: 1px solid #ccc;
            font-size: @gufen-small-btn-size;
            font-weight: bold;
            color: #000;

            &:after{
              display: block;
              content: "";
              width: 0.25rem;
              height: 0.25rem;
              border-top: 2px solid #000;
              border-right: 2px solid #000;
              transform: rotate(45deg);
            }
            span{
              padding-left: 0.3rem;
              border-left: 0.15rem solid @gufen-warning-color;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .no-data{
          height: 20rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @gufen-font-size;
          color: @gufen-warning-color;
        }
      }
    }
    &-info{
      display: flex;
      padding: 0.5rem;
      >div{
        flex: 1;
        width: 50%;
        padding: 0 0.5rem;
        font-size: @gufen-font-size;
        &:first-child{
          position: relative;
          &:after{
            position: absolute;
            top: 0;
            right: 0;
            display: block;
            content: "";
            width: 0;
            height: 100%;
            border-left: 1px dashed #ccc;
          }
        }
        p{
          height: 1rem;
          display: flex;
          //align-items: center;
          .key{
            color: #666;
            width: 2.5rem;
            text-align:justify;
            text-justify:distribute-all-lines;/*ie6-8*/
            text-align-last:justify;/* ie9*/
            -moz-text-align-last:justify;/*ff*/
            -webkit-text-align-last:justify;/*chrome 20+*/
          }
           @media screen and (-webkit-min-device-pixel-ratio:0){/* chrome */
            .key:after{
              content:" ";
              display: inline-block;
              width:100%;
              overflow:hidden;
              height:0;
            }
          }  
          .value{
            flex:1;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    &-oprator{
      display: flex;
      justify-content: flex-end;
      padding-bottom: 0.75rem;
      a{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4.45rem;
        height: @gufen-btn-height;
        border-radius: @gufen-border-radius;
        font-size: @gufen-small-btn-size;
        &.ensure{
          background: @gufen-warning-color;
        }
        &.cancel{
          background: @gufen-default-color;
        }
        &.sign{
          background: @gufen-primary-color;
          margin-left: 0.25rem;
        }
      }
    }
    &-filter{
      position: absolute;
      z-index: 1;
      width: 12.75rem;
      height: 100%;
      top: 0;
      right: 0;
     
    }
    .filter{
      &-list{
        &-item{
          padding: 0 0.35rem;
          &-title{
            position: relative;
            display: inline-block;
            line-height: 1.5rem;
            margin-left: 0.35rem;
            font-size: @gufen-btn-size;
            border-bottom: 1px solid #ccc;
            &:before{
              position: absolute;
              top: 100%;
              left: 0;
              display: block;
              content: "";
              width: 0;
              height: 0;
              border: 0.25rem solid transparent;
              border-top-color: #ccc;
            }
          }
          .chose-wrap{
            
            border-bottom: 1px dashed #ccc;
          }
        }
      }
    }
    .vux-checker-box{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding-top: .5rem;
    }
    .vux-checker-item{
      width: 3.3rem;
      height: 1.35rem;
      text-align: center;
      line-height: 1.35rem;
      margin: 0 0.35rem .5rem;
      color: #fff;
      background: @gufen-default-color;
      font-size: @gufen-small-btn-size;
      border-radius: @gufen-border-radius;
      &.efault-btn{}
      &.selected-btn{
        background: @gufen-warning-color;
      }
    }
    
  }
</style>

