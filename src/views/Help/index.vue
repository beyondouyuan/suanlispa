<template>
    <div class="help-container">
        <BgBanner :title="'帮助中心'"></BgBanner>
        <section class="view-wrapper">
            <div class="bar-wrapper">
                <aside class="aside">
                    <ul>
                        <router-link class="arrow" :class="[$route.path.includes(item.name.toLocaleLowerCase()) ? 'active' : 'default', activeIndex == index ? 'open' : '']" v-for="(item, index) of asideList" :key="index" tag="li" :to="{name: item.name}">{{item.title}}</router-link>
                    </ul>
                </aside>
            </div>
            <div class="main-content">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>
<script>
const asideList = [{
    name: 'QA',
    title: '常见问题'
}, {
    name: 'Service',
    title: '联系客服'
}, {
    name: 'About',
    title: '关于我们'
}]
const menuCLass = {
    wrapper: 'bar-wrapper',
    aside: 'aside',
    menu: '',
    item: ''
}
import Sidebar from '@/components/Sidebar'
import BgBanner from '@/components/BgBanner'
export default {
    name: 'Help',
    components: {
        Sidebar,
        BgBanner
    },
    metaInfo() {
        return {
            title: '帮助中心-算力多云算力投资平台', // set a title
            meta: [
                {                 // set meta
                    name: 'keywords',
                    content: this.pageKeyWord
                },
                {                 // set meta
                    name: 'description',
                    content: this.pageDesc
                }
            ]
        }
    },
    data() {
        return {
            pageTitle: '收益计算器-算力多云算力投资平台',
            pageKeyWord: '云算力,算力,矿机,云算力租赁,云算力出租,云算力租用,算力租赁,算力出租,算力租用,矿机托管,矿机出租,矿机租赁,矿机租用',
            pageDesc: '算力多是目前全球领先的比特币挖矿、莱特币云挖矿算力投资平台之一。致力于提供算力租赁,云算力出租,云算力租用,算力租赁,算力出租,算力租用,矿机托管,矿机出租,矿机租赁,矿机租用等服务的云算力投资平台。',
            msg: '资产',
            asideList,
            activeIndex: 0
        }
    },
    created() {

    },
    methods: {

    }
}
</script>
<style lang="scss">
@import '../../assets/style/help.scss';
</style>
