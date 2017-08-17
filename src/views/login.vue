<template>
  <div class="login">
    <div class="login-form">
      <div class="user-wrap">
        <i></i>
        <input type="text" class="user" placeholder="请输入用户名" v-model.trim="username">
      </div>
      <div class="password-wrap">
        <i></i>
        <input type="password" class="password" placeholder="请输入密码" v-model.trim="password">
      </div>
    </div>
    <a href="javascript:;" class="login-btn" @click="login" >登录</a>
  </div>
</template>

<script>
import { getQueryString } from '../assets/js/base.js'
// http://localhost:8080/index.html?activity_id=59546453c5f45c0001dfde8c#/login
// yyg
// 12305
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (!this.username) {
        this.$vux.toast.show({
          type: 'warn',
          text: '请输入用户名'
        })
        return
      }
      if (!this.password) {
        this.$vux.toast.show({
          type: 'warn',
          text: '请输入密码'
        })
        return
      }
      const params = {
        activity_id: getQueryString('activity_id'),
        password: this.password,
        username: this.username,
        times: 720
      }
      /**
       * flag
       *  60003 用户名或密码错误
       *  0 登录成功
       */
      // this.$store.dispatch('changeLoadingStatus', true)
      this.axios.post(this.api.loginUrl, params).then(res => {
        // this.$store.dispatch('changeLoadingStatus', false)
        console.log(res)
        if (res.data.flag === 60003) {
          this.$vux.toast.show({
            type: 'cancel',
            text: res.data.desc
          })
        } else if (res.data.flag === 0) {
          this.$vux.toast.show({
            type: 'success',
            time: 500,
            text: res.data.desc
          })
          // 存token
          sessionStorage.token = res.data.data
          this.$router.push('/customer')
        }
      }).catch(err => {
        console.log(err)
        this.$vux.toast.show({
          type: 'warn',
          text: '服务器异常'
        })
      })
    }
  }
}
</script>

<style lang="less">
  @import '../assets/css/variable.less';
  .login{
    padding: 2.75rem 0.7rem 0;
    &-form{
      border: 1px solid #ccc;
      border-radius: @gufen-border-radius;
      overflow: hidden;
      input {
        display: block;
        height: 100%;
        width: 100%;
        flex: 1;
        padding-left: 1.0rem;
      }
      div{
        display: flex;
        align-items: center;
        height: 2.5rem;
        padding-left: 0.75rem;
      }
      .user-wrap{
        border-bottom: 1px solid #ccc;
        i{
          display: block;
          width: 1.05rem;
          height: 1.075rem;
          background: url('../assets/img/user.png') no-repeat left top/ 100% 100%;
        }
      }
      .password-wrap{
        i{
          display: block;
          width: 1.05rem;
          height: 1.075rem;
          background: url('../assets/img/password.png') no-repeat left top/ 100% 100%;
        }
      }
    }
    &-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5rem;
      margin-top: 0.5rem;
      font-size: @gufen-btn-size;
      border-radius: @gufen-border-radius;
      background: @gufen-warning-color;
      
    }
  }
</style>
