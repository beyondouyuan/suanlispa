<template>
    <div class="news-info">
      <div class="title-label">
        <h2>资讯列表</h2>
      </div>
      <div class="news-content">
        <ul>
          <router-link tag="li" :to="{name: 'AnnounceDetail', params: {id: item.id}}" v-for="(item, index) of list_of_announce" :key="index">
            <div class="time-wrapper">
              <span>{{item.datetime | parseTime('{d}', '0')}}</span>
              <span>{{item.datetime | parseTime('{m}', '0')}}月</span>
            </div>
            <span>{{item.title}}</span>
          </router-link>
        </ul>
      </div>
    </div>
</template>
<script>
  import { requestAnnounce } from "@/api"
  export default {
    name: 'QA',
    data() {
      return {
        list_of_announce: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const announce = await requestAnnounce()
        console.log(announce)
        const { list_of_announce } = announce
        this.list_of_announce = list_of_announce
      }
    }
  }
</script>
