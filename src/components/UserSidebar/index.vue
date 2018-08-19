<template>
    <div class="usercenter-container">
        <section class="user-box">
            <div class="user-info">
                <span class="avatar"></span>
                <span class="nickname">{{user.username}}</span>
            </div>
        </section>
        <section class="usercenter-wrapper">
        <div class="usercenter-bar">
            <ul class="usercenter">
                <li
                    class="usercenter-item"
                    v-for="(item, index) of userCenter"
                    :key="index"
                >
                    <div class="menu-header arrow">
                      <router-link :to="{name: item.name}">{{item.title}}</router-link>
                    </div>
                </li>
                <li class="usercenter-item logout-item">
                    <div class="menu-header arrow">
                      <a href="javascript:;" @click="handleLogout">注销登录</a>
                    </div>
                </li>
            </ul>
        </div>
    </section>
    </div>
</template>
<script>
import {
    getStorage,
    getSessionStorage
} from '@/utils/tool'
const userCenter = [{
    title: '个人中心',
    name: 'User',
}, {
    title: '资产管理',
    name: 'Property',
}, {
    title: '消息中心',
    name: 'Message',
}]
export default {
    name: 'UserSidebar',
    data() {
        return {
            userCenter
        }
    },
    computed: {
        user() {
            return getSessionStorage('userInfo');
        }
    },
    methods: {
        handleLogout() {

        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/usercenter.scss';
</style>
