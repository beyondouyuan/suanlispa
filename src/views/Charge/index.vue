<template>
    <section class="charge-container">
        <div class="title-label">
            <h2>BTC充值</h2>
            <span class="charge-tips">温馨提示：此地址仅接受BTC，任何非BTC的充值将不可找回</span>
        </div>
        <div class="charge-box box-shadow">
            <div class="charge-addres">
                <h3>充值地址</h3>
                <p class="pre-tips">
                    {{address}}
                    <span class="copy-link link-a" v-clipboard:copy="address" v-clipboard:success="handleCopy">复制链接</span>
                </p>
            </div>
            <div class="qrcode">
                <img :src="url">
                <div class="qr-code" ref="qrcode" id="qrcode"></div>
            </div>
        </div>
        <div class="explain">
            <h3>充值说明：</h3>
            <p>1.外部充值需要网络确认才能到账，具体时间根据您的手续费以及全网拥堵情况，1次确认入账，6次确认才可提现</p>
            <p>2.站内账户间转账无需网络确认，可以实时到账</p>
        </div>
    </section>
</template>
<script>
import QRCode from 'qrcodejs2'
import {
    requestBTCRecharge
} from "@/api"

export default {
    name: 'Award',
    data() {
        return {
            address: '',
            url: ''
        }
    },
    created() {
        this.fetchData()
    },
    mounted() {
        // this.createQrcode(this.code)
    },
    computed: {
    },
    methods: {
        handleCopy(e) {
            this.showAlert({
                title: '信息提示',
                content: '复制成功',
                type: 'success'
            })
        },
        createQrcode(text) {
            let qrcode = new QRCode(this.$refs.qrcode, {
                width: 140,
                height: 140, // 高度
                text: text, // 二维码内容
                render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
            })
        },
        showAlert(msg, cb) {
            this.$Alert({
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
        async fetchData() {
            try {
                const {address, url} = await requestBTCRecharge()
                this.address = address
                this.url = url
            } catch (e) {
                this.showToast({
                    title: '消息提示',
                    content: '请求数据失败',
                    type: 'error'
                })
                console.log(e);
            }


        }
    }
}
</script>
<style lang="scss">
@import '../../assets/style/charge.scss';
</style>
