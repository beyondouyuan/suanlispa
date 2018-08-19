<template>
    <section class="orders-wrapper">
            <div class="title-label">
                <h2>订单列表</h2>
            </div>
            <div class="orders-box">
                <div class="tab-pannel">
                    <div class="table-box">
                        <div class="tab-pannel">
                                <span class="cursor" :class="[filter_time == 'all'? 'active' : '' ]" @click="handleFilter('all')">全部时间</span>
                                <span class="cursor" :class="[filter_time == 'seven'? 'active' : '' ]" @click="handleFilter('seven')">最近七天</span>
                                <span class="cursor" :class="[filter_time == 'month'? 'active' : '' ]" @click="handleFilter('month')">最近一月</span>
                                <span class="cursor">查询</span>
                        </div>
                        <table-box :items="list_of_records">
                            <template>
                                <tr slot="cols">
                                    <th>下单日期</th>
                                    <th>订单单价</th>
                                    <th>下单数量</th>
                                    <th>支付方式</th>
                                    <th>支付金额</th>
                                    <th>收益开始日期</th>
                                    <th>订单状态</th>
                                </tr>
                            </template>
                            <template slot="item" slot-scope="props">
                                    <tr>
                                        <td>
                                            {{ props.item.datetime | parseTime }}
                                        </td>
                                        <td>
                                            {{ props.item.price }}
                                        </td>
                                        <td>
                                            {{ props.item.amount}}
                                        </td>
                                        <td>
                                            {{ props.item.pay_type | coverPayType}}
                                        </td>
                                        <td>
                                            {{ props.item.pay_price}}
                                        </td>
                                        <td>
                                            {{ props.item.active_time | parseTime}}
                                        </td>
                                        <td v-if="props.item.order_status == '成功支付'" style="color:#4fb39e">
                                            {{ props.item.order_status}}
                                        </td>
                                        <td v-if="props.item.order_status == '未支付'" style="color:#E05453">
                                            {{ props.item.order_status}}
                                        </td>
                                        <td v-if="props.item.order_status == '订单取消'">
                                            {{ props.item.order_status}}
                                        </td>
                                    </tr>
                            </template>
                        </table-box>
                    </div>
                    <div v-if="num_pages > 1" class="pagination-container">
                        <pagination
                            :page-index="currentPage"
                            :total="count"
                            :page-size="pageSize"
                            @change="pageChange">
                        </pagination>
                    </div>
                </div>
            </div>
        </section>
</template>
<script>
import waves from "@/directive/waves"
import { requestOrders } from '@/api'

export default {
    name: 'Orders',
    directives: {
        waves
    },
    data() {
        return {
            list_of_records:[],
            pageSize: 15 , //每页显示15条数据
            num_pages: 1,
            currentPage: 1, //当前页码
            count: 15, //总记录数
            filter_time: 'all',
            start_time: '',
            end_time: ''
        }
    },
    filters:{
        coverPayType: function(value) {
            return value == 0?'BTC':'RMB'
        }
    },
    created() {
        this.fetchOrders()
    },
    methods: {
        async fetchOrders(page=1, start_time='', end_time='') {
            let record = null
            if(this.filter_time == 'all') {
                record = await requestOrders({
                    page: page 
                })
            } else {
                record = await requestOrders({
                    page: page,
                    start_time: start_time,
                    end_time: end_time
                })
            }
            this.list_of_records = record.list_of_records
            this.currentPage = record.current_page
            this.count = 15 * record.num_pages
            this.num_pages = record.num_pages
        },
        pageChange(page) {
            this.currentPage = page
            if(this.filter_time == 'all') {
                this.fetchOrders(page)
            } else {
                this.fetchOrders(page, this.start_time, this.end_time)
            }
        },
        handleFilter(filter_time) {
            console.log(filter_time)
            this.filter_time = filter_time
            let today = new Date()
            let end_time = this.formatDate(today.getTime())
            let start_time = this.filterTime(filter_time)
            this.start_time = start_time
            this.end_time = end_time
            this.fetchOrders(1, start_time, end_time)
        }
    }
}
</script>
<style lang="scss">
  @import '../../assets/style/orders.scss';
</style>