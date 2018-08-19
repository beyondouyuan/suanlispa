/*
* @Author: beyondouyuan
* @Date:   2018-04-26 12:50:16
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-07-16 23:25:18
*/
const urls = {
    // 获取用户信息模块
    'login': '/api/user/login', // login 登陆
    'reg': '/api/user/reg', // reg 注册
    'logout': '/api/user/logout', // logout 登出
    'userInfo': '/api/user/info', // info 个人信息
    'security': '/api/user/security', // security 安全设置
    'msg': '/api/user/msg', // msg 站内信息
    'msgRead': '/api/user/msg/read', // msg 站内信息
    'msgReadAll': '/api/user/msg/readall', // msg 站内信息

    // 修改用户信息模块
    'modifyLoginPwd': '/api/user/modify/login', // msg 站内信息
    'modifyTradePwd': '/api/user/modify/trade_pwd', // msg 站内信息
    'modifyCellphone': '/api/user/modify/cellphone', // msg 站内信息

    'verifyRealName': '/api/user/verify/realname', // 实名认证

    // 验证码
    'applyCellphone': '/api/user/verify/cellphone', // 手机验证码
    'applyEmail': '/api/user/verify/email', // 邮箱验证码
    'modifyEmail': '/api/user/modify/email', //修改邮箱
    'applycptch': '/api/user/verify/cptch', // 图片验证码

    // 首页聚合模块
    'banner': '/api/info/banner', // Banner 展示模块
    'platform': '/api/info/platform', // platform 平台优势
    'mine': '/api/info/mine', // mine 矿场一览
    'partner': '/api/info/partner', // partner 合作伙伴
    'dc': '/api/info/dc', // dc 货币信息展示
    'exchange': '/api/info/dc/exchange', // exchange 货币价格
    'dcincome': '/api/info/dc/income', // income 单位算力收益

    // 公告资讯模块
    'news': '/api/info/news', // news 资讯列表
    'announce': '/api/info/announce', // announce 公告列表
    'adetail': '/api/info/announce/detail', // detail 公告详情
    'newsdetail': '/api/info/news/detail', // detail 资讯详情

    // 帮助中心模块
    'qa': '/api/service/problem', // problem 常见问题
    'contact': '/api/service/contact', // contact 联系客服
    'about': '/api/service/about', // about 关于我们

    // 账户收益模块
    'mrecord': '/api/contract/mining/records', // mrecord 收益记录
    'mining': '/api/contract/mining', // mining 收益查看
    'assets': '/api/account/assets', // assets 资产总览
    'record': '/api/account/assets/records', // record 流水账单
    'recharge': '/api//account/recharge', // 比特币充值
    // 奖励模块
    'award': '/api/distribution/total', // award 推荐奖励总值
    'aincome': '/api/distribution/income', // aincome 奖励记录
    'arule': '/api/distribution/rule',// arule 奖励规则
    'alist': '/api/distribution/list', // alist 推荐列表
    'acode': '/api/distribution/code', // alink 推荐邀请

    // 收益计算模块
    'profit': '/api/profit/', // profit 收益计算器
    'predit': '/api/profit/predit', // predit 收益描述

    'cdetail': '/api/contract/detail', // cdetail 合约详情

    'createOrder': '/api/contract/order', //下单接口
    'cancelOrder': '/api/contract/order/cancel', //取消订单
    'contractService': '/api/contract/service', //客服二维码

    'withdraw': '/api/account/withdraw', //提币
    'orders': '/api/contract/order/records',//获取订单列表
    'diffculty': '/api/info/dc/diffculty', //获取挖矿难度

    'contractIncome': '/api/contract/dc/income', //获取合约单位收益
    'contractDesc': '/api/contract/desc', //获取合约详情

    'websetting': '/api/info/websetting', //获取网站配置参数


    //二级市场
    'exchangePut': '/api/exchange/put', //提交委托订单
    'exchangeList': '/api/exchange/list', //提交委托订单
    'kline': '/api/exchange/klinedata', //k线图数据
    'exchangeCancel': '/api/exchange/cancel', //撤销挂单
    'exchangeDelete': '/api/exchange/delete', //删除挂单
    'newestdata': '/api/exchange/newestdata', //今日数据
    'exchangeAsset': '/api/exchange/assets',  //可用额度
    'exchangeOrderbook': '/api/exchange/orderbook', //获取订单簿数据

}
const parseAPI = api => {
    return `${urls[api]}`
}

export default parseAPI
