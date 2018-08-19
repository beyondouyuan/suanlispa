import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'
// 使用
// component: resolve => require.ensure([], () => resolve(require('@/views/Login')), 'Login')
// 路由组件懒加载，优化首批页面加载速度

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            component: Layout,
            name: 'layout',
            hidden: false,
            children: [{
                    path: '',
                    name: 'Home',
                    title: '首页',
                    component: resolve => require.ensure([], () => resolve(require('@/views/Home')), 'Home'),
                    meta: {
                        title: '首页'
                    },
                    hidden: false
                }, {
                    path: 'presell',
                    name: 'Presell',
                    title: '合约预售',
                    component: resolve => require.ensure([], () => resolve(require('@/views/Presell')), 'Presell'),
                    meta: {
                        title: '合约预售'
                    },
                    hidden: false
                }, {
                    path: 'contract',
                    name: 'Contract',
                    title: '合约详情',
                    component: resolve => require.ensure([], () => resolve(require('@/views/Contract')), 'Contract'),
                    meta: {
                        title: '合约详情'
                    },
                    hidden: true
                },
                {
                    path: 'trading',
                    name: 'Trading',
                    title: '交易市场',
                    component: resolve => require.ensure([], () => resolve(require('@/views/Trading')), 'Trading'),
                    meta: {
                        title: '交易市场',
                        auth: true
                    },
                    hidden: false
                },
                {
                    path: 'usercenter',
                    name: 'UserCenter',
                    title: '个人中心',
                    component: resolve => require.ensure([], () => resolve(require('@/views/UserCenter')), 'UserCenter'),
                    meta: {
                        title: '个人中心'
                    },
                    hidden: true
                }, {
                    path: 'user',
                    name: 'User',
                    title: '个人中心',
                    redirect: '/user/profile',
                    component: resolve => require.ensure([], () => resolve(require('@/views/User')), 'User'),
                    meta: {
                        title: '个人中心',
                        auth: true
                    },
                    hidden: true,
                    children: [{
                        path: 'profile',
                        name: 'Profile',
                        title: '个人信息',
                        component: resolve => require.ensure([], () => resolve(require('@/views/Profile')), 'Profile'),
                        meta: {
                            title: '个人信息',
                            auth: true
                        },
                        hidden: false
                    }, {
                        path: 'setting',
                        name: 'Setting',
                        title: '安全设置',
                        component: resolve => require.ensure([], () => resolve(require('@/views/Setting')), 'Setting'),
                        meta: {
                            title: '安全设置',
                            auth: true
                        },
                        hidden: false
                    }, {
                        path: 'award',
                        name: 'Award',
                        title: '推荐奖励',
                        component: resolve => require.ensure([], () => resolve(require('@/views/Award')), 'Award'),
                        meta: {
                            title: '推荐奖励',
                            auth: true
                        },
                        hidden: false
                    }]
                }, {
                    path: 'property',
                    name: 'Property',
                    redirect: '/property/income',
                    title: '资产管理',
                    component: resolve => require.ensure([], () => resolve(require('@/views/Property')), 'Property'),
                    meta: {
                        title: '资产管理',
                        auth: true
                    },
                    hidden: true,
                    children: [{
                            path: 'income',
                            name: 'Income',
                            title: '收益查看',
                            component: resolve => require.ensure([], () => resolve(require('@/views/Income')), 'Income'),
                            meta: {
                                title: '收益查看',
                                auth: true
                            },
                            hidden: false
                        }, {
                            path: 'orders',
                            name: 'Orders',
                            title: '订单记录',
                            component: resolve => require.ensure([], () => resolve(require('@/views/Orders')), 'Orders'),
                            meta: {
                                title: '订单记录',
                                auth: true
                            },
                            hidden: false
                        },
                        {
                            path: 'charge',
                            name: 'Charge',
                            title: 'Bitcoin充值',
                            meta: {
                                title: 'Bitcoin充值',
                                auth: true
                            },
                            hidden: true,
                            component: resolve => require.ensure([], () => resolve(require('@/views/Charge')), 'Charge')
                        },
                        {
                            path: 'withdraw',
                            name: 'Withdraw',
                            title: 'Bitcoin提币',
                            meta: {
                                title: 'Bitcoin提币',
                                auth: true
                            },
                            hidden: true,
                            component: resolve => require.ensure([], () => resolve(require('@/views/Withdraw')), 'Withdraw')
                        },
                        {
                            path: 'preview',
                            name: 'Preview',
                            title: '资产总览',
                            component: resolve => require.ensure([], () => resolve(require('@/views/PropertyPreview')), 'PropertyPreview'),
                            meta: {
                                title: '资产总览',
                                auth: true
                            },
                            hidden: false
                        }
                    ]
                }, {
                    path: 'message',
                    name: 'Message',
                    redirect: '/message/pm',
                    title: '信息中心',
                    component: resolve => require.ensure([], () => resolve(require('@/views/Message')), 'Message'),
                    meta: {
                        title: '信息中心',
                        auth: true
                    },
                    hidden: true,
                    children: [{
                        path: 'pm',
                        name: 'PM',
                        title: '站内信息',
                        component: resolve => require.ensure([], () => resolve(require('@/views/PointMessage')), 'PointMessage'),
                        meta: {
                            title: '站内信息',
                            auth: true
                        },
                        hidden: false,
                    }]
                }, {
                    path: 'benefit',
                    name: 'Benefit',
                    title: '收益计算器',
                    component: resolve => require.ensure([], () => resolve(require('@/views/Benefit')), 'Benefit'),
                    meta: {
                        title: '收益计算器'
                    },
                    hidden: false
                }, {
                    path: 'news',
                    name: 'News',
                    title: '公告资讯',
                    redirect: '/news/announce',
                    component: resolve => require.ensure([], () => resolve(require('@/views/News')), 'News'),
                    meta: {
                        title: '公告资讯'
                    },
                    hidden: false,
                    children: [{
                        path: 'announce',
                        name: 'Announce',
                        title: '公告列表',
                        component: resolve => require.ensure([], () => resolve(require('@/views/Announce')), 'Announce'),
                        meta: {
                            title: '公告列表'
                        },
                        hidden: false,
                    }, {
                        path: 'information',
                        name: 'Information',
                        title: '公告列表',
                        component: resolve => require.ensure([], () => resolve(require('@/views/Information')), 'Information'),
                        meta: {
                            title: '公告列表'
                        },
                        hidden: false,
                    }]
                }, {
                    path: 'announce/:id',
                    name: 'AnnounceDetail',
                    title: '公告详情',
                    component: resolve => require.ensure([], () => resolve(require('@/views/AnnounceDetail')), 'AnnounceDetail'),
                    meta: {
                        title: '公告详情'
                    },
                    hidden: true
                }, {
                    path: 'infomation/:id',
                    name: 'newsDetail',
                    title: '资讯详情',
                    component: resolve => require.ensure([], () => resolve(require('@/views/InfomationDetail')), 'InfomationDetail'),
                    meta: {
                        title: '资讯详情'
                    },
                    hidden: true
                },
                {
                    path: 'contract/:id',
                    name: 'contractDetail',
                    title: '合约详情',
                    component: resolve => require.ensure([], () => resolve(require('@/views/ContractDetail')), 'ContractDetail'),
                    meta: {
                        title: '合约详情'
                    },
                    hidden: true
                },
                {
                    path: '/agreement',
                    name: 'Agreement',
                    title: '用户协议',
                    meta: {
                        title: '用户协议'
                    },
                    hidden: true,
                    component: resolve => require.ensure([], () => resolve(require('@/views/Agreement')), 'Agreement')
                },
                {
                    path: '/policy',
                    name: 'Policy',
                    title: '隐私政策',
                    meta: {
                        title: '隐私政策'
                    },
                    hidden: true,
                    component: resolve => require.ensure([], () => resolve(require('@/views/Policy')), 'Policy')
                },
                {
                    path: '/law',
                    name: 'Law',
                    title: '法律声明',
                    meta: {
                        title: '法律声明'
                    },
                    hidden: true,
                    component: resolve => require.ensure([], () => resolve(require('@/views/Law')), 'Law')
                },
                {
                    path: '/relief',
                    name: 'Relief',
                    title: '免责声明',
                    meta: {
                        title: '免责声明'
                    },
                    hidden: true,
                    component: resolve => require.ensure([], () => resolve(require('@/views/Relief')), 'Relief')
                },
                {
                    path: 'help',
                    name: 'Help',
                    title: '帮助中心',
                    redirect: '/help/qa',
                    component: resolve => require.ensure([], () => resolve(require('@/views/Help')), 'Help'),
                    meta: {
                        title: '帮助中心'
                    },
                    hidden: false,
                    children: [{
                            path: 'qa',
                            name: 'QA',
                            title: '常见问题',
                            component: resolve => require.ensure([], () => resolve(require('@/views/QA')), 'QA'),
                            meta: {
                                title: '常见问题'
                            },
                            hidden: false,
                        }, {
                            path: 'service',
                            name: 'Service',
                            title: '联系客服',
                            component: resolve => require.ensure([], () => resolve(require('@/views/Service')), 'Service'),
                            meta: {
                                title: '联系客服'
                            },
                            hidden: false,
                        },
                        {
                            path: 'about',
                            name: 'About',
                            title: '关于我们',
                            component: resolve => require.ensure([], () => resolve(require('@/views/About')), 'About'),
                            meta: {
                                title: '关于我们'
                            },
                            hidden: false,
                        }
                    ]
                }
            ]
        }, {
            path: '/login',
            name: 'Login',
            title: '登陆',
            meta: {
                title: '登陆'
            },
            hidden: true,
            component: resolve => require.ensure([], () => resolve(require('@/views/Login')), 'Login')
        }, {
            path: '/register',
            name: 'Register',
            title: '注册',
            meta: {
                title: '注册'
            },
            hidden: true,
            component: resolve => require.ensure([], () => resolve(require('@/views/Register')), 'Register')
        },
        {
            path: '*',
            title: '404',
            name: '404',
            meta: {
                title: '404'
            },
            hidden: true,
            component: resolve => require.ensure([], () => resolve(require('@/views/NotFound')), 'NotFound')
        }
    ]
})
