<template>
    <section class="nodify-wrapper_box">
        <div class="modify-item">
            <div class="input-item">
                <input type="password" name="old_password" placeholder="请输入旧的密码" v-model="Modify.old_password" />
            </div>
            <div class="input-item">
                <input type="password" name="new_password" placeholder="请输入新的密码" v-model="Modify.new_password" />
            </div>
            <div class="input-item">
                <input type="password" name="confirm_password" placeholder="确认密码" v-model="Modify.confirm_password" />
            </div>
            <!-- <div class="input-item">
                <input type="text" name="username" placeholder="请输入用户名" v-model="Modify.username" />
            </div>
            <div class="input-item">
                <input type="text" name="email" placeholder="请输入邮箱" v-model="Modify.email" />
            </div>
            <div class="input-item">
                <input type="text" name="cellphone" placeholder="请输入手机号码" v-model="Modify.cellphone" />
            </div> -->
            <div class="input-item">
                <input type="text" name="cptch_code" placeholder="请输入取验证码" v-model="Modify.cptch_code">
                <span class="auth-link link-a" title="点击刷新验证码" @click="handleRefresh">
                    <img :src="Cptch.cptch_image">
                </span>
            </div>
        </div>
    </section>
</template>
<script>
    const host = process.env.BASE_API
    export default {
        name: 'LoginPass',
        data() {
            return {
                host
            }
        },
        props: {
            Modify: {
                type: Object
            },
            Cptch: {
                type: Object
            }
        },
        methods: {
            handleRefresh() {
                this.$emit('refresh')
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
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;

        img {
            width: 100%;
        }

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
