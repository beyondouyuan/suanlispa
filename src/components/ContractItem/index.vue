<template>
    <section class="contract-wrapper">
      <div class="contract-content-table">
        <table class="table">
            <tbody>
                <!-- <tr v-for="(item, index) of dataSourece" :key="index">
            <th>{{columns[index].title}}</th>
            <td v-for='col of columns'>{{item[col.key]}}</td>
          </tr> -->
                <!-- <tr v-for="(item, index) of dataSourece" :key="index">
                    <th>{{columns[index].title}}</th>
                    <td v-for='col of columns'>{{item[col.key]}}</td>
                </tr> -->
                <tr v-for="(item, index) of columns" :key="index">
                    <th>
                        {{item.title}}
                    </th>
                    <td v-if="item.key == 'benefit'">{{dataSourece[item.key] | parseTime}}</td>
                    <td v-else>{{dataSourece[item.key]}}</td>
                </tr>
            </tbody>
        </table>
      </div>
        <!-- <div class="title-label">
        <h2>{{title}}</h2>
      </div>
      <div class="contract-content">
        <div class="contract-item contract-item-left">
          <div class="title">
            <h2 class="title-h2">{{subTitle}}</h2>
            <div class="link-box">
              <span>合约详情&gt;&gt;</span>
            </div>
          </div>
          <div class="main-content_box">
            <div class="main-top">
              <div class="mian-item" v-for="(item, index) of leftTopList">
                <span>{{item.title}}</span>
                <span>{{item.value}}</span>
              </div>
            </div>
            <div class="main-bottom">
              <div class="mian-item" v-for="(item, index) of leftBottomList">
                <span>{{item.title}}</span>
                <span>{{item.value}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="contract-item contract-item-right">
          <div class="main-form_box">
            <div class="top-tips">
              <div class="amount">
                <h2>￥ {{rightObject.amount}}</h2>
                <span>/{{rightObject.util}}</span>
              </div>
              <span>≈ {{rightObject.transUtil}}</span>
            </div>
            <div class="main-input">
              <input type="text" name="per" :placeholder="rightObject.remain">
              <span>{{rightObject.remain}}</span>
            </div>
            <div class="radio">
              <input type="radio" name="">
              <span>我已阅读并同意协议</span>
            </div>
            <div class="bottom-btn">
              <button class="btn">人民币</button>
              <button class="btn">比特币</button>
            </div>
          </div>
        </div>
      </div> -->
    </section>
</template>
<script>
export default {
    name: 'ContractItem',
    props: {
        columns: {
            type: Array,
            required: true
        },
        dataSourece: {
            type: Object,
            required: true
        }
        // title: {
        //   type: String,
        //   required: true
        // },
        // subTitle: {
        //   type: String,
        //   required: true
        // },
        // leftTopList: {
        //   type: Array,
        //   required: true
        // },
        // leftBottomList: {
        //   type: Array,
        //   required: true
        // },
        // rightObject: {
        //   type: Object,
        //   required: true
        // }
    }
}
</script>
<style lang="scss" scoped>
table {
    width: 100%;
    table-layout: fixed;
    empty-cells: show;
    border-collapse: collapse;
    margin: 0 auto;
    th,
    td {
        text-align: center;
        padding: 14px;
        border: 1px solid #EEEEEE;
        &:first-child {
            border-left: none
        }
    }
    th {
        width: 25%;
        border: 1px solid #EEEEEE;
    }
}
</style>
