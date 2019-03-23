<template>
    <section class="table-wrapper">
        <div class="table-name">
            <slot name="tableName"></slot>
        </div>
        <table class="table">
            <tbody>
                <slot name="cols" ></slot>
                <slot name="item" v-for="item in items" :item="item">
                </slot>
            </tbody>
        </table>
    </section>
</template>
<script>
export default {
    name: 'TableFilter',
    props: {
        items: {
            type: Array
        }
    }
}
</script>
<style lang="scss" scoped>
.table-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    box-sizing: border-box;
    border: 1px solid #EEEEEE;
    margin: 20px 0;
    .table-name {
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 14px;
        border-right: 1px solid #EEEEEE;
        margin-right: 10px;
    }
    .table {
        flex: 1;
        margin: 10px;
    }
}
table {
    width: 100%;
    table-layout: fixed;
    empty-cells: show;
    border-collapse: collapse;
    margin: 0 auto;
    border: 1px solid #EEEEEE;
    th,
    td {
        text-align: center;
        font-size: 14px;
        padding: 10px;
        border: 1px solid #EEEEEE;
        &:first-child {
            border-left: none
        }
        &:last-child {
            border-right: none
        }
    }
    th {
        border: 1px solid #EEEEEE;
        background-color: #F9F9F9;
    }
}
@media screen and (max-width:767px) {
    table {
        table-layout: auto
    }
    td,
    th {
        width: auto;
        white-space:nowrap;
    }
}
</style>
