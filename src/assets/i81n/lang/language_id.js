import idLocale from 'element-ui/lib/locale/lang/id'
const language_id = {
    login: {
        username: 'pengguna',
        password: '密码',
        signin: '登录',
    },

    /*按钮*/
    btn:{
        refresh:'刷新',
        search:'搜索',
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
        'admin/auth':'jurisdiksi',
        'admin/locker':'Daftar kabinet',
        'admin/order':'订单',
        'admin/message':'urutan',
        'admin/ads':'Mengiklan',
        'admin/reports':'formulir laporan',
        'admin/system':'Manajemen log',
    },

    navSecond:{
        'admin/auth/auth':'Manajemen peran dasar',    /*权限*/
        'admin/auth/role':'Manajemen peran',
        'admin/auth/group':'Manajemen kelompok',
        'admin/user':'Hak pengguna',

        'locker/index':'Daftar kabinet',      /*柜机*/

        'order/list':'Semua perintah',     /*订单*/

        'message/SMS':'Templat SMS',   /*短信*/

        'system/logs':'Perintah log',    /*系统管理*/
    },

    ...idLocale
}
export default language_id;