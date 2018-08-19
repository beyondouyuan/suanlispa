<template>
    <section class="setting-container">
        <div class="title-flag">
            <h2>安全设置</h2>
        </div>
        <div class="content-box">
            <div class="action-box">
                <div class="pass-level-box">
                    <span class="t-tip">密码等级</span>
                    <div class="pass-level">
                        <span class="t-tip">{{transSecurityLevel(userInfo.security).text}}</span>
                        <div class="level-box">
                            <div class="level-line" :class="'level-line-'+transSecurityLevel(userInfo.security).level"></div>
                        </div>
                    </div>
                    <span class="link-txt link-a" @click="handleModifyLoginPass">修改</span>
                    <!-- <span>密码，提升等级</span> -->
                </div>
            </div>
            <ul class="setting-list">
                <li>
                    <div class="icon">
                        <img src="/static/image/icon/complete-icon.png">
                    </div>
                    <div class="set-txt">
                        <span>手机绑定</span>
                        <span>提现，修改密码，及安全设置时用以收取验证短信</span>
                    </div>
                    <div class="set-action">
                        <span class="link-txt link-a" @click="handleModifyCellPhone()">修改</span>
                    </div>
                </li>
                <li>
                    <div class="icon">
                        <img src="/static/image/icon/complete-icon.png">
                    </div>
                    <div class="set-txt">
                        <span>邮箱绑定</span>
                        <span>邮箱用于登陆、提币及安全设置时使用，激活后不可修改</span>
                    </div>
                    <div class="set-action">
                        <span v-if="userInfo.email" class="link-txt">{{userInfo.email}}</span>
                        <span v-else class="link-txt link-a" @click="handleActiveEmail()">绑定邮箱</span>
                    </div>
                </li>
                <!-- <li>
                    <div class="icon">
                        <img src="/static/image/icon/complete-icon.png">
                    </div>
                    <div class="set-txt">
                        <span>交易密码</span>
                        <span>提现、修改密码，及安全设置时用以收取短信验证码</span>
                    </div>
                    <div class="set-action">
                        <span class="link-txt link-a" @click="handleModifyTradePass()">修改</span>
                    </div>
                </li> -->
            </ul>
        </div>
        <!--激活邮箱-->
        <Dialog :visible.sync="activeEmail" type="confirm" title="绑定邮箱" v-on:cancel="handleActiveEmailCancel()" @confirm="handleActiveEmailConfirm()" @close="handleActiveEmailClose()">
            <template slot="content">
                    <verify-email :Modify="emailParams" :smsCode="smsCode" :authText="authText" @auth="applyEmailCode"></verify-email>
            </template>
        </Dialog>
        <!-- 修改登录密码 -->
        <Dialog :visible.sync="loginPassDialog" type="confirm" title="修改登录密码" height="400px" v-on:cancel="handleLoginPassCancel()" @confirm="handleLoginPassConfirm()" @close="handleLoginPassClose()">
            <template slot="content">
                <login-pass :Modify="LoginPassParams" :Cptch="cptch" @refresh="handleRefreshCptch"></login-pass>
            </template>
        </Dialog>
        <!-- 修改手机 -->
        <Dialog :visible.sync="cellPhoneDialog" type="confirm" title="修改手机" v-on:cancel="handleCellPhoneCancel()" @confirm="handleCellPhoneConfirm()" @close="handleCellPhoneClose()">
            <template slot="content">
                <cell-phone :Modify="CellPhoneParams" :smsCode="smsCode" :authText="authText" @auth="handleRequestAuthCode"></cell-phone>
            </template>
        </Dialog>
        <!-- 修改交易密码 -->
        <Dialog :visible.sync="tradePassDialog" type="confirm" title="修改交易密码" v-on:cancel="handleTradePassCancel()" @confirm="handleTradePassConfirm()" @close="handleTradePassClose()">
            <template slot="content">
                <trade-pass :Modify="TradePassParams" :smsCode="smsCode" :authText="authText" @auth="handleRequestAuthCode"></trade-pass>
            </template>
        </Dialog>
    </section>
</template>
<script>
import LoginPass from '@/components/ModifyForm/LoginPass'
import CellPhone from '@/components/ModifyForm/CellPhone'
import TradePass from '@/components/ModifyForm/TradePass'
import VerifyEmail from '@/components/ModifyForm/VerifyEmail'
import {
    requestSecurity,
    requestModifyCellphone,
    requestApplyCptch,
    requestApplyCellphone,
    requestModifyTradePwd,
    requestModifyLoginPwd,
    requestVerifyEmail, 
    requestModifyEmail
} from '@/api'
export default {
    name: 'Setting',
    components: {
        LoginPass,
        CellPhone,
        TradePass,
        VerifyEmail
    },
    data() {
        return {
            authTimer: null,
            smsCode: true,
            authText: '获取校验码',
            cptch: {

            },
            emailParams: {
                email: '',
                email_code: ''
            },
            activeEmail: false,
            loginPassDialog: false,
            cellPhoneDialog: false,
            tradePassDialog: false,
            LoginPassParams: {
                new_password: '',
                old_password: '',
                confirm_password: '',
                cptch_code: ''
            },
            CellPhoneParams: {
                cellphone: '',
                verify_code: ''
            },
            TradePassParams: {
                trade_pwd: '',
                confirm_password: '',
                verify_code: ''
            },
            userInfo: {

            }
        }
    },
    created() {
        this.fetchData()
        this.fetchtApplyCptch()
    },
    methods: {
        handleConfirmPwd(pwd, cpwd) {
            return (pwd == cpwd ? true : false)
        },
        handleClearCountDown() {
            if (this.authTimer) {
                clearTimeout(this.authTimer)
                this.smsCode = true
                this.authText = '获取校验码'
            }
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
        transSecurityLevel(security) {
            switch (security) {
                case 0:
                    return {
                        text: '低级',
                        level: 0
                    }
                case 1:
                    return {
                        text: '中级',
                        level: 1
                    }
                case 2:
                    return {
                        text: '高级',
                        level: 2
                    }
                default:
                    return {
                        text: '低级',
                        level: 0
                    }
            }
        },
        //绑定邮箱
        handleActiveEmailCancel() {
          this.emailParams = {
          email: '',
          email_code: ''
        }
      },
      handleActiveEmailClose() {
        this.emailParams = {
          email: '',
          email_code: ''
        }
      },
      handleActiveEmail(){
          this.activeEmail = true
        },
      applyEmailCode() {
        console.log('发送验证码')
        requestVerifyEmail({
          email: this.emailParams.email
        }).then(res => {
          console.log(res)
          if(!res.errcode) {
            this.handleCountDown(60)
          } else {
            this.showToast({
                    title: '信息提示',
                    content: res.errmsg,
                    type: 'error'
                })
          }
        })
      },
      handleActiveEmailConfirm(){
        requestModifyEmail({
          email: this.emailParams.email,
          verify_code: this.emailParams.email_code
        }).then(res => {
          console.log(res)
            if(!res.errcode) {
              this.$router.go(0)
            } else {
              this.showToast({
                      title: '信息提示',
                      content: res.errmsg,
                      type: 'error'
                  })
            }
        })
      },
        // 修改登陆密码操作
        handleModifyLoginPass() {
            this.loginPassDialog = true
        },
        handleLoginPassCancel() {
            this.LoginPassParams = {
                old_password: '',
                new_password: '',
                confirm_password: '',
                cptch_code: ''
            }
        },
        handleLoginPassClose() {
            this.LoginPassParams = {
                old_password: '',
                new_password: '',
                confirm_password: '',
                cptch_code: ''
            }
        },
        handleLoginPassConfirm() {
            const {
                new_password,
                confirm_password,
                old_password,
                cptch_code
            } = this.LoginPassParams
            const confirm = this.handleConfirmPwd(new_password, confirm_password)
            if (!confirm) {
                this.showToast({
                    title: '信息提示',
                    content: '两次密码不一致',
                    type: 'warning'
                })
                return;
            } else {
                const conditional = {
                    new_password,
                    old_password,
                    cptch_code,
                    cptch_key: this.cptch.cptch_key
                }
                this.loginPassDialog = false
                // 提交修改
                requestModifyLoginPwd(conditional).then(res => {
                    console.log(res)
                    if (!res.errmsg) {
                        this.showToast({
                            title: '操作成功',
                            content: res.errmsg,
                            type: 'success'
                        })
                        // 刷新路由 以便更新数据
                        setTimeout(() => {
                            // location.reload()
                            this.$router.go(0)
                        }, 1000)
                    } else {
                        this.showToast({
                            title: '操作失败',
                            content: res.errmsg,
                            type: 'error'
                        })
                    }

                })
            }
            // this.loginPassDialog = false
        },
        // 修改手机操作
        handleModifyCellPhone() {
            this.cellPhoneDialog = true
        },
        handleCellPhoneCancel() {
            this.CellPhoneParams = {
                cellphone: this.userInfo.cellphone
            }
            // 清除验证码定时器
            this.handleClearCountDown()
        },
        handleCellPhoneClose() {
            this.CellPhoneParams = {
                cellphone: this.userInfo.cellphone
            }
            // 清除验证码定时器
            this.handleClearCountDown()
        },
        handleCellPhoneConfirm() {
            const conditional = {
                ...this.CellPhoneParams
            }
            this.cellPhoneDialog = false
            requestModifyCellphone(conditional).then(res => {
                console.log(res)
                if (!res.errmsg) {
                    this.showToast({
                        title: '操作成功',
                        content: res.errmsg,
                        type: 'success'
                    })
                } else {
                    this.showToast({
                        title: '操作失败',
                        content: res.errmsg,
                        type: 'error'
                    })
                }
                // this.showToast({
                //     title: '信息提示',
                //     content: res.errmsg,
                //     type: 'warning'
                // }, () => {
                //     this.cellPhoneDialog = false
                // })
            })

        },
        // 修改交易密码操作
        handleModifyTradePass() {
            this.tradePassDialog = true
        },
        handleTradePassCancel() {
            this.TradePassParams = {
                trade_pwd: ''
            }
            // 清除验证码定时器
            this.handleClearCountDown()
        },
        handleTradePassClose() {
            this.TradePassParams = {
                trade_pwd: ''
            }
            // 清除验证码定时器
            this.handleClearCountDown()
        },
        handleTradePassConfirm() {
            const {
                trade_pwd,
                confirm_password,
                verify_code
            } = this.TradePassParams
            const confirm = this.handleConfirmPwd(trade_pwd, confirm_password)
            if (!confirm) {
                this.showToast({
                    title: '信息提示',
                    content: '两次密码不一致',
                    type: 'warning'
                })
                return;
            } else {
                const conditional = {
                    trade_pwd,
                    verify_code
                }
                this.tradePassDialog = false
                requestModifyTradePwd(conditional).then(res => {
                    if (!res.errmsg) {
                        this.showToast({
                            title: '操作成功',
                            content: res.errmsg,
                            type: 'success'
                        })
                    } else {
                        this.showToast({
                            title: '操作失败',
                            content: res.errmsg,
                            type: 'error'
                        })
                    }
                })
            }
        },

        handleRequestAuthCode() {
            this.fetchtApplyCellphone()
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
        },
        async fetchtApplyCellphone() {
            this.smsCode = false
            requestApplyCellphone().then(res => {
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

        async fetchData() {
            const data = await requestSecurity()
            this.userInfo = {
                ...data
            }
            this.CellPhoneParams.cellphone = data.cellphone
            this.LoginPassParams.cellphone = data.cellphone
            this.LoginPassParams.email = data.email
        }
    }
}
</script>
