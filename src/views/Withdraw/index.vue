<template>
    <section class="prop-container">
        <div class="title-label">
            <h2>BTC提币</h2>
        </div>
        <div class="withdraw-box">
            <div class="input-item">
                <input type="text" name="address" placeholder="BTC提币地址" v-model="withDrawParams.address" />
            </div>
            <div class="input-item">
                <input type="text" name="amount" placeholder="提币数量" v-model="withDrawParams.amount" />
            </div>
            <!-- <div class="input-item">
                <input type="text" name="pwd" placeholder="交易密码" v-model="withDrawParams.pwd" />
            </div> -->
            <div class="input-item">
                <input type="text" name="code" placeholder="请输入验证码" v-model="withDrawParams.verify_code">
                <button type="button" :disabled="!smsCode" class="auth-link auth-btn link-a" @click="handleGetAuth">{{authText}}</button>
            </div>
        </div>
        <div class="btn-box">
            <button class="btn" v-waves @click="handleWithdraw">提交</button>
        </div>
    </section>
</template>
<script>
import Select from '@/components/Common/Select'
import waves from "@/directive/waves"
import {requestBTCWithdraw, requestApplyCellphone} from "@/api"
const selectedList = [{
    key: 1,
    text: '北京'
}, {
    key: 2,
    text: '上海'
}, {
    key: 3,
    text: '广州'
}, {
    key: 4,
    text: '深圳'
}]
export default {
    name: 'WithDraw',
    directives: {
        waves
    },
    components: {
        Select
    },
    data() {
        return {
            selectedList,
            withDrawParams: {
                address: '',
                amount: 0,
                symbol: 'BTC',
                verify_code: ''
            },
            authText: '获取验证码',
            smsCode: true
        }
    },
    methods: {
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
        handleGetAuth() {
            this.handleCountDown(60)
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
        handleWithdraw() {
            console.log(this.withDrawParams)
            requestBTCWithdraw(this.withDrawParams).then(res => {
                if (!res.errmsg) {
                    this.showToast({
                            title: '成功',
                            content: 'BTC提币成功',
                            type: 'success'
                            }, () => {
                                this.$router.push({
                                    name: 'PropertyPreview'
                                })
                            })
                } else {
                    this.showToast({
                            title: '提币失败:',
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
    @import '../../assets/style/withdraw.scss';
</style>
