<template>
    <section class="contract-wrapper">
        <div class="contract-item contract-item-left">
            <div class="title">
                <h2 class="title-h2">{{contractItem.contract_name}}</h2>
                <div class="link-box">
                     <router-link :to="{name: 'contractDetail', params: {id: contractItem.id}}"><span>合约详情&gt;&gt;</span></router-link>
                </div>
            </div>
            <div class="main-content_box">
                <div class="main-top">
                    <div class="mian-item">
                        <span>矿机类型</span>
                        <span>{{contractItem.machine_type}}</span>
                    </div>
                    <div class="mian-item">
                        <span>算力</span>
                        <span>{{contractItem.hash_speed | toUnit}}</span>
                    </div>
                    <div class="mian-item">
                        <span>预估日收益</span>
                        <span>{{contractItem.daily_income}}&nbsp;{{contractItem.symbol}}/份</span>
                    </div>
                    <div class="mian-item">
                        <span>合约周期</span>
                        <span>终身</span>
                    </div>
                </div>
                <div class="main-bottom">
                    <div class="mian-item">
                        <span>功耗</span>
                        <span>{{this.toFixed(contractItem.power_fee,3)}}&nbsp;W/份</span>
                    </div>
                    <div class="mian-item">
                        <span>电费</span>
                        <span>{{this.toFixed(contractItem.energy, 6)}}&nbsp;USD/天</span>
                    </div>
                    <div class="mian-item">
                        <span>服务费</span>
                        <span>{{contractItem.service_fee | toPercent}}</span>
                    </div>
                    <div class="mian-item">
                        <span>收益起算日</span>
                        <span>{{contractItem.start_time | parseTime}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="contract-item contract-item-right">
            <div class="main-form_box">
                <div class="top-tips">
                    <div class="amount">
                        <h2>￥ {{this.toFixed(contractItem.price_rmb,2)}}</h2>
                        <span>/份</span>
                    </div>
                    <span>≈ {{toBTC}}BTC</span>
                </div>
                <div class="main-input">
                    <input type="number" name="per" @input="number" v-model="amount" placeholder="1份起购">
                    <span>剩余{{contractItem.left}}份</span>
                </div>
                <div class="radio">
                    <input type="checkbox" @click="handleCheck" name="checkbox" :checked="checked" />
                    <span>我已阅读并同意协议</span>
                </div>
                <div class="bottom-btn">
                    <button class="btn" @click="createRMBOrder">人民币购买</button>
                    <button class="btn" @click="createBTCOrder">BTC购买</button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'PresellItem',
    data() {
        return {
            checked: true,
            amount: '',
            toBTC: 0
        }
    },
    created(){
        this.toBTC = this.toFixed(this.contractItem.price_rmb / this.exchange, 8)
    },
    filters:{
            toPercent:function(value){
                return value * 100 + '%'
            },
            //转换单位
            toUnit:function(value) {
                // console.log(value)
                let result = ''
                if(value >= 1) {
                    if(value > 1000) {
                        result = value / 1000 + 'PH/s'
                    } else {
                        result = value * 1000 / 1000 + 'TH/s'
                    }
                } else {
                    result = value * 1000 + 'MH/s'
                }
                return result
            }
        },
    props: {
        contractItem: {
            type: Object,
            required: true
        },
        exchange: {
            
        }
    },
    methods: {
        number() {
            this.amount=this.amount.replace(/[^\.\d]/g,'');
            this.amount=this.amount.replace('.','');
        },
        handleCheck() {
            this.checked = !this.checked
        },
        createRMBOrder() {
            const contractParams = {
                contract_id: this.contractItem.id,
                amount: Number(this.amount),
                per_price: this.contractItem.price_rmb,
                start_time: this.contractItem.start_time,
                contract_name: this.contractItem.contract_name,
                pay_type: 1,
                checked: this.checked
            }
            this.$emit('handleSubmit', contractParams)
        },
        createBTCOrder() {
            const contractParams = {
                contract_id: this.contractItem.id,
                per_price: this.toBTC,
                start_time: this.contractItem.start_time,
                contract_name: this.contractItem.contract_name,
                amount: Number(this.amount),
                pay_type: 0,
                checked: this.checked
            }
            this.$emit('handleSubmit', contractParams)
        }
    }
}
</script>
