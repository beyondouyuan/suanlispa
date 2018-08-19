<template>
    <div class="news-detail">
        <BgBanner :title="'公告详情'"></BgBanner>
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
import { requestAnnounceDetail } from "@/api"
import BgBanner from '@/components/BgBanner'
export default {
    name: 'NewsDetail',
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
        requestAnnounceDetail({id}).then(res => {
          const {data} = res
          if (data.errcode == 0) {
            const { title, add_time, content } = data
            this.detailContent = {
              title,
              add_time,
              content
            }
            this.loading = false
          }
        })
      }
    }
}
</script>
<style lang="scss">
@import '../../assets/style/news.scss';
</style>
