<template>
    <section class="nodify-wrapper_box">
        <div class="modify-item">
            <div class="input-item">
                <input type="password" name="trade_pwd" placeholder="请输入新的密码" v-model="Modify.trade_pwd" />
            </div>
            <div class="input-item">
                <input type="password" name="confirm_password" placeholder="确认密码" v-model="Modify.confirm_password" />
            </div>
            <div class="input-item">
                <input type="text" name="verify_code" placeholder="请获取验证码" v-model="Modify.verify_code">
                <button type="button" :disabled="!smsCode" class="auth-link link-a" @click="handleGetAuth">{{authText}}</button>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'TradePass',
    props: {
        Modify: {
            type: Object
        },
        authText: {

        },
        smsCode: {

        }
    },
    methods: {
        handleGetAuth() {
            this.$emit('auth')
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
    .input-item {
        width: 100%;
        height: 46px;
        line-height: 46px;
        box-sizing: border-box;
        position: relative;
        &:not(:first-child) {
            margin-top: 10px;
        }
    }
    .auth-link {
        position: absolute;
        z-index: 100;
        right: 14px;
        top: 50%;
        transform: translateY(-50%);
        height: 100%;
        line-height: 100%;
        border: none;
        outline: none;
        background: transparent;
    }
    input {
        height: 100%;
        line-height: 100%;
        width: 100%;
        padding: 0 14px;
        box-sizing: border-box;
        border: 1px solid #EEEEEE;
    }
}
</style>
