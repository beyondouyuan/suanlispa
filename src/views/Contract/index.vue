<template>
  <div class="contract-container">
    <div class="title-label">
        <h2>{{ resultData.pay_type == 1 ?  '人民币购买' : 'BTC购买'}}</h2>
      </div>
    <div class="contract-content-table">
      <div class="sub-tips">
        <h2>请添加客服微信根据客服提示完成交易，24小时后订单将自动取消</h2>
      </div>
      <div class="sub-title">
        <h3>订单详情</h3>
      </div>
      <div class="contract-detail">
        <ContractItem :columns="resultcolumns" :dataSourece="resultData"></ContractItem>
      </div>
      <div class="qrcode">
        <img :src="kfQrcode" />
        <!-- <p>扫码加客服为好友</p> -->
      </div>
      <div class="btn-box">
        <button class="btn cancel" @click="cancelOrder">取消订单</button>
      </div>
    </div>

    <!-- <contract-item
      :title="'S9云挖矿合约'"
      :subTitle="'Antminer S9 14T'"
      :leftTopList="leftTopList"
      :leftBottomList="leftBottomList"
      :rightObject="rightObject"
    ></contract-item>
    <contract-item
      :title="'L3 云挖矿合约'"
      :subTitle="'Antminer L3+'"
      :leftTopList="leftTopList"
      :leftBottomList="leftBottomList"
      :rightObject="rightObject"
    ></contract-item> -->
  </div>
</template>
<script>
  import ContractItem from '@/components/ContractItem'
  import {requestContractCancelOrder, requestContractService} from '@/api'
  const resultcolumns = [{
    key: 'type',
    title: '合约信息'
  }, {
    key: 'price',
    title: '价格'
  }, {
    key: 'amount',
    title: '份数'
  }, {
    key: 'order_id',
    title: '订单编号'
  }, {
    key: 'benefit',
    title: '收益起算日'
  }]
  export default {
    name: 'Contract',
    components: {
      ContractItem
    },
    data() {
      return {
        resultcolumns,
        resultData: {

        },
        kfQrcode: ''
      }
    },
    created() {
      requestContractService().then(res => {
        this.kfQrcode = res.url
      })
    },
    mounted() {
      const {id, detail} = this.$route.params
      const resultData = {
        pay_type: detail.pay_type,
        type: detail.contract_name,
        price: detail.per_price,
        amount: detail.amount,
        order_id: id,
        benefit: detail.start_time
      }
      this.resultData = resultData
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
      cancelOrder() {
        requestContractCancelOrder({
          order_num: this.resultData.order_id
        }).then(res => {
          if (!res.errmsg) {
            this.showToast({
                      title: '取消成功',
                      content: '取消订单成功',
                      type: 'success'
                    }, () => {
                      this.$router.push({
                        name: 'Presell'
                      })
                    })
          } else {
             this.showToast({
                      title: '取消订单失败，请重试',
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
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/style/contract.scss';
</style>

























