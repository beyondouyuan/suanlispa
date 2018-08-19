<template>
    <section class="table-wrapper">
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
    name: 'TableBox',
    props: {
        items: {
            type: Array
        }
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
