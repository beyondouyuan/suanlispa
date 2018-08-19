<template>
  <div class="service-box">
    <div class="title-label">
      <h2>客服服务</h2>
    </div>
    <div class="service-content" v-html="content">
    </div>
  </div>
</template>
<script>
  import {
    requestContact
} from "@/api"
  export default {
    name: 'Service',
    data() {
      return {
        content: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const {content} = await requestContact()
        this.content = content
      }
    }
  }
</script>
