<template>
    <section class="award-container">
        <div class="title-label">
            <h2>推荐奖励</h2>
        </div>
        <div class="tips-box">
            <p class="pre-tips">推荐朋友来算力多注册并购买算力，您将获得被推荐用户算力收益的20%作为奖励。<br>您的专属推荐链接:{{refer}}
                <span
                    class="copy-link"
                    v-clipboard:copy="refer"
                    v-clipboard:success="handleCopy"
                >复制链接</span>
            </p>
        </div>
        <div class="qrcode">
            <!-- <img src="" /> -->
            <div class="qr-code" ref="qrcode" id="qrcode"></div>
            <span>扫码二维码分享</span>
        </div>
        <section class="recomd-box">
            <div class="title-label">
                <h2>推荐列表</h2>
            </div>
            <div class="table-box">
                <!-- <Table :columns="resultcolumns" :dataSourece="resultData"></Table> -->
                <table-box :items="list_of_user">
                    <template>
                        <tr slot="cols">
                            <th>账户</th>
                            <!-- <th>1天算力平均力</th> -->
                            <th>奖励比例</th>
                            <th>加入时间</th>
                        </tr>
                    </template>
                    <template slot="item" slot-scope="props">
                            <tr>
                                <td>
                                    {{ props.item.username }}
                                </td>
                                <!-- <td>
                                    {{ props.item.average_power }}
                                </td> -->
                                <td>
                                    {{ props.item.percent * 100 }}%
                                </td>
                                <td>
                                    {{ props.item.date_joined | parseTime}}
                                </td>
                            </tr>
                    </template>
                </table-box>
            </div>
            <div v-if="list_num_pages > 1" class="pagination-container">
                <pagination
                    :page-index="list_currentPage"
                    :total="list_count"
                    :page-size="pageSize"
                    @change="listPageChange">
                </pagination>
            </div>
        </section>
        <section class="record-box">
            <div class="title-label">
                <h2>奖励记录</h2>
            </div>
            <div class="table-box">
                <!-- <Table :columns="resultcolumns" :dataSourece="resultData"></Table> -->
                <table-box :items="list_of_income">
                    <template>
                        <tr slot="cols">
                            <th>奖励</th>
                            <th>算力类型</th>
                            <th>算力</th>
                            <th>奖励时间</th>
                        </tr>
                    </template>
                    <template slot="item" slot-scope="props">
                            <tr>
                                <td>
                                    {{ props.item.reward }}
                                </td>
                                <td>
                                    {{ props.item.power_type }}
                                </td>
                                <td>
                                    {{ props.item.power }}TH/s
                                </td>
                                <td>
                                    {{ props.item.datetime | parseTime}}
                                </td>
                            </tr>
                    </template>
                </table-box>
            </div>
            <div v-if="income_num_pages > 1" class="pagination-container">
                <pagination
                    :page-index="income_currentPage"
                    :total="income_count"
                    :page-size="pageSize"
                    @change="incomePageChange">
                </pagination>
            </div>
        </section>
        <section class="award-rule">
            <div class="title-label">
                <h2>推荐规则</h2>
            </div>
            <div class="rule-list" v-html="rule"></div>
            <!-- <ul class="rule-list">
                <li>1.规则1</li>
                <li>2.规则2</li>
                <li>3.规则3</li>
                <li>4.规则4</li>
            </ul> -->
        </section>
    </section>
</template>
<script>
import QRCode from 'qrcodejs2'
import {
    requestAwardIncome,
    requestAwardRule,
    requestAwardList,
    requestAwardCode
} from "@/api"
const resultcolumns = [{
    key: 'type',
    title: '产出'
}, {
    key: 'price',
    title: '产出'
}, {
    key: 'amount',
    title: '管理费'
}, {
    key: 'amount1',
    title: '管理费'
}, {
    key: 'benefit',
    title: '收益'
}]
const resultData = [{
    type: '买',
    price: '12',
    amount: 100,
    amount1: 200,
    benefit: 300
}, {
    type: '买',
    price: '13',
    amount: 140,
    amount1: 200,
    benefit: 300
}, {
    type: '买',
    price: '55',
    amount: 333,
    amount1: 200,
    benefit: 300
}]
// http://localhost:8080/register
export default {
    name: 'Award',
    data() {
        return {
            resultcolumns,
            resultData,
            list_of_income: [],
            list_of_user: [],
            rule: '',
            code: '',
            pageSize: 15 , //每页显示15条数据
            list_currentPage: 1, //当前页码
            income_currentPage: 1,
            list_count: 0, //总记录数
            income_count: 0,
            num_pages: 0,
            list_num_pages: 1,
            income_num_pages: 1
        }
    },
    created() {
        console.log(location.host)
        this.fetchData()
    },
    mounted() {
        // this.createQrcode(this.code)
    },
    computed: {
        refer() {
            const host = location.host
            return `http://${host}/register/?refer=${this.code}`
        }
    },
    methods: {
        handleCopy(e) {
            this.showToast({
                title: '信息提示',
                content: '复制成功',
                type: 'success'
              })
        },
        listPageChange (page) {
            console.log(page)
            this.list_currentPage = page
        },
        incomePageChange(page) {
            this.income_currentPage = page
        },
        createQrcode(text) {
              let qrcode = new QRCode(this.$refs.qrcode, {
                width: 140,
                height: 140, // 高度
                text: text, // 二维码内容
                render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
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
        async applyList(page=1) {
            const list = await requestAwardList()
            this.list_num_pages = list.list_num_pages
            this.list_count = list.list_num_pages * 15
            this.list_of_user = list.list_of_user
        },
        async applyIncome(page=1) {
            const income = await requestAwardIncome()
            this.income_num_pages = income.income_num_pages
            this.income_count = income.income_num_pages * 15
            this.list_of_income = income.list_of_income
        },
        async fetchData() {
            this.applyList()
            this.applyIncome()
            try {
              const code = await requestAwardCode()
              const rule = await requestAwardRule()
              Promise.all([code,rule])
              .then(res => {
                const { code } = res[0]
                const { desc } = res[1]
                this.code = code                
                this.rule = desc
                this.createQrcode(code)
              })
            } catch(e) {
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
@import '../../assets/style/award.scss';
</style>
