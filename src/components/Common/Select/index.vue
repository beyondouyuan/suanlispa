<template>
    <div class="select">
        <div class="inner">
            <div class="inputWrapper" :class="showOptions ? 'active' : '' " @click="showOptions = !showOptions">
                <input type="text" readonly placeholder="请选择" :value="selectedItem">
                <span class="iconfont icon-zhankaishangxia"></span>
            </div>
            <ul class="options" v-show="showOptions">
                <li v-for="(item, index) in options" :key="index" @click="handleSelect(item)">{{item.text}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Select',
    props: {
        options: {
            type: Array,
            required: true
        },
        selected: {
            type: String,
            default: ''
        }
    },
    computed: {
    },
    data() {
        return {
            showOptions: false,
            selectedItem: ''
        }
    },
    watch: {
        selected: function(val) {
            this.selectedItem = val
        }
    },
    created() {
        // console.log(this.selected)
        this.selectedItem = this.selected
    },
    methods: {
        handleSelect(item) {
            const { key, text } = item
            this.showOptions = false
            if (text !== this.selectedItem) {
                this.selectedItem = text
            }
            this.$emit('iclick', item)
        }
    }
}
</script>
<style lang="scss">
.select {
    position: absolute;
    z-index: 100;
    height: 100%;
    line-height: 100%;
    border: solid 1px #4fb39e;
    box-sizing: border-box;
    .inner {
        height: 100%;
        line-height: 100%;
    }
    .inputWrapper {
        height: 100%;
        line-height: 100%;
        position: relative;
        box-sizing: border-box;
        &:after {
            transition: all 0.2s ease-in;
            position: absolute;
            right: 10px;
            top: calc(48% - 4px);
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            border-top: 1px solid rgba(79, 179, 158, 1);
            border-right: 1px solid rgba(79, 179, 158, 1);
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
        }
        &.active {
            &:after {
                transform: rotate(-45deg);
                -webkit-transform: rotate(-45deg);
            }
        }
        input {
            height: 100%;
            line-height: 100%;
            box-sizing: border-box;
            width: 100% !important;
            padding-left: 16px;
            box-sizing: border-box;
        }
    }
    ul {
        // width: 150%;
        border: 1px solid #CCCCCC;
        // border-bottom-left-radius: 5px;
        // border-bottom-right-radius: 5px;
        transition: all .35s ease-in-out;
        background-color: #FFFFFF;
        li {
            box-sizing: border-box;
            padding: 5px 16px;
            height: 30px;
            display: flex;
            align-items: center;
            color: rgba(79, 179, 158, 1);
            &:hover {
                color: #FFFFFF;
                background-color: rgba(79, 179, 158, 1);
            }
        }
    }
}
</style>
