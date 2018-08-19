<template>
    <div class="in-box row-input_box">
        <div class="item-input_box">
            <div class="form-bg" :class="FormData.formBG">
                <h2>{{FormData.title}}</h2>
                <div class="item tip-amount">
                    <label>可用：{{FormData.canUse}} </label>
                    <span>{{FormData.amount}}</span>
                </div>
                <div class="item row-input">
                    <label for="price">价格：</label>
                    <input v-model="price" type="number" name="price">
                </div>
                <div class="item row-input">
                    <label for="num">数量：</label>
                    <input v-model="amount" type="number" name="num">
                </div>
            </div>
            <div class="form-bottom">
                <div class="item order-box">
                    <p>
                        订单金额：{{total}}
                      <!-- <input type="" name="" placeholder="订单金额：234"> -->
                    </p>
                    <p v-if="FormData.side == 'bid'">
                        最大可买：{{maxUse}}
                      <!-- <input type="" name="" placeholder=""> -->
                    </p>
                    <p v-else>
                        最大可卖：{{maxUse}}
                      <!-- <input type="" name="" placeholder=""> -->
                    </p>
                </div>
                <div class="item row-btn">
                    <button v-waves class="btn" :class="FormData.btnClass" @click="handleClick">{{FormData.btnTxt}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import waves from "@/directive/waves"
export default {
    name: 'Form',
    props: {
        FormData: {
            type: Object,
            required: true
        }
    },
    directives: {
        waves
    },
    data() {
        return {
            price: 0,
            amount: 0
        }
    },
    computed: {
        maxUse: function() {
            if(this.FormData.side == 'bid') {
                if(this.price == 0) return 0
                return this.strip(this.FormData.canUse / this.price)
            } else {
                if(this.amount == 0) return 0
                return this.strip(this.FormData.canUse / this.amount)
            }
        },
        total: function() {
            return this.strip(this.price * this.amount)
        }
    },
    methods: {
        handleClick() {
            this.$emit('pClick', {
                price: this.price,
                amount: this.amount,
                type: this.FormData.type,
                side: this.FormData.side
            })
        }
    }
}
</script>
<style lang="scss">
</style>
