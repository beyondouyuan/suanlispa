<template>
    <div class="container">
        <!-- Carousel -->
        <Carousel :carousels="banner" :interval="inv" :style="styleObject" :name="transitionName1" :target="target"></Carousel>
        <div class="notify-container">
            <div class="content">
                <div class="notify-tips">
                    <img :src="notifyIcon" alt="">
                    <span class="news-t">{{ news }}</span>
                </div>
                <div class="scroll-wrap">
                    <transition name="custom-classes-transition" enter-active-class="animated bounceIn" leave-active-class="animated bounceOutRight">
                        <ul class="scroll-content" :style="{ top }">
                            <li v-for="item in list_of_announce">{{item.title}}</li>
                        </ul>
                    </transition>
                </div>
                <router-link :to="{name: 'Announce'}" class="more">更多公告>></router-link>
            </div>
        </div>
        <section class="service-container">
            <service-item v-for="(item, index) of list_of_currency_info" :Service="item" :key="index"></service-item>
        </section>
        <Platform :title="'平台优势'" :tips="'以用户为中心，竭诚为您服务'" :platform="platform"></Platform>
        <Mine :title="'矿场一览'" :subTitle="'矿场一览'" :mine="list_of_mine"></Mine>
        <section class="partner-container">
        <div class="title-box">
            <h2>这是我们的<strong class="partner-s">合作伙伴</strong></h2>
            <p>合作伙伴</p>
        </div>
        <vue-seamless-scroll :data="list_of_partner" :class-option="classOption" class="warp">
            <ul class="ul-item clearfix">
                <li class="li-item" v-for="item in list_of_partner">
                    <img :src="item.url" />
                    <p v-if="item.name">{{item.name}}</p>
                </li>
            </ul>
        </vue-seamless-scroll>
        </section>
        <!-- <Partner :title="'这是我们的合作伙伴'" :partner="list_of_partner"></Partner> -->

    </div>
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import Carousel from '@/components/Carousel/carousel.vue'
import ServiceItem from '@/components/ServiceItem'
import Platform from '@/components/Platform'
import Mine from '@/components/Mine'
import Slide from '@/components/Common/Slide/slide.vue'
import Partner from '@/components/Partner'
import { isMobile } from '@/utils/tool'
import {
    requestBanner,
    requestPlatform,
    requestMine,
    requestPartner,
    requestDC,
    requestDCExchange,
    requestDCIncome,
    requestAnnounce,
    requestWebSetting
} from "@/api"
const platform = [{
    logo: '/static/image/icon/security-icon.png',
    title: '稳定安全',
    tips: '多重签名技术'
}, {
    logo: '/static/image/icon/public-icon.png',
    title: '公开透明',
    tips: '平台费用公开透明'
}, {
    logo: '/static/image/icon/specification-icon.png',
    title: '规范管理',
    tips: '从矿机选购到产生效益'
}, {
    logo: '/static/image/icon/operation-icon.png',
    title: '操作便捷',
    tips: '简单高效快捷'
}, {
    logo: '/static/image/icon/service-icon.png',
    title: '贴心服务',
    tips: '专业客服一对一'
}]
const listData = [{
    'title': '1',
    'date': '2017-12-16'
}, {
    'title': '2',
    'date': '2017-12-16'
}, {
    'title': '3',
    'date': '2017-12-16'
}, {
    'title': '4',
    'date': '2017-12-16'
}, {
    'title': '5',
    'date': '2017-12-16'
}]
const userAgent = isMobile()
const errcode = '0'
export default {
    name: 'Home',
    metaInfo() {
        return {
            title: this.pageTitle, // set a title
            meta: [{ // set meta
                    name: 'keywords',
                    content: this.pageKeyWord
                },
                { // set meta
                    name: 'description',
                    content: this.pageDesc
                }
            ]
        }
    },
    components: {
        Carousel,
        ServiceItem,
        Platform,
        Mine,
        Partner,
        Slide,
        vueSeamlessScroll
    },
    data() {
        return {
            listData,
            inv: 3000,
            styleObject: {
                width: '100%',
                height: '460px'
            },
            transitionName1: 'move',
            target: '_blank',
            pageTitle: '矿机托管_云算力交易|出租|租赁|租用-算力多云算力投资平台',
            pageKeyWord: '云算力,算力,矿机,云算力租赁,云算力出租,云算力租用,算力租赁,算力出租,算力租用,矿机托管,矿机出租,矿机租赁,矿机租用',
            pageDesc: '算力多是目前全球领先的比特币挖矿、莱特币云挖矿算力投资平台之一。致力于提供算力租赁,云算力出租,云算力租用,算力租赁,算力出租,算力租用,矿机托管,矿机出租,矿机租赁,矿机租用等服务的云算力投资平台。',
            // loading: true,
            notifyIcon: '../static/image/icon/announcement-icon.png',
            news: '最新公告',
            platform,
            banner: [],
            list_of_currency_info: [],
            list_of_announce: [],
            list_of_mine: [],
            list_of_partner: [],
            list_of_currency: [],
            activeIndex: 0,
        }
    },
    created() {
        this.fetchData()
        // requestWebSetting().then(res => {
        //     this.pageTitle = res.title
        //     this.pageKeyWord = res.keywords
        //     this.pageDesc = res.desc
        // })
    },
    computed: {
        top() {
            return -this.activeIndex * 50 + 'px';
        },
        classOption: function() {
            return {
                limitMoveNum: 6,
                direction: 2,
                // autoPlay: false
            }
        }
    },
    mounted() {
        this.handleScroll()
    },
    methods: {
        showToast() {
            this.$Toast({
                title: '消息提示',
                content: '请求数据失败',
                type: 'warning',
                onShow: () => {
                    console.log('on toast show')
                },
                onHide: () => {
                    console.log('on toast hide')
                }
            })
        },
        handleScroll() {
            setInterval(() => {
                if (this.activeIndex < this.list_of_announce.length) {
                    this.activeIndex += 1;
                } else {
                    this.activeIndex = 0;
                }
            }, 2000);
        },
        async fetchData() {
            try {
                const banner = await requestBanner()
                const announce = await requestAnnounce()
                const mine = await requestMine()
                const partner = await requestPartner()
                const dc = await requestDC()
                const btc = await requestDCExchange({
                    "symbol": "BTC"
                })
                const ltc = await requestDCExchange({
                    "symbol": "LTC"
                })
                const btc_income = await requestDCIncome({
                    "symbol": "BTC"
                })
                const ltc_income = await requestDCIncome({
                    "symbol": "LTC"
                })
                Promise.all([banner, announce, mine, partner, dc, btc, ltc])
                    .then(res => {
                        const { list_of_banner: banner } = res[0]
                        const { list_of_announce } = res[1]
                        const { list_of_mine } = res[2]
                        const { list_of_partner } = res[3]
                        const { list_of_currency } = res[4]
                        const btc = res[5]
                        const ltc = res[6]
                        let list_of_currency_info = []
                        for (var i = 0; i < list_of_currency.length; i++) {
                            let info = {}
                            info.name = list_of_currency[i].name
                            info.url = list_of_currency[i].url
                            if (i == 0) {
                                info.price = this.toFixed(btc.exchange, 2)
                                info.income = this.toFixed(btc_income.btc_per_day_unit, 8)
                            } else {
                                console.log(ltc.exchange)
                                info.price = this.toFixed(ltc.exchange, 2)
                                info.income = this.toFixed(ltc_income.btc_per_day_unit, 8)
                            }
                            list_of_currency_info[i] = info
                        }
                        // console.log(list_of_currency_info)

                        this.banner = banner
                        this.list_of_announce = list_of_announce
                        this.list_of_mine = list_of_mine
                        this.list_of_partner = list_of_partner
                        // this.list_of_currency = list_of_currency
                        this.list_of_currency_info = list_of_currency_info
                        // this.loading = false
                    }).catch(e => {
                        // this.loading = false
                        this.showToast()
                    })
                // statements
            } catch (e) {
                this.loading = false
                this.showToast()
                // statements
                console.log(e);
            }

        },
        async fetchPlatform() {
            const platform = await requestPlatform()
            // console.log(platform)
        }
    }
}
</script>
<style lang="scss">
.warp {
    width: 85vw; // (5 * 15(width) + 2(margin-left))
    margin: 0 auto;
    height: 20vw;
    overflow: hidden; // background-color: #EEEEEE;
}

.ul-item {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 102vw; //(6 * 15(width) + 2(margin-left))
    &.ul-item2 {
        width: 0;
    }
    .li-item {
        float: left;
        width: 15vw;
        height: 15vw;
        margin-left: 2vw;
        margin-top: 2rem;
        // line-height: 15vw;
        background-color: lightgray;
        font-family: 'Amaranth', sans-serif;
        font-size: 16px;
        text-align: center;
        border: 1px solid #EEEEEE;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        >img {
            width: 100%;
            height: auto;
        }
        &:hover {
            p {
              color: #FFFFFF;
              background-color: rgba(0, 0, 0, .7);
              transform: scale(1.2)
            }
          }
        p {
            transition: all .5s ease-in-out;
            width: 100%;
            position: absolute;
            bottom: 0;
            z-index: 100;
            color: rgba(255, 255, 255, .8);
            padding: .5rem 0;
            background-color: rgba(0, 0, 0, .3);
        }
    }
}
</style>
