<template>
    <div class="news-info">
      <div class="title-label">
        <h2>资讯列表</h2>
      </div>
      <div class="news-content">
        <ul>
          <router-link tag="li" :to="{name: 'newsDetail', params: {id: item.id}}" v-for="(item, index) of list_of_news" :key="index">
            <div class="time-wrapper">
              <span>{{item.datetime | parseTime('{d}', '0')}}</span>
              <span>{{item.datetime | parseTime('{m}', '0')}}月</span>
            </div>
            <span>{{item.title}}</span>
            <!-- <span>{{item.datetime | parseTime('{y}-{m}-{d}')}}</span> -->
          </router-link>
        </ul>
      </div>
    </div>
</template>
<script>
  import { requestNews } from "@/api"
  export default {
    name: 'QA',
    data() {
      return {
        list_of_news: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const data = await requestNews()
        console.log(data)
        const { list_of_news } = data
        this.list_of_news = list_of_news
      }
    }
  }
</script>
