<template>
    <div class="contract-container">
        <div class="title-label">
            <h2>期货预售</h2>
        </div>
        <div class="contract-content">
            <presell-item v-for="(item, index) of contract_list" :contractItem="item" :key="index" v-on:handleSubmit="handleCreateOrderSubmit" :exchange="exchange"></presell-item>
        </div>
        <Dialog :visible.sync="buyDialog" type="confirm" title="确认订单" v-on:cancel="handleBuyCancel()" @confirm="handleBuyConfirm()" @close="handleBuyCancel()">
            <template slot="content">
                <!-- <real-name :Modify="RealNameParams"></real-name> -->
                <div class="order-detail">
                    <p>
                        <label for="">合约单价：</label>
                        <span v-if="order_detail.pay_type == 1">￥{{order_detail.per_price}}</span>
                        <span v-if="order_detail.pay_type == 0">{{order_detail.per_price}}BTC</span>
                    </p>
                    <p>
                        <label for="">购买份数:</label><span>{{order_detail.amount}}</span>
                    </p>
                    <p>
                        <label for="">收益起算日:</label><span>{{order_detail.start_time | parseTime}}</span>
                    </p>
                </div>
            </template>
        </Dialog>
    </div>
</template>
<script>
import PresellItem from '@/components/PresellItem'
import { requestContractDetail, requestContractCreateOrder, requestWebSetting, requestDCExchange } from '@/api'
export default {
    name: 'Contract',
    metaInfo() {
        return {
            title: '合约预售-算力多云算力投资平台', // set a title
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
    components: {
        PresellItem
    },
    data() {
        return {
            pageTitle: '合约预售-算力多云算力投资平台',
            pageKeyWord: '云算力,算力,矿机,云算力租赁,云算力出租,云算力租用,算力租赁,算力出租,算力租用,矿机托管,矿机出租,矿机租赁,矿机租用',
            pageDesc: '算力多是目前全球领先的比特币挖矿、莱特币云挖矿算力投资平台之一。致力于提供算力租赁,云算力出租,云算力租用,算力租赁,算力出租,算力租用,矿机托管,矿机出租,矿机租赁,矿机租用等服务的云算力投资平台。',
            contract_list: [],
            buyDialog: false,
            order_detail: {},
            exchange: 0
        }
    },
    created() {
        this.fetchData()
        requestWebSetting().then(res => {
            this.pageTitle = res.title
            this.pageKeyWord = res.keywords
            this.pageDesc = res.desc
        })
    },
    methods: {
        async fetchData() {
            const { data } = await requestContractDetail()
            // console.log(data)
            requestDCExchange({
                symbol: "BTC"
            }).then(res => {
                const {exchange} = res
                this.exchange = exchange
                this.contract_list = data
            })
        },
        showToast(msg, cb) {
            this.$Toast({
                ...msg,
                onShow: () => {
                    console.log('on toast show')
                },
                onHide: () => {
                    console.log('on toast hide')
                    cb && cb()
                }
            })
        },
        showAlert(msg, cb) {
            this.$Alert({
                ...msg,
                onShow: () => {
                    console.log('on alert show')
                },
                onHide: () => {
                    console.log('on alert hide')
                    cb && cb()
                }
            })
        },
        handleBuyCancel(){
            console.log('取消订单')
        },
        handleSwiptchRouter(data) {
          setTimeout(() => {
            this.$router.push({
                name: 'Contract',
                params: data
            })
          }, 600)
        },
        handleRouteToOrderList(data){
            this.$router.push({
                name: 'Orders',
                params: data
            })
        },
        handleLTCSubmit(data) {
            console.log(data)
        },
        handleBuyConfirm(){
            let data = {}
            data.contract_id = this.order_detail.contract_id
            data.amount = this.order_detail.amount
            data.pay_type = this.order_detail.pay_type
            console.log(data)
            // 下单
            requestContractCreateOrder(data).then(res => {
                var order = {}
                if (!res.errmsg) {
                    this.buyDialog = false
                    order.id = res.order_id
                    // order.start_time = this.order_detail.start_time
                    order.detail = this.order_detail
                    this.showToast({
                      title: '下单成功',
                      content: '购买合约成功',
                      type: 'success'
                    }, () => {
                        if(this.order_detail.pay_type == 1) {
                            this.handleSwiptchRouter(order)
                        } else {
                            this.handleRouteToOrderList(order)
                        }
                    })
                } else if (res.errcode == 304) { // 未登陆 请登陆
                    this.showToast({
                      title: '温馨提示',
                      content: res.errmsg,
                      type: 'warning'
                    }, () => this.handleToLogin())
                } else if (res.errcode == 305) { // 余额不足 请充值
                    this.showToast({
                      title: '温馨提示',
                      content: res.errmsg,
                      type: 'warning'
                    }, () => this.handleToCharge())
                } else {
                  this.showToast({
                      title: '下单失败，请重试',
                      content: res.errmsg,
                      type: 'error'
                    }, () => {
                        this.buyDialog = false
                    })
                }
            }).catch(e => {
                this.showToast({
                      title: '请求出错',
                      content: '服务器请求失败，请重试',
                      type: 'error'
                }, () => {
                    this.buyDialog = false
                })
            })
        },
        handleToLogin() {
            setTimeout(() => {
                this.$router.push({
                    name: 'Login'
                })
            }, 800)

        },
        handleToCharge() {
            setTimeout(() => {
                this.$router.push({
                    name: 'PropertyPreview'
                })
            }, 800)
        },
        handleCreateOrderSubmit(data) {
            console.log(data)
            if(!data.checked) {
                this.showAlert({
                    title: '提示',
                    content: '请阅读并同意购买协议',
                    // type: 'warning'
                })
                return
            }
            if(data.amount < 1){
                this.showAlert({
                    title: '提示',
                    content: '请输入购买份数',
                    // type: 'warning'
                })
                return
            }
            this.buyDialog = true
            this.order_detail = data
        }
    }
}
</script>
<style lang="scss">
@import '../../assets/style/contract.scss';
</style>
