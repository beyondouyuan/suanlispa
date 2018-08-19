<template>
    <section class="award-container">
        <div class="title-label">
            <h2>站内信息</h2>
        </div>
        <div class="message-content-box">
            <div class="message-box">
                <div class="tab-pannel">
                    <span :class="[select_id == 1 ? 'active' : '']" @click="handleSelect(1)">未读({{unread_count}})</span>
                    <span :class="[select_id == 2 ? 'active' : '']" @click="handleSelect(2)">已读</span>
                    <span @click="handleReadAll">全部标为已读</span>
                </div>
                <div class="message-wrapper">
                <ul class="message-list">
                    <li class="msg-item" v-for="(item, index) of list_of_msg" :key="index">
                        <span>{{item.title}}</span>
                        <span v-if="select_type == 'unread'"  :class="select_type" @click="handleMark(item.id)">{{item.content}}</span>
                        <span v-else :class="select_type">{{item.content}}</span>
                        <span class="datetime">{{item.add_time | parseTime('{y}-{m}-{d}')}}</span>
                    </li>
                </ul>
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
import { 
    requestPM,
    requestPMRead,
    requestPMReadAll
} from '@/api'
export default {
    name: 'PM',
    data() {
        return {
            select_id: 1,
            select_type: 'unread',
            unread_count: 0,
            list_of_msg: [],
            pageSize: 15 , //每页显示15条数据
            num_pages: 2,
            currentPage: 1, //当前页码
            count: 15 //总记录数
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        handleSelect(id) {
            this.select_id = id
            if(id == 1) {
                this.fetchPM()
                this.select_type = 'unread'
            } else {
                this.fetchPM(1, 'hasread')
                this.select_type = 'hasread'
            }
        },
        handleReadAll() {
            requestPMReadAll().then(res => {
                // console.log(res)
                if(!res.errcode) {
                    this.showToast({
                    title: '成功',
                    content: '已全部标为已读',
                    type: 'success'
                    })
                } else {
                    this.showToast({
                        title: '操作失败:',
                        content: res.errmsg,
                        type: 'error'
                        })
            }
            }).catch(e => {
                this.showToast({
                    title: '请求出错',
                    content: '服务器请求失败，请重试',
                    type: 'error'
                })
            })
        },
        async fetchData() {
            this.fetchPM()
        },
        pageChange(page) {
            this.currentPage = page
            this.fetchPM(page, this.select_type)
        },
        showToast(msg, cb) {
            this.$Toast({
                ...msg,
                onShow: () => {
                    // console.log('on toast show')
                },
                onHide: () => {
                    // console.log('on toast hide')
                    cb && cb()
                }
            })
        },
        async fetchPM(page=1, has_read='unread'){
            let data = {
                page: page,
                has_read: has_read
            }
            const record = await requestPM(data)
            if(has_read == 'unread') {
                this.unread_count = record.count
            }
            this.list_of_msg = record.list_of_msg
            this.currentPage = record.current_page
            this.count = 15 * record.num_pages
            this.num_pages = record.num_pages
        },
        handleMark(id) {
            requestPMRead({
                id: id
            }).then(res => {
                this.fetchPM()
            })
        }
    }
}
</script>
