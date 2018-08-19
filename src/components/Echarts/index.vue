<template>
    <section class="echart-box">
        <div class="echart-bar">
            <span v-for="(item, index) of tabList" :key="index" :class="{active: kline_type == item.kline_type}" @click="handleSwitchEchartTab(item.kline_type)">
            {{item.title}}
          </span>
        </div>
        <div class="main">
            <div id="main" style="width: 100%;height: 100%;"></div>
        </div>
    </section>
</template>
<script>
import echarts from 'echarts'
// import options from '@/utils/echart'
import { requestKLine } from '@/api'
const tabList = [{
    kline_type: 0,
    title: '15分钟'
}, {
    kline_type: 1,
    title: '1小时'
}, {
    kline_type: 2,
    title: '4小时'
}, {
    kline_type: 3,
    title: '一天'
}, {
    kline_type: 4,
    title: '一周'
}]

export default {
    name: 'Eachart',
    components: {
        echarts
    },
    props: {
        precision: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            kline_type: 0,
            tabList,
            screenWidth: document.body.clientWidth,
            timer: false,
            charts: '',
            dateArr: [],
            volumeArr: [],
            dealArr: []
        }
    },
    watch: {
        /**
         * 监听窗口尺寸
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        screenWidth(val) {
            if (!this.timer) {
                this.screenWidth = val
                this.timer = true
                const self = this
                setTimeout(function() {
                    self.charts.resize()
                    self.timer = false
                }, 400)
            }
        },
        /**
         * 监听合约类型变化并刷新Echart数据
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        precision(val) {
            this.fetchKLine()
        },
        title: function() {
            this.fetchKLine()
        }
    },
    created() {
        
    },
    mounted() {
        const self = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                self.screenWidth = window.screenWidth
            })()
        }
        console.log(this.title)
        this.fetchKLine()
    },
    methods: {
        handleSwitchEchartTab(type) {
            const self = this
            this.kline_type = type
            setTimeout(() => {
                self.fetchKLine()
            }, 300)
        },
        fetchKLine() {
            // 需要首先清空数据
            this.dealArr = []
            requestKLine({
                contract_id: this.precision,
                type: this.kline_type
            }).then(res => {
                const { list_of_kld } = res
                for (var index in list_of_kld) {
                    let obj = list_of_kld[index]
                    this.dateArr.push(obj.time)
                    let volume = parseFloat(obj.volume)
                    this.volumeArr.push(volume.toFixed(2))
                    let deal = []
                    deal[0] = obj.time
                    deal[1] = obj.open
                    deal[2] = obj.close
                    deal[3] = obj.lowest
                    deal[4] = obj.highest
                    this.dealArr.push(deal)
                }
                this.drawPie('main')
            })
        },
        drawPie(id) {
            this.charts = echarts.init(document.getElementById(id), 'macarons')
            var upColor = '#ec0000';
            var upBorderColor = '#8A0000';
            var downColor = '#00da3c';
            var downBorderColor = '#008F28';


            // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
            var data0 = splitData(this.dealArr);

            function splitData(rawData) {
                var categoryData = [];
                var values = []
                for (var i = 0; i < rawData.length; i++) {
                    categoryData.push(rawData[i].splice(0, 1)[0]);
                    values.push(rawData[i])
                }
                return {
                    categoryData: categoryData,
                    values: values
                };
            }

            function calculateMA(dayCount) {
                var result = [];
                for (var i = 0, len = data0.values.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += data0.values[i - j][1];
                    }
                    result.push(sum / dayCount);
                }
                return result;
            }



            const option = {
                baseOption: {
                    title: {
                        text: this.title + 'K线',
                        left: 0
                    },
                    // tooltip自定义
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        formatter: function(params) {
                            // alert(JSON.stringify(params))
                            // console.log(params)
                            return [
                                '' + params[0].name,
                                '开盘：' + params[0].data[1],
                                '收盘：' + params[0].data[2],
                                '最低：' + params[0].data[3],
                                '最高：' + params[0].data[4],
                                // 'MA5：' + params[1].name,
                                // 'MA10：' + params[2].name,
                                '成交量：' + params[3].value,
                            ].join('<br/>')
                        }
                    },
                    legend: {
                        data: ['日K', 'MA5', 'MA10', '成交量']
                    },
                    grid: {
                        left: '10%',
                        right: '10%',
                        bottom: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: data0.categoryData,
                        scale: true,
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        splitLine: { show: false },
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax'
                        // max: 15
                    },
                    yAxis: {

                        scale: true,
                        splitArea: {
                            show: true
                        }
                    },
                    dataZoom: [{
                            type: 'inside',
                            start: 0,
                            end: 100
                        },
                        {
                            show: true,
                            type: 'slider',
                            y: '90%',
                            start: 0,
                            end: 100
                        }
                    ],
                    series: [{
                            name: '日K',
                            type: 'candlestick',
                            data: data0.values,
                            barWidth: 20, // 柱状尺寸
                            barCateGoryGap: 20, // 柱状间距
                            itemStyle: {
                                normal: {
                                    color: upColor,
                                    color0: downColor,
                                    borderColor: upBorderColor,
                                    borderColor0: downBorderColor
                                }
                            },
                            markLine: {
                                symbol: ['a', 'b'],

                                data: [
                                    [{
                                            name: 'from lowest to highest',
                                            type: 'min',
                                            valueDim: 'lowest',
                                            symbol: 'circle',
                                            symbolSize: 10,
                                            label: {
                                                normal: { show: false },
                                                emphasis: { show: false }
                                            }
                                        },
                                        {
                                            type: 'max',
                                            valueDim: 'highest',
                                            symbol: 'circle',
                                            symbolSize: 10,
                                            label: {
                                                normal: { show: false },
                                                emphasis: { show: false }
                                            }
                                        }
                                    ],
                                    {
                                        name: 'min line on close',
                                        type: 'min',
                                        valueDim: 'close'
                                    },
                                    {
                                        name: 'max line on close',
                                        type: 'max',
                                        valueDim: 'close'
                                    }
                                ]
                            }
                        },
                        {
                            name: 'MA5',
                            type: 'line',
                            data: calculateMA(5),
                            smooth: true,
                            lineStyle: {
                                normal: { opacity: 0.5 }
                            }
                        },
                        {
                            name: 'MA10',
                            type: 'line',
                            data: calculateMA(10),
                            smooth: true,
                            lineStyle: {
                                normal: { opacity: 0.5 }
                            }
                        },
                        {
                            name: '成交量',
                            type: 'line',
                            data: this.volumeArr,
                            smooth: true,
                            lineStyle: {
                                normal: { opacity: 0.5 }
                            }
                        }

                    ]
                },
                media: [{
                    query: {
                        maxWidth: 767
                    },
                    option: {
                        legend: {
                            right: 10,
                            top: '5%',
                            orient: 'horizontal'
                        },
                        grid: {
                            left: '8%',
                            right: '5%',
                            bottom: '20%'
                        },
                        xAxis: {
                            max: 'dataMax'
                        },
                        series: [{
                            barWidth: 10, // 柱状尺寸
                            barCateGoryGap: 10, // 柱状间距
                        }]
                    }
                }]
            }
            this.charts.setOption(option)
            this.charts.resize()
        }
    }
}
</script>
