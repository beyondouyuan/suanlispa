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
import Sidebar from '@/components/Sidebar'
import SubMenu from '@/components/SubMenu'
const subMenu = [{
    title: '收益查看',
    name: 'Income'
}, {
    title: '订单记录',
    name: 'Orders'
}, {
    title: '资产总览',
    name: 'Preview'
}]
import { isMobile } from '@/utils/tool'
const userAgent = isMobile()
import waves from "@/directive/waves"
export default {
    name: 'Property',
    components: {
      Sidebar,
      SubMenu
    },
    directives: {
        waves
    },
    data() {
      return {
        subMenu,
        defaultActive: 1,
        userAgent
      }
    }
}
</script>
<style lang="scss">
@import '../../assets/style/user.scss';
@import '../../assets/style/property.scss';
</style>
