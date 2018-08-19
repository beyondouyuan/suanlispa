<template>
    <div class="dialog" v-if="visible">
        <div class="dialog-container" :style="{width: width, height: height}">
            <div class="dialog-title">{{title}}</div>
            <div class="content">
                <slot name="content"></slot>
            </div>
            <div class="btns">
                <div v-if="type == 'confirm'" class="default-btn" @click="handleClose">
                    {{cancelText}}
                </div>
                <div v-if="type == 'danger'" class="danger-btn" @click="handleDanger">
                    {{dangerText}}
                </div>
                <div v-if="type == 'confirm'" class="confirm-btn" @click="handleConfirm">
                    {{confirmText}}
                </div>
            </div>
            <div class="close-btn" @click="handlecloseDialog">X</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        // 类型包括 defalut 默认， danger 危险， confirm 确认，
        type: {
            type: String,
            default: 'default'
        },
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        dangerText: {
            type: String,
            default: '删除'
        },
        confirmText: {
            type: String,
            default: '确认'
        },
        width: {
            type: String,
            default: '400px'
        },
        height: {
            type: String,
            default: '300px'
        },
    },
    data() {
        return {}
    },
    methods: {
        handlecloseDialog() {
            this.$emit('update:visible', false)
            this.$emit('close')
        },
        handleClose() {
            this.$emit('cancel');
            this.handlecloseDialog();
        },
        handleDanger() {
            this.$emit('danger');
        },
        handleConfirm() {
            this.$emit('confirm');
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss" scoped>
.dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    .dialog-container {
        background: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: relative;
        .dialog-title {
            width: 100%;
            height: 50px;
            font-size: 18px;
            color: #696969;
            font-weight: 600;
            padding: 16px 50px 0 20px;
            box-sizing: border-box;
        }
        .content {
            color: #797979;
            padding: 0 20px;
            box-sizing: border-box;
            overflow: hidden;
            input {
                width: 100%;
                height: 36px;
                line-height: 36px;
                font-size: 14px;
                color: #999999;
                border: 1px solid #E5E5E5;
                box-sizing: border-box;
                padding: 0 14px;
            }
        }
        .inp {
            margin: 10px 0 0 20px;
            width: 200px;
            height: 40px;
            padding-left: 4px;
            border-radius: 4px;
            border: none;
            background: #efefef;
            outline: none;
            &:focus {
                border: 1px solid #00B49D;
            }
        }
        .btns {
            width: 100%;
            height: 60px; // line-height: 60px;
            position: absolute;
            bottom: 0;
            left: 0;
            text-align: right;
            padding: 0 16px;
            box-sizing: border-box;
            &>div {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                padding: 0 14px;
                color: #ffffff;
                background: #f1f1f1;
                border-radius: 8px;
                margin-right: 12px;
                cursor: pointer;
            }
            .default-btn {
                color: #00B49D;
                border: 1px solid #00B49D;
                background: transparent;
            }
            .danger-btn {
                background: #EF8C8C;
                &:hover {
                    background: rgb(224, 135, 135);
                }
                &:active {
                    background: #EF8C8C;
                }
            }
            .confirm-btn {
                color: #ffffff;
                background: #00B49D;
            }
        }
        .close-btn {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 18px;
            cursor: pointer;
            &:hover {
                font-weight: 600;
            }
        }
    }
}
</style>
