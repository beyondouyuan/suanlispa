<template>
    <header class="header">
        <div class="m-top-logo" v-if="userAgent">
            <img :src="logo" @click="toHome" alt="">
        </div>
        <nav class="navigation" :class="{'is-active':sidebar.opened}" @click.self="handleToggleSideBar">
            <div class="nav-box">
            <ul class="nav nav-flex nav-menu">
                <li v-if="!userAgent" class="top-logo"><img :src="logo" alt="" @click="toHome"></li>
                <!-- 对首页做路由匹配处理 -->
                <template v-for="(menu, index) of menus" v-if="!menu.hidden">
                    <template v-if="menu.children">
                        <li v-for="(child, item) of menu.children" v-if="!child.hidden">
                            <router-link v-if="child.name == 'Home'" :to="{name: child.name}" exact>{{child.title}}</router-link>
                            <router-link v-else :to="{name: child.name}">{{child.title}}</router-link>
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <!-- <router-link :to="menu.name">{{menu.title}}</router-link> -->
                            <router-link v-if="menu.name == 'Home'" :to="{name: menu.name}" exact>{{menu.title}}</router-link>
                            <router-link v-else :to="{name: menu.name}">{{menu.title}}</router-link>
                        </li>
                    </template>
                </template>
            </ul>
            <ul class="nav nav-flex nav-login">
                <template v-if="!user">
                    <li>
                        <router-link to="/login">登陆</router-link>
                    </li>
                    <li>
                        <router-link to="/register">注册</router-link>
                    </li>
                </template>
                <template v-else>
                    <template v-if="userAgent">
                        <li>
                            <!-- user路由中使用keep-alive缓存组件的方式暂时亦未能很好共用二级路由，则多加一个usercenter来代替user -->
                            <router-link to="/usercenter">个人中心</router-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="full-link arrow" :class="{'is-drop':drop}" @click="handleDropDown">
                            <span>{{user}}</span>
                        </li>
                        <drop-menu v-show="drop"></drop-menu>
                    </template>

                </template>
            </ul>
            </div>
        </nav>
        <div class="hunmber">
            <hamburger class="hamburger-container" :toggleClick="handleToggleSideBar" :isActive="sidebar.opened"></hamburger>
        </div>
    </header>
</template>
<script>
import Hamburger from '@/components/Hamburger'
import DropMenu from '@/components/DropMenu'
import { mapActions, mapGetters } from 'vuex'
import { isMobile } from '@/utils/tool'
import {
    getStorage,
    removeStorage
} from '@/utils/tool'
const userAgent = isMobile()
export default {
    name: 'Header',
    components: {
        Hamburger,
        DropMenu
    },
    data() {
        return {
            userAgent,
            logo: '../static/image/icon/top-logo.png',
            // drop: false
        }
    },
    props: {
        menus: {
            required: true
        }
    },
    computed: {
        user() {
            return this.account.username;
        },
        ...mapGetters([
            'account',
            'sidebar',
            'drop'
        ])
    },
    created() {
        console.log(this.account)
    },
    watch: {
      '$route' (to, from) {
        setTimeout(() => {
            // 收起侧边栏及下拉菜单
            this.handleCloseDrop(false)
            this.handleCloseSideBar(false)
        }, 300)
      }
    },
    methods: {
        ...mapActions([
            'toggleSideBar',
            'handleCloseSideBar',
            'toggleDrop',
            'handleCloseDrop'
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
        toHome() {
            this.$router.push({ path: '/' })
        },
        handleDropDown() {
            this.toggleDrop()
        },
        handleHistoryToLogin() {
            this.$router.push({ path: '/login' })
        },
        handleToggleSideBar() {
            this.toggleSideBar()
        }
    }
}
</script>
