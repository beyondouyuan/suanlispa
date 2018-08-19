<template>
    <div class="out-container">
        <div class="user-container" v-if="!userAgent">
            <Sidebar :defaultActive="defaultActive"></Sidebar>
            <section class="view-main_wrapper">
                <router-view></router-view>
            </section>
        </div>
        <div class="user-container" v-else>
            <SubMenu :SubMenu="subMenu"></SubMenu>
            <section class="view-main_wrapper">
                <!-- <keep-alive> -->
                    <router-view></router-view>
                <!-- </keep-alive> -->
            </section>
        </div>
    </div>
</template>
<script>
import { isMobile } from '@/utils/tool'
const userAgent = isMobile()
import Sidebar from '@/components/Sidebar'
import SubMenu from '@/components/SubMenu'
const subMenu = [{
    title: '个人信息',
    name: 'Profile'
}, {
    title: '安全设置',
    name: 'Setting'
}, {
    title: '推荐奖励',
    name: 'Award'
}]
export default {
    name: 'Contract',
    components: {
        Sidebar,
        SubMenu
    },
    data() {
        return {
            subMenu,
            userAgent,
            defaultActive: 0
        }
    },
    methods: {
        handleOpenPagesView() {
            this.openView = true
        },
        handleClosePagesView() {
            this.openView = false
        }
    }
}
</script>
<style lang="scss">
@import '../../assets/style/user.scss';
</style>
