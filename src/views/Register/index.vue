<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="top">
        <router-link class="login-link" to="/login">已有账号，立即登录&gt;&gt;</router-link></div>
      <div class="login-main">
        <div class="register-left">
          <router-link class="login-link" :to="{name:'Home'}"><img src="/static/image/register/left.png" alt=""></router-link>
        </div>
        <div class="login-item login-box">
          <ul class="login-list">
            <li class="title-label">
              <h2>注册</h2>
            </li>
            <li class="input-box">
              <!-- <div class="select-box">
                <Select :options="selectedList"></Select>
              </div> -->
              <div class="mobile-box">
                <input type="text" v-model="regParams.cellphone" name="mobile" placeholder="手机号码">
              </div>
            </li>
            <div class="input-item">
                <input type="text" v-model="regParams.verify_code" name="code" placeholder="请输入验证码">
                <button type="button" :disabled="!smsCode" class="auth-link auth-btn link-a" @click="handleGetAuth">{{authText}}</button>
            </div>
            <li class="input-box"><input type="text" v-model="regParams.username" name="username" placeholder="用户名,包含数字和字母，6-20个字符"></li>
            <li class="input-box"><input type="password" v-model="regParams.password" name="password" placeholder="密码,包含数字和字母，6-20个字符"></li>
            <li class="input-box"><input type="password" v-model="confirmPassword" name="password" placeholder="请再次输入密码"></li>
          </ul>
          <button v-waves class="btn" @click="handleRegSubmit">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Select from '@/components/Common/Select'
import waves from "@/directive/waves"
import { 
  requestReg,
  requestApplyCellphone
 } from '@/api'
const selectedList = [{
    key: 1,
    text: '移动'
}, {
    key: 2,
    text: '联通'
}, {
    key: 3,
    text: '电信'
}, {
    key: 4,
    text: '铁通'
}]
export default {
    name: 'Register',
    directives: {
      waves
    },
    components: {
        Select
    },
    data() {
        return {
            msg: 'Register',
            regParams: {
             cellphone: '',
             verify_code: '',
             username: '',
             password: '',
             invite_code: ''
            },
            confirmPassword: '',
            authText: '获取验证码',
            smsCode: true
        }
    },
    created() {
      if(this.$route.query.refer) {
        this.regParams.invite_code = this.$route.query.refer
      }
    },
    methods: {
      showAlert(msg, cb) {
            this.$Alert({
                ...msg,
                onShow: () => {
                    console.log('on alert show')
                },
                onHide: () => {
                    console.log('on alert hide')
                    cb && cb()
                }
            })
        },
      showToast(msg, cb) {
            this.$Toast({
                ...msg,
                onShow: () => {
                    console.log('on toast show')
                },
                onHide: () => {
                    console.log('on toast hide')
                    cb && cb()
                }
            })
      },
      handleCountDown(timer) {
            const oldText = '获取校验码'
            if (timer > 0) {
                this.authText = `${timer}妙后重新获取`
                this.smsCode = false
                timer--
                this.authTimer = setTimeout(() => {
                    this.handleCountDown(timer)
                }, 1000)
            } else {
                this.smsCode = true
                this.authText = oldText
            }
        },
      handleGetAuth() {
            this.handleCountDown(60)
            this.smsCode = false
            requestApplyCellphone({
              cellphone: this.regParams.cellphone
            }).then(res => {
                if (!res.errmsg) {
                    this.handleCountDown(60)
                } else {
                    this.showToast({
                        title: '信息提示',
                        content: res.errmsg,
                        type: 'warning'
                    })
                    this.smsCode = true
                }
            })
        },
      handleRegSubmit() {
        if(this.regParams.username=='' || this.password=='') {
            this.showAlert({
                title: '提示',
                content: '用户名或密码不能为空'
            })
            return
        }
        if(this.regParams.username.length < 6) {
            this.showAlert({
                title: '提示',
                content: '用户名不得少于6个字符'
            })
            return
        }
        if(this.regParams.password.length < 6) {
            this.showAlert({
                title: '提示',
                content: '密码不得少于6个字符'
            })
            return
        }
        if(this.regParams.username.length > 20 || this.regParams.password.length > 20) {
            this.showAlert({
                title: '提示',
                content: '用户名或者密码不得超过20个字符'
            })
            return
        }
        if(this.regParams.password !== this.confirmPassword) {
          this.showAlert({
                    title: '提示',
                    content: '两次输入的密码不一致',
                    // type: 'warning'
                })
          return
        }
        const condition = {
          ...this.regParams
        }
        requestReg(condition).then(res => {
            console.log(res)
          if (!res.errcode) {
              this.showToast({
                      title: '成功',
                      content: '恭喜注册成功！',
                      type: 'success'
                      }, () => {
                          this.$router.push({
                              name: 'Login'
                          })
                      })
          } else {
              this.showToast({
                      title: '注册失败:',
                      content: res.errmsg,
                      type: 'error'
                      })
          }
        }).catch(e => {
            this.showToast({
                  title: '请求出错',
                  content: '服务器请求失败，请重试',
                  type: 'error'
            })
        })
      }
    }
}
</script>
<style lang="scss">
@import '../../assets/style/login.scss';
</style>
