<template>
    <section :class="menuClass.wrapper">
        <aside :class="menuClass.aside">
            <ul :class="menuClass.menu">
                <li :class="[menuClass.item, $route.path.includes(item.name.toLocaleLowerCase()) ? 'active' : 'default', activeIndex == index ? 'open' : '']" v-for="(item, index) of asideList" :key="index" @click="toggleSideard(index)">
                    <span class="menu-header arrow">{{item.title}}</span>
                    <ul class="drop-down" v-if="item.children && item.children.length > '0'">
                        <router-link v-for="(child, index) of item.children" :key="index" tag="li" :to="{name: child.name}">{{child.title}}</router-link>
                    </ul>
                </li>
            </ul>
        </aside>
    </section>
</template>
<script>
const asideList = [{
    title: '个人中心',
    name: 'User',
    children: [{
        title: '个人信息',
        name: 'Profile'
    }, {
        title: '安全设置',
        name: 'Setting'
    }, {
        title: '推荐奖励',
        name: 'Award'
    }]
}, {
    title: '资产管理',
    name: 'Property',
    children: [{
            title: '订单记录',
            name: 'Orders'
        },
        {
            title: '收益查看',
            name: 'Income'
        }, {
            title: '资产总览',
            name: 'Preview'
        }
    ]
}, {
    title: '消息中心',
    name: 'Message',
    children: [{
        title: '站内消息',
        name: 'PM'
    }]
}]
const menuClass = {
    wrapper: 'asidebar-wrapper',
    aside: 'aside-bar',
    menu: 'menu',
    item: 'menu-item',
}
export default {
    name: 'Sidebar',
    data() {
        return {
            asideList,
            menuClass,
            activeIndex: this.defaultActive
        }
    },
    props: {
        defaultActive: {
            type: Number,
            default: 0
        }
    },
    watch: { // 监听路由 手动触发侧边栏
        '$route' (to, from) {
            console.log(to)
            this.asideList.forEach((item, index) => {
                if (item.children) {
                    item.children.forEach((child, i) => {
                        if (to.name == child.name) {
                            console.log(index)
                            this.activeIndex = index
                        } else {
                        }
                    })
                } else {
                    // console.log(item)
                    if (to.name == item.name) {
                        this.activeIndex = index
                    }
                }
            })
        }
    },
    beforeRouteEnter (to, from, next) {
        console.log('in')
        // next()
    },
    methods: {
        toggleSideard(index) {
            this.activeIndex = index
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/sidebar.scss';
</style>
