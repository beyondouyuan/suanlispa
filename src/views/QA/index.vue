<template>
  <div class="qa-box">
    <div class="title-label">
      <h2>常见问题</h2>
    </div>
    <div class="qa-content" v-html="content">
    </div>
  </div>
</template>
<script>
  import { requestQa } from "@/api"
  export default {
    name: 'QA',
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
        const {content} = await requestQa()
        this.content = content
      }
    }
  }
</script>
