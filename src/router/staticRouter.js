const Layout = () => import(/* webpackChunkName: "Layout" */ '@/components/layout/Layout')

// Cabinet 柜机
// manageConsumer 用户管理 consumer
// courier 快递员
// courierCompany 快递公司
// courierNum 快递单号

const staticRoute = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/index',
        component: Layout,
        children: [
            {
                path: '',
                name:'index',
                component: () => import(/* webpackChunkName: "index" */ '@/views/Login/home'),
                meta: {title: 'index'}
            },
        ]
    },
    {
        path: '/',
        component: Layout,
        children:[
            /* 1、 柜机 管理 */
            {
                // path: 'locker/list',  //柜机列表
                path: 'locker/list',
                name: 'lockerList',
                component: () => import(/* webpackChunkName: "lockerList" */ '@/views/Locker/lockerList'),
                meta: {title: 'locker/list',keepAlive: true},
            },
            {
                path: 'locker/compartments', //柜机格口
                name: 'lockerCompart',
                component: () => import(/* webpackChunkName: "lockerCompart" */ '@/views/Locker/lockerCompart'),
                meta: {title: 'locker/compartments',keepAlive: true},
            },


            /* 2、 快递单管理*/
            {
                path: 'order/list',
                name: 'orderList',
                component: () => import(/* webpackChunkName: "orderList" */ '@/views/Order/orderList'),
                meta: {title: 'order/list',keepAlive: true},
            },
            {
                path: 'order/reserve',
                name: 'orderReserve',
                component: () => import(/* webpackChunkName: "orderReserve" */ '@/views/Order/orderReserve'),
                meta: {title: 'order/reserve',keepAlive: true},
            },
            {
                path: 'order/expired',
                name: 'orderExpired',
                component: () => import(/* webpackChunkName: "orderExpired" */ '@/views/Order/orderExpired'),
                meta: {title: 'order/expired',keepAlive: true},
            },


            /*3、 短信 */
            {
                path: 'message/SMS',
                name: 'messageSMS',
                component: () => import(/* webpackChunkName: "messageSMS" */ '@/views/Message/SMS'),
                meta: {title: 'message/SMS',keepAlive: true},
            },


            /* 4、 报表 */
           /* {
                path: 'reports/index',
                name: 'reportsIndex',
                component: () => import(/!* webpackChunkName: "reportsIndex" *!/ '@/views/Reports/reportsIndex'),
                meta: {title: 'reports/index',keepAlive: true},
            },*/
            {
                path: 'report/order',
                name: 'reportOrder',
                component: () => import(/* webpackChunkName: "reportOrder" */ '@/views/Reports/reportOrder'),
                meta: {title: 'report/order',keepAlive: true},
            },


            /* 5、 广告投放 */
            /*{
                path: 'admin/ads',
                name: 'adsIndex',
                component: () => import(/!* webpackChunkName: "reportsIndex" *!/ '@/views/Ads/adsIndex'),
                meta: {title: 'admin/ads',keepAlive: true},
            },*/
            {
                path: 'ads/info',
                name: 'adsInfo',
                component: () => import(/* webpackChunkName: "reportsIndex" */ '@/views/Ads/adsInfo'),
                meta: {title: 'ads/info',keepAlive: true},
            },


            /* 6、 系统管理 */
            {
                path: 'system/logs',
                name: 'systemLogs',
                component: () => import(/* webpackChunkName: "systemLogs" */ '@/views/System/systemLogs'),
                meta: {title: 'system/logs',keepAlive: true},
            },


            /*  7、用户管理*/
            {
                path: 'admin/auth/auth',  //基础权限管理
                name: 'AuthIndex',
                component: () => import(/* webpackChunkName: "Authindex" */ '@/views/User/AuthIndex'),
                meta: {title: "admin/auth/auth"},
            },
            {
                path: 'admin/auth/role',
                name: 'AuthRole',
                component: () => import(/* webpackChunkName: "Userindex" */ '@/views/User/AuthRole'),
                meta: {title: "admin/auth/role",},
            },
            {
                path: 'admin/auth/group',
                name: 'AuthGroup',
                component: () => import(/* webpackChunkName: "Groupindex" */ '@/views/User/AuthGroup'),
                meta: {title: "admin/auth/group",},
            },
            {
                path: 'admin/user',
                name: 'adminUser',
                component: () => import(/* webpackChunkName: "adminUser" */ '@/views/User/adminUser'),
                meta: {title: "admin/user"},
            },

        ],
    },


    {
        name: 'Error',
        path: '/error',
        component: () => import( /* webpackChunkName: "error" */ '@/views/Error'),
        children: [
            {
                path: '401',
                component: () => import(/* webpackChunkName: "401" */ '@/views/Error/401'),
            },
            {
                path: '403',
                component: () => import(/* webpackChunkName: "403" */ '@/views/Error/403'),
            },
            {
                path: '404',
                component: () => import(/* webpackChunkName: "404" */ '@/views/Error/404'),
            },
            {
                path: '500',
                component: () => import(/* webpackChunkName: "500" */ '@/views/Error/500'),
            }
        ]
    },
    // {
    //     name: 'redirect',  //空白页面
    //     path: '/redirect',
    //     component: () => import(/* webpackChunkName: "redirect" */ '@/components/redirect/redirect'),
    // },
    {
        name: 'login',  //登录
        path: '/login',
        // component: () => import(/* webpackChunkName: "Login" */ '@/views/Login/Login')
        component: () => import(/* webpackChunkName: "Login" */ '@/views/Login/LoginSys'),
    },
    // {
    //     name: 'register', //注册
    //     path: '/register',
    //     component: () => import(/* webpackChunkName: "Register" */ '@/views/Login/Register'),
    // },
    {
        name: '*',
        path: '*',
        redirect: '/error/404'
    }

];

export default staticRoute



