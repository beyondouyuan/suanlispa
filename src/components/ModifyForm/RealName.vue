<template>
    <section class="nodify-wrapper_box">
        <div class="modify-item">
            <input type="text" name="realname" placeholder="请输入真实姓名" v-model="Modify.realname" />
            <input type="text" name="idcard" placeholder="请输入身份证号码" v-model="Modify.idcard" />
        </div>
    </section>
</template>
<script>
    export default {
        name: 'RealName',
        props: {
            Modify: {
                type: Object
            }
        }
    }
</script>
<style lang="scss" scoped>
    .nodify-wrapper_box {
        overflow: hidden;
    }
    .modify-item {
        width: 100%;
        overflow: hidden;
        input {
            width: 100%;
            height: 46px;
            line-height: 46px;
            padding: 0 14px;
            box-sizing: border-box;
            border: 1px solid #EEEEEE;
            &:not(:first-child) {
                margin-top: 10px;
            }
        }
    }
</style>
