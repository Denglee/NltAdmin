import enLocale from 'element-ui/lib/locale/lang/en'
const language_en = {
    login: {
        username: 'English',
        password: 'password',
        signin: 'signin',

    },

    /*按钮*/
    btn:{
        refresh:'REFRESH',
        add:'ADD',
        back:'BACK',
        addAuth:'addAuth',
    },

    /*通用*/
    public:{
        yes:'yes',
        no:'no',
        operation:'operation',
    },

    /*基础权限*/
    authIndex:{
        diaIsShow:'diaIsShow',
        authTable:{
            name:'name',
            value:'value',
            is_default:'isDefault',
            is_menu:'isMenu',
            is_check:'isCheck',
            is_show:'isShow',
        },
    },

    /*柜机列表*/
    locker:{
        today:'today',
        last7d:'7d',
        last30d:'30d',

        btnAdd:'ADD',
        title:"Locker Station List",

        dev_no:"Device Label",
        location:"Location",
        postal_code:"Postal Code",
        serial_no:"Serial No.",



        transaction:'transaction',
        recipient_phone:'phone',
        tracking_no:'trackingNo',
    },

    /*一级菜单*/
    navFirst:{
        'admin/auth':'Permission',
        'admin/locker':'Locker Station',
        'admin/order':'Order',
        'admin/message':'Messaging',
        'admin/ads':'Ads',
        'admin/reports':'Report',
        'admin/system':'Preferences',
    },

    /*二级菜单*/
    navSecond:{
        'admin/auth/auth':'adminAuth',
        'admin/auth/group':'authGroup',
        'admin/auth/role':'authRole',
        'admin/user':'adminUser',

        'locker/index':'lockerIndex',

        'order/list':'orderList',

        'message/SMS':'messageSMS',

        'system/logs':'systemLogs',
    },

    tagNav:{
        lockerList:'Locker Station',
        AuthIndex:'jichuquanxianguanli',

    },

    ...enLocale
}
export default language_en;