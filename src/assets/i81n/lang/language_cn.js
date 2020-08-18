import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const language_cn = {
    login: {
        username: '中文（简体）',
        password: '密码',
        signin: '登录',
    },

    /*一级导航*/
    navFirst:{
        'admin/auth':'权限',
        'admin/locker':'柜机列表',
        'admin/order':'订单',
        'admin/message':'短信',
        'admin/ads':'广告投放',
        'admin/reports':'报表',
        'admin/system':'日志管理',
    },

    /*二级导航*/
    navSecond:{
        'index':'首页',

        'admin/auth/auth':'基础角色管理',    /*权限*/
        'admin/auth/role':'角色管理',
        'admin/auth/group':'组管理',
        'admin/user':'用户权限',

        'locker/index':'柜机列表',      /*柜机*/
        'locker/compartments':'柜机格口',      /*柜机格口*/

        'order/list':'所有订单',     /*订单*/

        'message/SMS':'短信模板',   /*短信*/

        'system/logs':'日志订单',    /*系统管理*/
    },

    /*按钮*/
    btn:{
        refresh:'刷新',
        search:'搜索',

        add:'添加',
        back:'返回',
        addAuth:'添加权限',
    },

    /*通用*/
    public:{
        yes:'是',
        no:'否',
        operation:'操作',
    },

    /*基础权限*/
    authIndex:{
        diaIsShow:'是否启用',
        authTable:{
            name:'规则名称',
            value:'规则标识',
            is_default:'是否默认',
            is_menu:'是否菜单',
            is_check:'是否登录',
            is_show:'状态',
        },
    },


    /*柜机列表*/
    locker:{
        today:'今天',
        last7d:'七天前',
        last30d:'30天前',

        btnAdd:'添加',
        title:"柜机列表",

        transaction:'流水号',
        recipient_phone:'电话',
        tracking_no:'订单号',


        dev_no:"柜机编号",
        location:"位置",
        postal_code:"邮政编码",
        serial_no:"序列号",
    },

    order:{
        transaction:'流水号',
        recipient_phone:'电话',
        tracking_no:'订单号',
    },



    ...zhLocale
}
export default language_cn;