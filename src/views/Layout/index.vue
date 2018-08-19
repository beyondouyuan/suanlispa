<template>
    <div class="layout-container" @click.capture="handleCloseDropMenu">
        <section class="header-container">
            <Header :menus="menus"></Header>
        </section>
        <section class="conetnt-container">
            <!-- <transition name="fade"> -->
                <router-view></router-view>
            <!-- </transition> -->
        </section>
        <section class="footer-container">
            <Footer></Footer>
        </section>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            menus: []
            // isCollapse: true
        }
    },
    created() {
        // console.log(this.$router.options.routes)
        this.menus = this.$router.options.routes
    },
    computed: {
    },
    methods: {
        ...mapActions([
            'handleCloseDrop'
        ]),
        handleCloseDropMenu() {
          this.handleCloseDrop(false)
        }
    },
    mounted() {
    },
    components: {
        Header,
        Footer
    }
}
</script>
