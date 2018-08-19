// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'

import App from './App'
import router from './router'

import VueClipboard from 'vue-clipboard2'


// 全局组件
import Loading from '@/components/Common/LoadingModal'
import Pagination from '@/components/Common/Pagination'
import TableBox from '@/components/Common/TableBox'
import Dialog from '@/components/Common/Dialog'
import Confirm from '@/components/Common/Confirm'

// SEO插件
import MetaInfo from 'vue-meta-info'


Vue.use(MetaInfo)

import Toast from '@/components/Common/Toast/toast'
import Alert from '@/components/Common/Alert/alert'

import './assets/style/index.scss'

import store from '@/store'
import * as filters from './filters' // 全局filter
import './permission' // 路由拦截


// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

// register component ass gloabl component
router.afterEach((to, from, next) => {
    document.body.scrollTop = 0;
});


Vue.use(Toast)
Vue.use(Alert)

Vue.use(VueClipboard)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

// 全局组件Loading
Vue.component('Loading', Loading)
Vue.component('Pagination', Pagination)
Vue.component('TableBox', TableBox)
Vue.component('Dialog', Dialog)
Vue.component('Confirm', Confirm)

//全局函数
Vue.prototype.strip = function(num, precision = 12) {
    return +parseFloat(num.toPrecision(precision))
}

Vue.prototype.filterTime = function(type) {
    let start_time = ''
    let today = new Date()
    let date2 = new Date(today)
    switch(type) {
        case 'seven':
            date2.setDate(today.getDate()-7);
            start_time = this.formatDate(date2.getTime())
            break
        case 'month':
            date2.setMonth(today.getMonth() - 1)
            start_time = this.formatDate(date2.getTime())
            break
        case 'week':
            date2.setDate(today.getDate() - today.getDay() + 1)
            start_time = this.formatDate(date2.getTime())
            break
    }
    return start_time;
}

Vue.prototype.formatDate = function formatDate(time,format='YY-MM-DD hh:mm:ss'){
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth()+1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var preArr = Array.apply(null,Array(10)).map(function(elem, index) {
        return '0'+index;
    });////开个长度为10的数组 格式为 00 01 02 03

    var newTime = format.replace(/YY/g,year)
                        .replace(/MM/g,preArr[month]||month)
                        .replace(/DD/g,preArr[day]||day)
                        .replace(/hh/g,preArr[hour]||hour)
                        .replace(/mm/g,preArr[min]||min)
                        .replace(/ss/g,preArr[sec]||sec);

    return newTime;
}

Vue.prototype.toFixed = function (oriNumber,n) {
    if (n > 20 || n < 0) {
        throw new RangeError('toFixed() digits argument must be between 0 and 20');
    }
    const number = oriNumber;
    if (isNaN(number) || number >= Math.pow(10, 21)) {
        return number.toString();
    }
    if (typeof (n) == 'undefined' || n == 0) {
        return (Math.round(number)).toString();
    }

    let result = number.toString();
    const arr = result.split('.');

    // 整数的情况
    if (arr.length < 2) {
        result += '.';
        for (let i = 0; i < n; i += 1) {
            result += '0';
        }
        return result;
    }

    const integer = arr[0];
    const decimal = arr[1];
    if (decimal.length == n) {
        return result;
    }
    if (decimal.length < n) {
        for (let i = 0; i < n - decimal.length; i += 1) {
            result += '0';
        }
        return result;
    }
    result = integer + '.' + decimal.substr(0, n);
    const last = decimal.substr(n, 1);

    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
    if (parseInt(last, 10) >= 5) {
        const x = Math.pow(10, n);
        result = (Math.round((parseFloat(result) * x)) + 1) / x;
        result = result.toFixed(n);
    }

    return result;
}
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
    // render: h => h(App),

    // /* 这句非常重要，否则预渲染将不会启动 */
    // mounted() {
    //     document.dispatchEvent(new Event('render-event'))
    // }
})
