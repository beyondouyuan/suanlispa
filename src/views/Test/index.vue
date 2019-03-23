<template>
  <div>
    <div class="table-container">
        <div class="table-title-box">
          <span>大波阿嚏</span>
        </div>
        <div class="table-box">
            <table-filter :items="tableData">
                <template>
                    <div slot="tableName">
                        <span class="table-title">价格1</span>
                    </div>
                </template>
                <template slot="item" slot-scope="props">
                    <tr>
                        <th>
                            {{ props.item.title }}
                        </th>
                        <td v-for="child of props.item.children">
                            {{child}}
                        </td>
                        <td>
                            <span @click="handleDelete(props.item.id)">删除</span>
                            <span @click="handleEdit(props.item)">编辑</span>
                        </td>
                    </tr>
                </template>
            </table-filter>
            <table-filter :items="tableData">
                <template>
                    <div slot="tableName">
                        <span class="table-title">会员价</span>
                    </div>
                </template>
                <template slot="item" slot-scope="props">
                    <tr>
                        <th>
                            {{ props.item.title }}
                        </th>
                        <td v-for="child of props.item.children">
                            {{child}}
                        </td>
                        <td>
                            <span @click="handleDelete(props.item.id)">删除</span>
                            <span @click="handleEdit(props.item)">编辑</span>
                        </td>
                    </tr>
                </template>
            </table-filter>
        </div>
    </div>
    <div class="table-container">
        <div class="table-title-box">
          <span>大波阿嚏</span>
        </div>
        <div class="table-box">
            <table-filter :items="tableData">
                <template>
                    <div slot="tableName">
                        <span class="table-title">价格1</span>
                    </div>
                </template>
                <template slot="item" slot-scope="props">
                    <tr>
                        <th>
                            {{ props.item.title }}
                        </th>
                        <td v-for="child of props.item.children">
                            {{child}}
                        </td>
                        <td>
                            <span @click="handleDelete(props.item.id)">删除</span>
                            <span @click="handleEdit(props.item)">编辑</span>
                        </td>
                    </tr>
                </template>
            </table-filter>
            <table-filter :items="tableData">
                <template>
                    <div slot="tableName">
                        <span class="table-title">会员价</span>
                    </div>
                </template>
                <template slot="item" slot-scope="props">
                    <tr>
                        <th>
                            {{ props.item.title }}
                        </th>
                        <td v-for="child of props.item.children">
                            {{child}}
                        </td>
                        <td>
                            <span @click="handleDelete(props.item.id)">删除</span>
                            <span @click="handleEdit(props.item)">编辑</span>
                        </td>
                    </tr>
                </template>
            </table-filter>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [{
                title: '原价',
                id: '12987122',
                children: [1, 2, 3, 4, 5, 6]
            }, {
                title: '会员价',
                id: '12987123',
                children: [1, 2, 3, 4, 5, 6]
            }, {
                title: '优惠价',
                id: '12987124',
                children: [1, 2, 3, 4, 5, 6]
            }]
        };
    },
    methods: {
        handleEdit(item) {
            console.log(item)
        },
        handleDelete(id) {
            console.log(id)
        }
    }
}
</script>
<style lang="scss" scoped>
.table-container {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    border: 1px solid #EEEEEE;
    margin-bottom: 20px;
    .table-title-box {
      width: 8%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #EEEEEE;
    }
    .table-box {
      flex: 1;
      padding-left: 20px;
      box-sizing: border-box;
    }
}
</style>
