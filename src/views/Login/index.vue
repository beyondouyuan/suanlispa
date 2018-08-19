<template>
    <div class="login-container">
        <div class="login-wrapper">
            <div class="top">
                <router-link class="login-link" :to="{name: 'Register'}">还没有账号？立即注册&gt;&gt;</router-link>
            </div>
            <div class="login-main">
                <div class="left">
                    <router-link class="login-link" :to="{name:'Home'}"><img src="/static/image/register/left.png" alt=""></router-link>
                </div>
                <div class="login-item login-box">
                    <ul class="login-list">
                        <li class="title-label">
                            <h2>登陆</h2>
                        </li>
                        <li class="input-box">
                            <input type="text" v-model="loginParams.username" name="username" placeholder="账户名">
                        </li>
                        <li class="input-box">
                            <input type="password" v-model="loginParams.password" name="password" placeholder="密码">
                        </li>
                        <li class="input-box">
                            <div class="box-left">
                                <input type="text" v-model="loginParams.cptch_code" name="author" placeholder="验证码">
                            </div>
                            <div class="box-right" @click="handleRefreshCptch" title="点击刷新验证码">
                                <img :src="cptch.cptch_image">
                            </div>
                        </li>
                    </ul>
                    <div class="radio">
                        <input type="checkbox" name="checkbox" :checked="checked" @click="handleCheck" />
                        <span>记住我</span>
                    </div>
                    <div class="btn-box">
                        <button v-waves class="btn" @click="handleSubmit">登陆</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Select from '@/components/Common/Select'
import waves from "@/directive/waves"
import { requestLogin, requestApplyCptch } from '@/api'
import { setStorage, getStorage, removeStorage, setSessionStorage } from '@/utils/tool'
import { mapActions } from 'vuex'
const errcode = 0
const userName = getStorage('rememberName')
const userPass = getStorage('rememberPass')
export default {
    name: 'Login',
    directives: {
        waves
    },
    components: {
        Select
    },
    data() {
        return {
            checked: false,
            cptch: '',
            loginParams: {
                username: userName ? userName : '',
                password: userPass ? userPass : '',
                cptch_code: '',
                cptch_key: ''
            }
        }
    },
    created() {
        this.fetchtApplyCptch()
    },
    methods: {
        ...mapActions([
            'AccountAction'
        ]),
        handleCheck(){
            this.checked = !this.checked
        },
        rememberAccount() {
          if (this.checked) {
            setStorage('rememberName', this.loginParams.username)
            setStorage('rememberPass', this.loginParams.password)
          } else {
            removeStorage('rememberName')
            removeStorage('rememberPass')
          }
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
        handleHistoryBack() {
            this.$router.push({ path: '/' })
        },
        handleErrorLogin() {
            this.$router.push({ path: '/' })
        },
        handleRefreshCptch() {
            this.fetchtApplyCptch()
        },
        async fetchtApplyCptch() {
            const { cptch_image, cptch_key } = await requestApplyCptch()
            this.cptch = {
                cptch_image,
                cptch_key
            }
            this.loginParams.cptch_key = cptch_key
        },
        handleSubmit() {
            const condition = {
                ...this.loginParams,
            }
            const { username } = this.loginParams
            const userInfo = {
                username
            }

            requestLogin(condition).then(res => {
                if (res.errcode == errcode) {
                    setSessionStorage('userInfo', userInfo)
                    this.AccountAction(userInfo)
                    this.rememberAccount()
                    this.showToast({
                        title: '信息提示',
                        content: res.errmsg,
                        type: 'success'
                    }, this.handleHistoryBack)

                } else {
                    this.showToast({
                        title: '信息提示',
                        content: res.errmsg,
                        type: 'error'
                    })
                    this.fetchtApplyCptch()
                }
            })
        }
    }
}
</script>
<style lang="scss">
@import '../../assets/style/login.scss';
</style>
