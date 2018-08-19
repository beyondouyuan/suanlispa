<template>
    <div class="news-detail">
        <BgBanner :title="'资讯详情'"></BgBanner>
        <div class="detail-content">
          <div class="title-label">
            <h2>{{detailContent.title}}</h2>
          </div>
          <div class="sub-title">
            <span>{{detailContent.add_time | parseTime('{y}-{m}-{d}')}}</span>
          </div>
          <div class="main-detail">
            <div v-html="detailContent.content"></div>
          </div>
        </div>
    </div>
</template>
<script>
import { requestNewsDetail } from "@/api"
import BgBanner from '@/components/BgBanner'
export default {
    name: 'NewsDetail',
    metaInfo: {
      title: 'My Example App', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'My Example App'
      }]
    },
    components: {
        BgBanner
    },
    data() {
        return {
          loading: true,
          detailContent: {

          }
        }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        const { id } = this.$route.params
        requestNewsDetail({id}).then(res => {
          console.log(res)
          const {data} = res
          const { title, add_time, content } = data
          this.detailContent = {
            title,
            add_time,
            content
          }            
          this.loading = false
        })
      }
    }
}
</script>
<style lang="scss">
@import '../../assets/style/news.scss';
</style>
