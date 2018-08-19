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
    title: '站内信息',
    name: 'PM'
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
        defaultActive: 2,
        userAgent
      }
    }
}
</script>
<style lang="scss">
@import '../../assets/style/user.scss';
@import '../../assets/style/message.scss';
</style>
