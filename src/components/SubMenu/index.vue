<template>
    <div class="submenu-container">
        <section class="submenu-wrapper">
            <ul class="submenu">
                <li class="submenu-item" :class="[$route.path.includes(item.name.toLocaleLowerCase()) ? 'active' : 'default']" v-for="(item, index) of SubMenu" :key="index">
                    <div class="menu-header arrow">
                        <router-link :to="{name: item.name}">{{item.title}}</router-link>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
export default {
    name: 'SubMenu',
    props: {
        SubMenu: {
            type: Array
        }
    },
    computed: {

    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/submenu.scss';
</style>
