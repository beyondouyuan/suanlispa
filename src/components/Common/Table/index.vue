<template>
  <section class="table-wrapper">
    <!-- 使用时 columns每一项的key的键值必须对应 dataSource的属性名称-->
    <table class="table">
      <thead>
        <tr>
          <!-- 表头循环表的字段 -->
          <th v-for="(item, index) of columns" :key="item.key">
            {{item.title}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of dataSourece" :key="index">
          <!-- 循环字段对应的值 -->
          <td v-for='col of columns'>{{item[col.key]}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
  export default {
    name: 'Table',
    props: {
      columns: {
        type: Array,
        required: true
      },
      dataSourece: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  table {
    width: 100%;
    table-layout:fixed;
    empty-cells:show;
    border-collapse: collapse;
    margin: 0 auto;
    th,
    td {
      text-align: center;
      padding: 14px;
      border:1px solid #EEEEEE;
      &:first-child {
        border-left: none
      }
      &:last-child {
        border-right: none
      }
    }
    th {
      border:1px solid #EEEEEE;
      background-color: #F9F9F9;
    }
    // tr:nth-child(even) td {
    //   background-color: #cad9ea;
    // }
  }
</style>













