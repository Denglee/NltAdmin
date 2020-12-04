import enLocale from 'element-ui/lib/locale/lang/en'
const language_en = {
    login: {
        username: 'English',
        password: 'password',
        signin: 'signin',
        
        btn:'Login',
        title:'Welcome to login',
    },

    /*按钮*/
    btn:{
        refresh:'REFRESH',
        search:'Search',
        add:'ADD',
        back:'BACK',
        addAuth:'addAuth',
    },

    /*通用*/
    public:{
        yes:'Yes',
        no:'No.',
        operation:'Operation',

        edit:'Edit',

        startTime:'Start Time',
        endTime:'End Time',

        noData:'No Data',
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
        'index':'home',

        'admin/auth/auth':'Admin Auth',
        'admin/auth/group':'Auth Group',
        'admin/auth/role':'Auth Role',
        'admin/user':'Admin User',

        'locker/list':'Locker List',
        'locker/compartments':'Compartments',      /*柜机格口*/

        'order/list':'Order List',  /*全部订单列表*/
        'order/reserve':'Reservation & Booking',  /*预定订单列表*/
        'order/expired':'Expired & Retrieved',  /*到期订单列表*/

        'ads/info':'ADS',   /*广告*/

        'report/order':'Report',   /*报表*/

        'message/SMS':'Message SMS',

        'system/logs':'System Logs',
    },

    /*柜机列表*/
    locker:{
        today:'today',
        last7d:'7d',
        last30d:'30d',
        last90d:'90d',

        btnAdd:'ADD',
        title:"Locker Station List",

        dev_no:"Device Label",
        company:"Company",
        location:"Location",
        postal_code:"Postal Code",
        serial_no:"Serial No.",

        transaction:'Transaction',
        recipient_phone:'Phone',
        tracking_no:'Tracking No.',
    },

    /*广告*/
    ads:{
        title:'ADS',
    },

    /*报表*/
    report:{
        title:'Report',
    },


    /*日志*/
    logs:{
        title:'Logs',
    },

    order:{
        transaction:'Transaction',
        recipient_phone:'Recipient Phone',
        tracking_no:'Tracking No.',
        statusName:'Status',
        status:{
            AllStates:'All States',
            Created:'Created',
            Reserved:'Reserved',
            Delivered:'Delivered',
            TimedOut:'Timed Out',
            Cancelled:'Cancelled',
            Recovered:'Recovered',
            Pieced:'Pieced',
            HasPassed:'HasPassed',
            DeliveryFailed:'Delivery Failed',
            RecycleFailed:'Recycle Failed',
            Reserve:'Reserve',
        },

    },

    tagNav:{
        lockerList:'Locker Station',
        AuthIndex:'Authority  management',

    },

    ...enLocale
}
export default language_en;