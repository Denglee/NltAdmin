import taLocale from 'element-ui/lib/locale/lang/ta'
const language_ta = {
    login: {
        username: 'பயனர்',
        password: '密码',
        signin: '登录',
    },

    /*按钮*/
    btn:{
        refresh:'刷新',
        add:'添加',
        back:'返回',
        addAuth:'添加权限',
    },

    /*柜机列表*/
    locker:{
        title:"柜机列表",
        dev_no:"柜机编号",
        location:"位置",
        postal_code:"邮政编码",
        serial_no:"序列号",
    },

    navFirst:{
        'admin/auth':'விதிமுறை',
        'admin/locker':'அமர்வு',
        'admin/order':'வரிசை',
        'admin/message':'சிறிய செய்தி',
        'admin/ads':'அறிவிப்பு',
        'admin/reports':'அறிக்கை வடிவம்',
        'admin/system':'பத்திரிகை',
    },

    navSecond:{
        'admin/auth/auth':'基础角色管理',    /*权限*/
        'admin/auth/role':'角色管理',
        'admin/auth/group':'组管理',
        'admin/user':'用户权限',

        'locker/index':'柜机列表',      /*柜机*/

        'order/list':'所有订单',     /*订单*/

        'message/SMS':'短信模板',   /*短信*/

        'system/logs':'日志订单',    /*系统管理*/
    },

    ...taLocale
}
export default language_ta;