<template>
    <div class="benefit-container">
        <section class="counter-card">
            <div class="bar-box">
                <span>挖矿收益计算器</span>
            </div>
            <div class="counter-box">
                <div class="counter-top">
                    <div class="input-list">
                        <div class="select-box">
                            <Select :selected="defaultDcSelected" :options="list_of_dc" @iclick="handleSelectDc"></Select>
                        </div>
                        <span class="trans">
                            <img src="/static/image/conversion-icon.png" />
                        </span>
                        <div class="select-box">
                            <Select :selected="defaultUnitSelected" :options="unit" @iclick="handleSelectUnit"></Select>
                        </div>
                    </div>
                    <div class="input-box_item">
                        <div class="input-box_right">
                            <!-- <button v-waves type="button" class="btn" @click="handleComputeDcIncome">计算收益</button> -->
                            <span class="txt">当前挖矿难度： {{diffculty}}</span>
                        </div>
                    </div>
                </div>
                <div class="counter-bottom">
                    <div class="counter-item counter-area">
                        <textarea v-model="power" class="area" placeholder="请输入要计算的有效算力" @input="handleComputeDcIncome"></textarea>
                    </div>
                    <textarea disabled="disabled" v-model="result" class="counter-item counter-result"></textarea>
                </div>
                <p class="tips">温馨提示：收益计算器是采用当前难度及过去7天平均矿工费估算的PPS+理论收益，该收益与您的实际收益存在一定的偏差，仅供参考。</p>
            </div>
        </section>
        <section class="counter-table counter-card">
            <div class="bar-box">
                <span>合约收益计算器</span>
            </div>
            <div class="counter-box">
                <div class="counter-top">
                    <div class="input-list">
                        <div class="select-box">
                            <Select :selected="defaultContactSelected" :options="contracts" @iclick="handleSelectContract"></Select>
                        </div>
                        <div class="trans-box">
                            <input type="number" @input="handleComputeContract" v-model="unitAmount" name="" placeholder="请输入算力" value="0" />
                        </div>
                        <div class="select-box">
                            <Select :selected="defaultUnitSelected" :options="unit_of_contract" @iclick="handleSelectContractUnit"></Select>
                        </div>
                    </div>
                    <!-- <div class="input-box_item">
                        <div class="input-right_big">
                            <button v-waves type="button" class="btn" @click="handleComputeContract">计算收益</button>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="table-wrapper_content">
            <div class="title-label">
                <h2>预计回本周期: {{cycle}}天</h2>
            </div>
            <div class="table-box">
                <table-box :items="resultData">
                    <template>
                        <tr slot="cols">
                            <th>周期</th>
                            <th>产出</th>
                            <th>管理费</th>
                            <th>电费</th>
                            <th>净收益</th>
                        </tr>
                    </template>
                    <template slot="item" slot-scope="props">
                        <tr>
                            <td>
                                {{ props.item.type}}
                            </td>
                            <td>
                                {{ props.item.btc_per_day_unit}}(${{props.item.usd_per_day_unit}})
                            </td>
                            <td>
                                {{ props.item.btc_service_fee_per_day_unit }}(${{props.item.usd_power_fee_per_day_unit}})
                            </td>
                            <td>
                                {{ props.item.btc_power_fee_per_day_unit }}(${{props.item.usd_service_fee_per_day_unit}})
                            </td>
                            <td>
                                {{ props.item.benefit }}(${{props.item.usd_benefit}})
                            </td>
                        </tr>
                    </template>
                </table-box>
            </div>
        </div>
        </section>
    </div>
</template>
<script>
import waves from "@/directive/waves"
import Select from '@/components/Common/Select'
import {
    requestDiffculty,
    requestDCIncome,
    requestContractDetail,
    requestContractIncome
} from "@/api"
const list_of_dc = [{
        key: 1,
        text: 'BTC'
    },
    {
        key: 2,
        text: 'LTC'
    }
]
const list_of_unit = {
    btc: ['TH/s', 'PH/s'],
    ltc: ['MH/s', 'GH/s']
}
const list_of_power = {
    'TH/s': 1,
    'PH/s': 1000,
    'GH/s': 1 / 1000,
    'MH/s': 1 / 1000 / 1000
}
const unit_of_contract = [{
        key: 1,
        text: 'TH/s'
    },
    {
        key: 2,
        text: 'MH/s'
    }
]
export default {
    name: 'Benefit',
    components: {
        Select
    },
    metaInfo() {
        return {
            title: '收益计算器-算力多云算力投资平台', // set a title
            meta: [
                {                 // set meta
                    name: 'keywords',
                    content: this.pageKeyWord
                },
                {                 // set meta
                    name: 'description',
                    content: this.pageDesc
                }
            ]
        }
    },
    directives: {
        waves
    },
    data() {
        return {
            pageTitle: '收益计算器-算力多云算力投资平台',
            pageKeyWord: '云算力,算力,矿机,云算力租赁,云算力出租,云算力租用,算力租赁,算力出租,算力租用,矿机托管,矿机出租,矿机租赁,矿机租用',
            pageDesc: '算力多是目前全球领先的比特币挖矿、莱特币云挖矿算力投资平台之一。致力于提供算力租赁,云算力出租,云算力租用,算力租赁,算力出租,算力租用,矿机托管,矿机出租,矿机租赁,矿机租用等服务的云算力投资平台。',
            unitAmount: '',
            defaultDcSelected: 'BTC',
            defaultContactSelected: '',
            defaultUnitSelected: 'TH/s',
            list_of_dc,
            unit_of_contract,
            unit: [],
            msg: '效益',
            resultData: [],
            diffculty: null,
            power: null,
            income: [],
            symbol: 'BTC',
            per_unit: 'TH/s',
            result: 0,
            contracts: [],
            contract_id: 0,
            contract_power: 0,
            contract_unit: 'TH/s',
            list_of_price: {},
            cycle: 0
        }
    },
    computed: {},
    created() {
        this.fetDatas()
        for (var index in list_of_unit.btc) {
            const unit_select = {
                key: index,
                text: list_of_unit.btc[index]
            }
            this.unit.push(unit_select)
        }
    },
    methods: {
        myRound(v, e) {
            var t = 1;
            for (; e > 0; t *= 10, e--);
            for (; e < 0; t /= 10, e++);
            return Math.round(v * t) / t;
        },
        fetDatas() {
            this.fetchDiffculty('BTC')
            const self = this
            requestContractDetail().then(res => {
                // console.log(res)
                const { data } = res
                for (var index in data) {
                    let contract = {}
                    let id = data[index].id
                    contract.key = id
                    contract.text = data[index].machine_model
                    this.list_of_price[id] = data[index].price_btc
                    this.contracts.push(contract)
                }
                // console.log(this.contracts)
                // console.log(this.list_of_price)
                this.defaultContactSelected = this.contracts[0].text
                this.contract_id = this.contracts[0].key
            })

        },
        fetchDiffculty(symbol) {
            requestDiffculty({ symbol: symbol }).then(res => {
                const { diffculty } = res
                this.diffculty = diffculty
            })
        },
        handleComputeDcIncome() {
            requestDCIncome({
                symbol: this.symbol
            }).then(res => {
                var power = 0
                power = this.power * list_of_power[this.per_unit]
                this.result = this.toFixed(power * res.btc_per_day_unit, 8) + ' ' + this.symbol.toUpperCase() + '/天'
            })
        },
        handleComputeContract() {
            // console.log(this.contract_id)
            requestContractIncome({
                contract_id: this.contract_id
            }).then(res => {
                var per_benefit = res.btc_per_day_unit - res.btc_power_fee_per_day_unit - res.btc_service_fee_per_day_unit
                this.cycle = Math.round(this.list_of_price[this.contract_id] / per_benefit)
                var power = 0
                power = this.unitAmount * list_of_power[this.contract_unit]
                var result = power * per_benefit
                let usd_benefit = power * (res.usd_per_day_unit - res.usd_power_fee_per_day_unit - res.usd_service_fee_per_day_unit)

                let tmp = []
                let dayObj = {}
                for (var index in res) {
                    dayObj[index] = this.myRound(power * res[index], 8);
                }
                dayObj.type = '日收益'
                dayObj.benefit = this.myRound(result, 8)
                dayObj.usd_benefit = this.myRound(usd_benefit, 8)
                tmp.push(dayObj)

                let monthObj = {}
                for (var index in res) {
                    monthObj[index] = this.myRound(power * res[index] * 30, 8);
                }
                monthObj.type = '月收益'
                monthObj.benefit = this.myRound(result * 30, 8)
                monthObj.usd_benefit = this.myRound(usd_benefit * 30, 8)
                tmp.push(monthObj)

                let yearObj = {}
                for (var index in res) {
                    yearObj[index] = this.myRound(power * res[index] * 365, 8);
                }
                yearObj.type = '年收益'
                yearObj.benefit = this.myRound(result * 365, 8)
                yearObj.usd_benefit = this.myRound(usd_benefit * 365, 8)
                tmp.push(yearObj)

                // console.log(tmp);
                this.resultData = tmp

            })
        },
        handleSelectDc(data) {
            let symbol = data.text.toLowerCase();
            this.symbol = symbol
            this.fetchDiffculty(symbol)
            let unit = []
            for (var index in list_of_unit[symbol]) {
                const unit_select = {
                    key: index,
                    text: list_of_unit[symbol][index]
                }
                unit.push(unit_select)
            }
            this.unit = unit
        },
        handleSelectContract(data) {
            this.contract_id = data.key
        },
        handleSelectUnit(data) {
            this.per_unit = data.text
        },
        handleSelectContractUnit(data) {
            this.contract_unit = data.text
        },
        handleSelectContractPower(data) {
            this.contract_power = data.text
        }
    }
}
</script>
<style lang="scss">
@import '../../assets/style/benefit.scss';
</style>
