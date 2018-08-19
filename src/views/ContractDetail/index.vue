<template>
    <div class="news-detail">
        <BgBanner :title="'合约详情'"></BgBanner>
        <div class="detail-content">
          <!-- <div class="title-label">
            <h2>{{detailContent.title}}</h2>
          </div> -->
          <!-- <div class="sub-title">
            <span>{{detailContent.add_time | parseTime('{y}-{m}-{d}')}}</span>
          </div> -->
          <div class="main-detail">
            <div v-html="detailContent"></div>
          </div>
        </div>
    </div>
</template>
<script>
import { requestContractDesc } from "@/api"
import BgBanner from '@/components/BgBanner'
export default {
    name: 'ContractDetail',
    components: {
        BgBanner
    },
    data() {
        return {
          loading: true,
          detailContent: ''
        }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        const { id } = this.$route.params
        requestContractDesc({contract_id: id}).then(res => {
          console.log(res)
          const { content } = res
          this.detailContent = content
          this.loading = false
        })
      }
    }
}
</script>
<style lang="scss">
@import '../../assets/style/news.scss';
</style>
