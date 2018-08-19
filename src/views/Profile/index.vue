<template>
  <section class="personal-container">
    <confirm width="500px" title="信息" :visible.sync="confirmDialog" :close-dialog="true">
      <template slot="content">
        <h1>谁的青春不迷茫</h1>
        <span>你好</span>
      </template>
      <div class="self-footer" slot="footer">
        <a href="javascript:;" v-waves class="self-btn make-sure" @click="handleConfirm">确定</a>
        <a href="javascript:;" class="self-btn cancel" @click="confirmDialog = false">取消</a>
      </div>
    </confirm>
    <div class="title-flag">
      <h2>个人信息</h2>
    </div>
    <div class="content-box">
      <div class="content-item">
        <label>姓名：</label>
        <!-- <input type="text" name="username" v-model="userInfo.realname"> -->
        <span>{{userInfo.realname}}</span>
        <span class="icon" v-if="userInfo.realname">
            <img src="/static/image/icon/complete-icon.png">
        </span>
        <span class="u-txt link-a" v-if="!userInfo.realname" @click="handleModifyRealName">去实名认证&gt;&gt;</span>
      </div>
      <div class="content-item">
        <label>邮箱：</label>
        <span>{{userInfo.email}}</span>
        <span class="u-txt link-a" v-if="!userInfo.email" @click="handleActiveEmail">去绑定&gt;&gt;</span>
        <!-- <input type="text" name="email" readonly :value="userInfo.email"> -->
      </div>
      <div class="content-item">
        <label>手机号码：</label>
        <!-- <input type="text" name="cellphone" readonly :value="userInfo.cellphone"> -->
        <span>{{userInfo.cellphone}}</span>
      </div>
      <!-- <div class="content-item">
        <label>验证码：</label>
        <input type="text" name="auth">
        <div class="auth-btn">
          <button v-waves type="button" class="btn">获取验证码</button>
        </div>
      </div> -->
    </div>
    <!-- <div class="btn-box">
      <button v-waves type="button" class="btn">提交</button>
    </div> -->
    <!--激活邮箱-->
    <Dialog :visible.sync="activeEmail" type="confirm" title="绑定邮箱" v-on:cancel="handleActiveEmailCancel()" @confirm="handleActiveEmailConfirm()" @close="handleActiveEmailClose()">
          <template slot="content">
                <verify-email :Modify="emailParams" :smsCode="smsCode" :authText="authText" @auth="applyEmailCode"></verify-email>
          </template>
    </Dialog>
    <!-- 实名认证 -->
        <Dialog :visible.sync="realNameDialog" type="confirm" title="实名认证" v-on:cancel="handleRealNameCancel()" @confirm="handleRealNameConfirm()" @close="handleRealNameClose()">
            <template slot="content">
                <real-name :Modify="RealNameParams"></real-name>
            </template>
        </Dialog>
  </section>
</template>
<script>
  import RealName from '@/components/ModifyForm/RealName'
  import VerifyEmail from '@/components/ModifyForm/VerifyEmail'
  import waves from "@/directive/waves"
  import { requestUserInfo, requestVerifyRealName,requestVerifyEmail, requestModifyEmail } from '@/api'
  export default {
    name: 'Profile',
    components: {
      RealName,
      VerifyEmail
    },
    directives: {
      waves
    },
    data() {
      return {
        smsCode: true,
        confirmDialog: false,
        realNameDialog: false,
        activeEmail: false,
        emailParams: {
          email: '',
          email_code: ''
        },
        RealNameParams: {
          realname: '',
          idcard: ''
        },
        userInfo: {

        },
        authText: '获取验证码'
      }
    },
    created() {
        this.fetchData()
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
      handleConfirm() {
        setTimeout(() => {
          this.confirmDialog = false
        }, 1000)
        console.log('hi')
      },
      // 修改交易密码操作
        handleModifyRealName() {
            this.realNameDialog = true
        },
        handleRealNameCancel() {
            this.RealNameParams = {
                realname: '',
                idcard: ''
            }
        },
        handleActiveEmail(){
          this.activeEmail = true
        },
        handleRealNameClose() {
            this.RealNameParams = {
                realname: '',
                idcard: ''
            }
        },
        handleRealNameConfirm() {
            console.dir(this.RealNameParams)
            this.realNameDialog = false
            const conditional = {
              ...this.RealNameParams
            }
            requestVerifyRealName(conditional).then(res => {
              console.log(res)
              if (!res.errcode) {
                this.$router.go(0)
              }
              if (res.errcode == 101) {
                this.showToast({
                    title: '信息提示',
                    content: '请输入合法的身份证号码',
                    type: 'error'
                })
              }
              if (res.errcode == 106) {
                this.showToast({
                    title: '信息提示',
                    content: res.errmsg,
                    type: 'error'
                })
              }
            })
        },
      async fetchData() {
        const data = await requestUserInfo()
        this.userInfo = {
          ...data
        }
      }
    }
  }
</script>
