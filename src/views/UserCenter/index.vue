<template>
    <div class="out-container">
        <div v-if="userAgent">
            <UserSidebar></UserSidebar>
            <section class="view-main_wrapper">
                <router-view>
                    <p>移动端user</p>
                </router-view>
            </section>
        </div>
    </div>
</template>
<script>
import { isMobile } from '@/utils/tool'
const userAgent = isMobile()
import Sidebar from '@/components/Sidebar'
import UserSidebar from '@/components/UserSidebar'
export default {
    name: 'Contract',
    components: {
        Sidebar,
        UserSidebar
    },
    data() {
        return {
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
