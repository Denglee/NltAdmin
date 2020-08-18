/*** api接口统一管理 */
import { get, post } from './axios';

/**
 *
 * @param {string} params
 * 我们定义了一个index方法
 * 这个方法有一个参数params
 * params是我们请求接口时携带的参数对象
 * 而后调用了我们封装的post方法
 * post方法的第一个参数是我们的接口地址
 * 第二个参数是topics的params参数
 * 即请求接口时携带的参数对象
 * 最后通过export导出topics。
 */

/*
A、登录 + 侧边栏
* */

export const ApiLayoutNav = params => get('admin/auth/indexMenu', params); /*获取侧边栏 nav*/
export const ApiloginIn = params => post('admin/user/login', params); /*登录*/
export const ApiloginOut = params => post('admin/user/login_out', params); /*退出*/
export const ApiChangePass = params => post('admin/user/update_password', params); /*修改密码*/
export const ApiTopSearch = params => post('admin/Member/getMemberInfo', params); /*HeaderTop 头部搜索*/

export const ApiImgUplod = params => post('/api/Test/testUplod', params); /*图片上传*/


/*权限*/
// 1、获取所有权限
export const AllPromiseApi   = params => post('admin/auth/getAuth', params);          /* 获取所有权限*/
export const AddPromiseApi   = params => post('admin/auth/addAuth', params);          /* 添加基础权限*/
export const UpdataPromiseApi   = params => post('admin/auth/updateAuth', params);          /* 更新基础权限*/

// 2、所有权限角色
export const getRoleApi   = params => post('admin/auth/getRole', params);          /* 获取所有角色*/
export const addRoleApi   = params => post('admin/auth/addRole', params);          /* 添加角色*/
export const updateRoleApi   = params => post('admin/auth/updateRole', params);          /* 更新角色*/
export const getRoleAuthListApi   = params => post('admin/auth/getRoleAuthList', params);       /* 角色 权限*/
export const updateRoleAuthApi   = params => post('admin/auth/updateRoleAuth', params);       /* 更新 角色 权限*/

// 3、所有权限组
export const getGroupApi   = params => post('admin/auth/getGroup', params);          /* 获取所有权限组*/
export const addGroupApi   = params => post('admin/auth/addGroup', params);          /*   添加权限组 */
export const updateGroupApi   = params => post('admin/auth/updateGroup', params);          /* 更新权限组*/
export const updateGroupAuthApi   = params => post('admin/auth/updateGroupAuth', params);          /* 更新权限组 权限*/


/*权限用户*/
export const getUserListApi   = params => post('/admin/user/getUserList', params);          /* 获取当前组 用户列表*/
export const updateUserInfoApi   = params => post('/admin/user/updateUserInfo', params);          /* 更新 用户 基本信息*/
export const updateUserStautsApi   = params => post('/admin/user/updateUserStauts', params);          /* 更新 用户 状态*/
export const updatePasswordApi   = params => post('/admin/user/updatePassword', params);          /* 更新 用户 密码*/
export const registerUserApi   = params => post('/admin/user/register', params);          /* 添加 用户 */

/*柜机管理*/
export const addLockerApi   = params => post('/adminapi/Locker/addLocker', params);          /*添加快递柜 */
export const updateLockerApi   = params => post('/adminapi/Locker/updateLocker', params);          /*更新快递柜 */
export const getLockerListApi   = params => post('/adminapi/locker/getLockerList', params);          /*获取快递柜列表 */
export const getUserGroupApi  = params => post('/adminapi/locker/getUserGroup', params);          /*获取用户对应企业 */
export const getUserLockerApi   = params => post('/adminapi/locker/getUserLocker', params);          /*获取用户对应设备 */
export const getLockerLabelApi   = params => post('/adminapi/locker/getLockerLabel', params);          /*获取快递柜对应抽屉 */
export const getLockerGroupApi   = params => post('/adminapi/locker/getLockerGroup', params);          /*获取快递柜对应组 */
export const getGroupUserApi   = params => post('/adminapi/locker/getGroupUser', params);          /*获取组对应用户 */
export const getCompartmentListApi   = params => post('/adminapi/locker/getCompartmentList', params);          /*获取抽屉列表 */

/*订单*/
export const getOrderListApi   = params => post('/adminapi/order/getOrderList', params);          /*获取订单列表 */
export const getLabelOrderApi   = params => post('/adminapi/order/getLabelOrder', params);          /*获取抽屉对应订单 */
export const getOrderStatusApi   = params => post('/adminapi/order/getOrderStatus', params);          /*获取订单状态 */
export const getLockerOrderCountApi   = params => post('/adminapi/order/getLockerOrderRecentCount', params);          /*快递柜最近天数订单统计 */



/* ==-- B、首页 --== */
/*1、首页数据 */
