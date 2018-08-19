<template>
    <section class="nodify-wrapper_box">
        <div class="modify-item">
            <div class="input-item">
                <input type="text" name="email" placeholder="请输入邮箱" v-model="Modify.email" />
            </div>
            <div class="input-item">
                <input type="text" name="verify_code" placeholder="请输入验证码" v-model="Modify.email_code">
                <button type="button" :disabled="!smsCode" class="auth-link link-a" @click="handleGetAuth">{{authText}}</button>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'VerifyEmail',
    data() {
        return {
        }
    },
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
