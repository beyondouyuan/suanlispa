<template>
    <div class="about-box">
        <div class="title-label">
            <h2>公司简介</h2>
        </div>
        <div class="about-content" v-html="content">
        </div>
    </div>
</template>
<script>
import {
    requestAbout
} from "@/api"
export default {
    name: 'About',
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
          const {content} = await requestAbout()
          console.log(content)
          this.content = content
        }
    }
}
</script>
