<template>
  <div class="trade-container">
    <section class="tab-container">
      <div class="tab-box">
        <span
          class="tab-item"
          :tagId="item.id"
          :class="[contract_id == item.id ? 'active' : '']"
          v-for="(item, index) of contracts"
          :key="index"
          @click="handleSwitchTag(item.id)"
          >{{item.contract_name}}</span>
      </div>
    </section>
    <section class="content-container">
      <div class="info-wrapper">
        <div class="bar-panel">
          <div class="panel-item panel-left">
            <div class="item-list">
              <div class="item item-title">
                <span></span>
                <span>{{currentContract.contract_name}}/BTC</span>
              </div>
              <div class="item item-row">
                <span>最新价格</span>
                <span class="big-text">{{newestData.newest_price}}</span>
              </div>
              <div class="item item-row">
                <span>今日涨幅</span>
                <span class="big-text">{{newestData.gain}}%</span>
              </div>
            </div>
            <div class="item-list">
              <div class="item">
                <span>今日最高</span>
                <span>{{newestData.highest_price}}</span>
              </div>
              <div class="item">
                <span>今日最低</span>
                <span>{{newestData.lowest_price}}</span>
              </div>
              <div class="item">
                <span>24H成交量</span>
                <span>{{newestData.volume}}</span>
              </div>
              <div class="item">
                <span>24H成交额</span>
                <span>{{newestData.turnover}}</span>
              </div>
            </div>
          </div>
          <div class="panel-item contract-link">
            <router-link :to="{name: 'contractDetail', params: {id: this.contract_id}}">合约详情&gt;&gt;</router-link>
          </div>
        </div>
      </div>
      <div class="echart-wrapper">
        <Echarts :precision="contract_id" :title="currentContract.contract_name"></Echarts>
      </div>
      <div class="server-wrapper">
        <div class="server-item server-box">
          <Form @pClick="handleLimit" :FormData="FormInObject"></Form>
          <Form @pClick="handleLimit" :FormData="FormOutObject"></Form>
        </div>
        <div class="server-item server-price">
          <div class="prict-header">
            <h2>市场委托</h2>
          </div>
          <div class="table-box">
              <table-box :items="priceData.ask">
                  <template>
                      <tr slot="cols">
                          <th>买/卖</th>
                          <th>价格</th>
                          <th>数量</th>
                      </tr>
                  </template>
                  <template slot="item" slot-scope="props">
                          <tr>
                              <td style="color:#E05453">
                                  卖{{props.item.rank + 1}}
                              </td>
                              <td>
                                  {{ props.item.price }}
                              </td>
                              <td>
                                  {{ props.item.volume}}
                              </td>
                          </tr>
                  </template>
              </table-box>
              <table-box :items="priceData.bid">
                  <template slot="item" slot-scope="props">
                          <tr>
                              <td style="color:#4fb39e">
                                  买{{ props.item.rank + 1}}
                              </td>
                              <td>
                                  {{ props.item.price }}
                              </td>
                              <td>
                                  {{ props.item.volume}}
                              </td>
                          </tr>
                  </template>
              </table-box>
          </div>

        </div>
      </div>
     <section class="history-box">
          <div class="title-label">
              <h2>当前委托</h2>
          </div>
          <div class="table-box">
              <table-box :items="list_of_current">
                  <template>
                      <tr slot="cols">
                          <th>委托时间</th>
                          <th>类型</th>
                          <th>委托价格</th>
                          <th>委托数量</th>
                          <th>已成交</th>
                          <th>尚未成交</th>
                          <th>成交均价</th>
                          <th>操作</th>
                      </tr>
                  </template>
                  <template slot="item" slot-scope="props">
                          <tr>
                              <td>
                                  {{ props.item.time | parseTime }}
                              </td>
                              <td v-if="props.item.side == 'ask'" style="color:#E05453">
                                    {{ props.item.side | sideType }}
                              </td>
                              <td v-else style="color:#4fb39e">
                                    {{ props.item.side | sideType }}
                              </td>
                              <td>
                                  {{ props.item.price }}
                              </td>
                              <td>
                                  {{ props.item.deal_amount + props.item.amount}}
                              </td>
                              <td>
                                  {{ props.item.deal_amount}}
                              </td>
                              <td>
                                  {{ props.item.amount}}
                              </td>
                              <td v-if="props.item.deal_amount == 0">
                                  0
                              </td>
                              <td v-else>
                                  {{props.item.turnover / props.item.deal_amount}}
                              </td>
                               <td>
                                    <a @click="handleCancel(props.item.id)" style="color:#E05453">撤销</a>
                              </td>
                          </tr>
                  </template>
              </table-box>
          </div>
          <div v-if="c_num_pages > 1" class="pagination-container">
              <pagination
                  :page-index="c_currentPage"
                  :total="c_count"
                  :page-size="pageSize"
                  @change="c_pageChange">
              </pagination>
          </div>
      </section>
      <section class="history-box">
          <div class="title-label">
              <h2>历史委托</h2>
          </div>
          <div class="table-box">
              <table-box :items="list_of_trade">
                  <template>
                      <tr slot="cols">
                          <th>委托时间</th>
                          <th>类型</th>
                          <th>委托价格</th>
                          <th>委托数量</th>
                          <th>成交金额</th>
                          <th>成交均价</th>
                          <th>操作</th>
                      </tr>
                  </template>
                  <template slot="item" slot-scope="props">
                          <tr>
                              <td>
                                  {{ props.item.time | parseTime }}
                              </td>
                              <td v-if="props.item.side == 'ask'" style="color:#E05453">
                                    {{ props.item.side | sideType }}
                              </td>
                              <td v-else style="color:#4fb39e">
                                    {{ props.item.side | sideType }}
                              </td>
                              <td>
                                  {{ props.item.price }}
                              </td>
                              <td>
                                  {{ props.item.deal_amount + props.item.amount}}
                              </td>
                              <td>
                                  {{ props.item.turnover}}
                              </td>
                              <td>
                                  {{ props.item.turnover / props.item.deal_amount}}
                              </td>
                              <td>
                                    <a @click="handleDelete(props.item.id)" style="color:#E05453">删除</a>
                              </td>
                          </tr>
                  </template>
              </table-box>
          </div>
          <div v-if="num_pages > 1" class="pagination-container">
              <pagination
                  :page-index="currentPage"
                  :total="count"
                  :page-size="pageSize"
                  @change="pageChange">
              </pagination>
          </div>
       </section>
  </section>
  </div>
</template>
<script>
  const FormInObject = {
    title: '买入',
    type: 'limit',
    side: 'bid',
    canUse: '0',
    btnClass: 'btn-success',
    btnTxt: '买入',
    formBG: 'go-in',
    canUse: 0
  }
  const FormOutObject = {
    title: '卖出',
    type: 'limit',
    side: 'ask',
    canUse: '0',
    btnClass: 'btn-danger',
    btnTxt: '卖出',
    formBG: 'go-out',
    canUse: 0
  }

  import Form from '@/components/Common/Form'
  import Echarts from '@/components/Echarts'
  import {
    requestExchangeAsset,
    requestContractDetail,
    requestNewestdata,
    requestAssets,
    requestExchangePut,
    requestExchangeList,
    requestKLine,
    requestExchangeCancel,
    requestExchangeDelete,
    requestExchangeOrderbook
  } from '@/api'
  export default {
    name: 'Contract',
    components: {
      Form,
      Echarts
    },
    metaInfo() {
        return {
            title: '交易市场-算力多云算力投资平台', // set a title
            meta: [
                {                 // set meta
                    name: 'keywords',
                    content: this.pageKeyWord
                },
                {                 // set meta
                    name: 'description',
                    content: this.pageDesc
                }
            ]
        }
    },
    data() {
      return {
        pageTitle: '交易市场-算力多云算力投资平台',
        pageKeyWord: '云算力,算力,矿机,云算力租赁,云算力出租,云算力租用,算力租赁,算力出租,算力租用,矿机托管,矿机出租,矿机租赁,矿机租用',
        pageDesc: '算力多是目前全球领先的比特币挖矿、莱特币云挖矿算力投资平台之一。致力于提供算力租赁,云算力出租,云算力租用,算力租赁,算力出租,算力租用,矿机托管,矿机出租,矿机租赁,矿机租用等服务的云算力投资平台。',
        contracts: [],
        currentContract: {},
        FormInObject,
        FormOutObject,
        msg: '交易市场',
        contract_id: 1,
        list_of_trade: [],
        pageSize: 15 , //每页显示15条数据
        num_pages: 1,
        currentPage: 1, //当前页码
        count: 15, //总记录数
        c_num_pages: 1,
        c_currentPage: 1, //当前页码
        c_count: 15, //总记录数
        list_of_current: [],
        kline_type: 0,
        newestData: {},
        priceData: {},
      }
    },
    created() {
      requestContractDetail().then(res => {
          const {data} = res
          this.contracts = data
          this.contract_id = data[0].id
          this.currentContract = data[0]
          // console.log(this.currentContract)
          this.fetData()
        })
    },
    filters:{
        sideType: function(value) {
            return value == 'ask'?'卖出':'买入'
        }
    },
    methods: {
      fetData(){
        this.fetchAsset()
        this.fetHistory()
        this.fetCurrent()
        this.fetNewestData()
        this.fetchOrderBook()
        // this.fetAsset()
        // this.fetKLine()
      },
      handleSwitchTag(id) {
        this.contract_id = id
        for(var index in this.contracts) {
          if(this.contracts[index].id == id) {
            this.currentContract = this.contracts[index]
          }
        }
        this.fetData()
        // setTimeout(() => {
        //   this.fetData()
        //   this.fetchAsset()
        //   this.requestExchangeOrderbook()
        // }, 300)
      },
      fetchAsset() {
        requestExchangeAsset({
          contract_id: this.contract_id
        }).then(res => {
          this.FormInObject.canUse = res.pc
          this.FormOutObject.canUse = res.phs
        })
      },
      fetNewestData()
      {
        requestNewestdata({
          contract_id: this.contract_id
        }).then(res => {
          // console.log(res);
          this.newestData = res
        })
      },
      fetCurrent()
      {
        this.fetNotDeal()
      },
      fetKLine() {
        requestKLine({
          contract_id: this.contract_id,
          type: this.kline_type
        }).then(res => {
          // console.log(res)
        })
      },
      fetHistory() {
        let data = {}
        data.page = this.currentPage
        data.contract_id = this.contract_id
        data.status = ['deal']
        // console.log(data)
        requestExchangeList(data).then(res=> {
          // console.log(res)
          const {list_of_trade} = res
          this.list_of_trade = list_of_trade
          this.currentPage = res.current_page
          this.count = 15 * res.num_pages
          this.num_pages = res.num_pages
        })
      },
      pageChange(page) {
          this.currentPage = page
          this.fetHistory()
      },
      c_pageChange(page) {
          this.c_currentPage = page
          this.fetHistory()
      },
      fetNotDeal() {
        var data = {}
        data.contract_id = this.contract_id
        data.status = ['not_deal', 'part_deal']
        requestExchangeList(data).then(res=> {
          const {list_of_trade} = res
          this.list_of_current = list_of_trade
          this.c_currentPage = res.current_page
          this.c_count = 15 * res.num_pages
          this.c_num_pages = res.num_pages
        })
      },
      showAlert(msg, cb) {
          this.$Alert({
              ...msg,
              onShow: () => {
                  console.log('on alert show')
              },
              onHide: () => {
                  console.log('on alert hide')
                  cb && cb()
              }
          })
      },
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
      handleDelete(id) {
        // console.log('删除订单' + id)
        requestExchangeDelete({
          trade_ids: [id]
        }).then(res => {
          if(!res.errcode) {
            this.showToast({
              title: '成功',
              content: '删除成功',
              type: 'success'
              })
            this.fetHistory()
          } else {
            this.showToast({
                      title: '删除失败:',
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
      handleCancel(id) {
        // console.log('撤销订单' + id)
        requestExchangeCancel({
          trade_ids: [id]
        }).then(res => {
          if(!res.errcode) {
            this.showToast({
              title: '成功',
              content: '提交成功',
              type: 'success'
              })
            this.fetCurrent()
          } else {
            this.showToast({
                      title: '提交失败:',
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
      fetchOrderBook() {
        let data = {
          contract_id: this.contract_id,
          num: 6
        }
        requestExchangeOrderbook(data).then(res => {
          // console.log(res.data)
          let data = {res}
          data.ask = res.data.ask.reverse()
          data.bid = res.data.bid
          this.priceData = data
        })
      },
      handleLimit(data) {
        data.contract_id = this.contract_id;
        requestExchangePut(data).then(res => {
          if(!res.errcode) {
            this.showToast({
              title: '成功',
              content: '委托成功',
              type: 'success'
              })
              this.fetData()
          } else {
            this.showToast({
                      title: '委托失败:',
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
  @import '../../assets/style/trading.scss';
</style>
