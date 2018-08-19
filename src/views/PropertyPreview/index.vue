<template>
    <section class="prop-container">
        <div class="title-label">
            <h2>资产总览</h2>
        </div>
        <div class="prop-view">
            <section class="prop-list">
                <div class="prop-info">
                    <div class="prop-logo flex-box">
                        <img src="/static/image/icon/BTC.png">
                    </div>
                    <div class="prop-tatol flex-box">
                        <span>资产总值</span>
                        <span>{{btc}}</span>
                    </div>
                    <div class="prop-award flex-box">
                        <span>奖励总值</span>
                        <span>{{total}}</span>
                    </div>
                </div>
                <div class="prop-action flex-box">
                    <span v-waves class="a-btn success cursor" @click="handleToCharge">充值</span>
                    <span v-waves class="a-btn danger cursor" @click="handleToWthidraw">提币</span>
                </div>
            </section>
            <section class="serial-box">
                <div class="title-label">
                    <h2>流水账单</h2>
                </div>
                <div class="table-box">
                    <div class="data-picker">
                        <div class="pick-box" @click="handleStartPicker">
                            <img src="/static/image/calendar.png">
                            <span>{{pickedStartDate}}</span>
                        </div>
                        <div class="pick-box" @click="handleEndPicker">
                            <img src="/static/image/calendar.png">
                            <span>{{pickedEndDate}}</span>
                        </div>
                        <div class="search-box">
                            <span class="search-btn success cursor" @click="handleSearch">查询</span>
                        </div>
                        <date-picker v-if="showStartDatePicker" :date="date" :min-date="minDate" :max-date="maxDate" @confirm="handleStartPicked" @cancel="handleStartCancel"></date-picker>
                        <date-picker v-if="showEndDatePicker" :date="date" :min-date="minDate" :max-date="maxDate" @confirm="handleEndPicked" @cancel="handleEndCancel"></date-picker>
                    </div>
                    <div class="tab-pannel">
                        <span class="cursor" :class="[filter_time == 'all'? 'active' : '' ]" @click="handleFilter('all')">全部时间</span>
                        <span class="cursor" :class="[filter_time == 'seven'? 'active' : '' ]" @click="handleFilter('seven')">最近七天</span>
                        <span class="cursor" :class="[filter_time == 'month'? 'active' : '' ]" @click="handleFilter('month')">最近一月</span>
                        <span class="cursor" :class="[filter_time == 'week'? 'active' : '' ]" @click="handleFilter('week')">查询</span>
                    </div>
                    <table-box :items="list_of_record">
                        <template>
                            <tr slot="cols">
                                <th>时间</th>
                                <th>变动金额</th>
                                <th>余额</th>
                                <th>类型</th>
                            </tr>
                        </template>
                        <template slot="item" slot-scope="props">
                            <tr>
                                <td>
                                    {{ props.item.datetime | parseTime }}
                                </td>
                                <td>
                                    {{ props.item.differ }}
                                </td>
                                <td>
                                    {{ props.item.balance }}
                                </td>
                                <td>
                                    {{ props.item.type }}
                                </td>
                            </tr>
                        </template>
                    </table-box>
                </div>
                <div v-if="num_pages > 1" class="pagination-container">
                    <pagination :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange">
                    </pagination>
                </div>
            </section>
        </div>
    </section>
</template>
<script>
import DatePicker from '@/components/Common/DatePicker'

import waves from "@/directive/waves"
import { requestAssets, requestAssetsRecord, requestAward } from "@/api"

export default {
    name: 'PropertyView',
    directives: {
        waves
    },
    components: {
        DatePicker
    },
    data() {
        return {
            btc: 0,
            total: 0,
            pageSize: 15, //每页显示20条数据
            currentPage: 1, //当前页码
            count: 15, //总记录数
            list_of_record: [],
            num_pages: 1,
            filter_time: 'all',
            start_time: '',
            end_time: '',
            date: '2018-09-11',
            minDate: '2018-09-11',
            maxDate: '2118-09-11',
            showStartDatePicker: false,
            pickedStartDate: '点击选择开始日期',
            showEndDatePicker: false,
            pickedEndDate: '点击选择结束日期'
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
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
        handleStartPicker() {
            this.showStartDatePicker = true
        },
        handleStartPicked(value) {
            this.showStartDatePicker = false
            const { date } = value
            this.pickedStartDate = date
        },
        handleStartCancel() {
            this.showStartDatePicker = false
        },
        handleEndPicker() {
            this.showEndDatePicker = true
        },
        handleEndPicked(value) {

            const { date } = value
            const flag = this.compareDate(date,this.pickedStartDate)
            if (flag) {
                this.showEndDatePicker = false
                this.pickedEndDate = date;
            } else {
                this.showToast({
                    title: '提示',
                    content: '结束时间不能小于开始时间',
                    type: 'error'
                })
            }

        },
        handleEndCancel() {
            this.showEndDatePicker = false
        },
        handleToCharge() {
            setTimeout(() => {
                this.$router.push({
                    name: 'Charge'
                })
            }, 600)
        },
        compareDate(d1,d2){
            return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
        },
        handleToWthidraw() {
            setTimeout(() => {
                this.$router.push({
                    name: 'Withdraw'
                })
            }, 600)
        },
        pageChange(page) {
            this.currentPage = page
            if (this.filter_time == 'all') {
                this.fetchAssetsRecord(page)
            } else {
                this.fetchAssetsRecord(page, this.start_time, this.end_time)
            }

        },
        async fetchAssetsRecord(page = 1, start_time = '', end_time = '') {
            let record = null
            if (this.filter_time == 'all') {
                record = await requestAssetsRecord({
                    page: page
                })
            } else {
                record = await requestAssetsRecord({
                    page: page,
                    start_time: start_time,
                    end_time: end_time
                })
            }

            // console.log(list_of_record)
            this.list_of_record = record.list_of_record
            this.currentPage = record.current_page
            this.count = 15 * record.num_pages
            this.num_pages = record.num_pages
        },
        async fetchData() {
            const { btc } = await requestAssets()
            const { total } = await requestAward()
            this.total = total
            this.btc = btc
            this.fetchAssetsRecord()
        },
        handleSearch() {
            const selectDate =  {
                pickedStartDate : this.pickedStartDate+':00:00:00',
                pickedEndDate : this.pickedEndDate+':00:00:00'
            }
            console.dir(selectDate)
        },
        handleFilter(filter_time) {
            console.log(filter_time)
            this.filter_time = filter_time
            let today = new Date()
            let end_time = this.formatDate(today.getTime())
            let start_time = this.filterTime(filter_time)
            this.start_time = start_time
            this.end_time = end_time
            this.fetchAssetsRecord(1, start_time, end_time)
        }
    }
}
</script>
