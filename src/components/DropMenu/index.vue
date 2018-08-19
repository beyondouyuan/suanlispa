<template>
    <section class="auth-router">
        <ul class="drop-menu">
            <li v-for="(item, index) of menus" :key="index">
                <router-link :to="{name: item.name}">{{item.title}}</router-link>
            </li>
            <li>
                <span @click="handleLogout">注销登录</span>
                <!-- <span>登出</span> -->
            </li>
        </ul>
    </section>
</template>
<script>
import { requestLogout } from '@/api'
import { mapActions } from 'vuex'
import {
    getStorage,
    removeStorage
} from '@/utils/tool'
export default {
    name: 'AuthRouter',
    data() {
        return {
            menus: [{
                name: 'Profile',
                title: '个人信息',
            }, {
                name: 'Setting',
                title: '安全设置',
            }, {
                name: 'Award',
                title: '推荐奖励',
            }, {
                name: 'Income',
                title: '收益查看',
            }, {
                name: 'Preview',
                title: '资产总览',
            }, {
                name: 'PM',
                title: '站内信息',
            }]
        }
    },
    methods: {
        ...mapActions([
            'LoginoutAction'
        ]),
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
        handleHistoryToHome() {
            this.$router.push({ path: '/' })
        },
        handleHistoryToLogin() {
            this.$router.push({ path: '/login' })
        },
        handleLogout() {
            requestLogout().then(res => {
                if (res.errcode == 0) {
                     this.LoginoutAction()
                     this.showToast({
                        title: '信息提示',
                        content: res.errmsg,
                        type: 'success'
                    }, this.handleHistoryToHome)
                } else if (res.errcode == 1) {
                    this.LoginoutAction()
                    this.showToast({
                        title: '信息提示',
                        content: res.errmsg,
                        type: 'warning'
                    }, this.handleHistoryToLogin)
                }
            })

        }
    }
}
</script>
