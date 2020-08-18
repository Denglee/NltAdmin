<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->
        <div class="btnNav-contain">
            <navRefush :btnBack="btnLoad.btnBack" class="btnNav-left"></navRefush>
            <ul>
                <li class="btnNav-flex btnNav-vip">
                    <button class="btnNav-box" v-for="(item,index) in btnAuth" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                        <i class="iconfont" :class="item.iconClass"></i>
                        <span>{{item.name}}</span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="bgWhite-public">

            <header class="index-item-title">用户</header>
            <div class="bgWhite-padd20">
                <el-table class="pub-table edit-table" :data="userTable" border>
                    <el-table-column prop="id" label="id" width="50px"></el-table-column>
                    <el-table-column prop="name" label="昵称"></el-table-column>
                    <el-table-column prop="username" label="用户名"></el-table-column>
                    <el-table-column prop="phone" label="手机号码"></el-table-column>
                    <el-table-column prop="role_name" label="所属角色"></el-table-column>
                    <el-table-column prop="status_txt" label="状态"></el-table-column>
                    <el-table-column prop="last_ip" label="最后登录ip"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间"></el-table-column>
                    <!--<el-table-column prop="is_default" label="是否默认">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status_txt == 0 " class="auth-isShow0">否</div>
                            <div v-if="scope.row.status_txt == 1 " class="auth-isShow1">是</div>
                        </template>
                    </el-table-column>-->
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" class="btn-noBor" @click="btnChangePass(scope.$index, scope.row)">修改密码</el-button>
                            <el-button size="mini" class="btn-noBor" @click="btnChangeAuth(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!--tab1  添加弹窗-->
        <el-dialog  :append-to-body="true" title="添加用户"  :visible.sync="showState.diaAdd" width="600px" >
            <el-form :model="addRolePar" class="dia-form"  label-width="120px" ref="addForm" :rules="addRoleRules">
                <el-form-item label="用户名" prop="username" :rules="{ required: true, message: '用户名不能为空', trigger: 'blur' }">
                    <el-input v-model="addRolePar.username" clearable placeholder="用户名" class="dia-inp" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addRolePar.password" required show-password clearable placeholder="密码" class="dia-inp" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkedPassword">
                    <el-input v-model="addRolePar.checkedPassword" required show-password clearable placeholder="确认密码" class="dia-inp" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属角色"  prop="role_id"  :rules="{ required: true, message: '所属角色不能为空', trigger: 'change' }">
                    <el-select filterable v-model="addRolePar.role_id"  class="dia-inp">
                        <el-option v-for="item in roleTable" :key="item.index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showState.diaAdd = false" plain>取 消</el-button>
                <el-button type="primary" @click="sureAddDiaRole('addForm')" :loading="btnLoad.btnSureAdd">确 定</el-button>
            </div>
        </el-dialog>

        <!--更换 密码 弹出-->
        <el-dialog  :append-to-body="true" title="密码更换" :visible.sync="showState.diaChangePass" custom-class="passAlert"
                    width="600px" :destroy-on-close ='true'>
            <changePass :changePassVal = "changePassVal"></changePass>
        </el-dialog>
    </div>
</template>

<script>
    import {getUserListApi, getRoleApi,registerUserApi} from "../../assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    import changePass from "../User/groupMember/changePass";
    export default {
        inject:['reLoad'],
        name: "adminUser",
        data() {
            /*新密码验证规则*/
            let validateNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else if(value.length <= 5){
                    callback(new Error('密码不能少于6位数'));
                }  else {
                    callback();
                }
            };

            /*确认密码验证规则*/
            let validateCheckPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if(value.length <= 5){
                    callback(new Error('密码不能少于6位数'));
                } else if (value !== this.addRolePar.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                /*修改密码 form  changeRules 对应 :rules*/
                addRoleRules: {
                    password: [
                        { validator: validateNewPass, trigger: 'blur' }
                    ],
                    checkedPassword: [  //确认密码
                        { validator: validateCheckPass, trigger: 'blur' }
                    ],
                },

                btnLoad: {
                    btnBack:false,
                    btnSureAddAuth:false,
                },

                // 导航操作按钮组
                btnAuth:[
                    { name:"添加用户", type:'if',  iconClass:'iconxinzengyonghu',  methodsName:'FnDiaAddRole' ,pageName:'addAuth'},
                ],

                //  显隐状态
                showState:{
                    diaAdd:false,  //添加用户弹窗

                    diaChangePass:false,// 修改密码 弹窗 显隐状态
                },

                // 添加用户 params
                addRolePar:{
                    username:'',
                    role_id:'',
                    password:'',
                    checkedPassword:'',
                },

                userTable:[], // 用户列表 table
                roleTable:[], // 角色列表 table

                changePassVal:{}, //更新密码 弹窗传值
            }
        },
        methods: {
            //a1 、 获取用户列表 api
            FnGetUserListApi(){
                getUserListApi().then(res=>{
                    console.log(res);
                    this.userTable =res.data;
                }).catch(res=>{
                  console.log(res);
                })
            },

            // a2 获取角色权限 api
            FnGetRoleApi(){
                getRoleApi().then(res=>{
                    console.log(res);
                    this.roleTable = res.data.role;
                }).catch(res=>{
                    console.log(res);
                })
            },

            //A1 添加角色 事件
            btnMethods(methodsName){
                if(methodsName == 'FnDiaAddRole'){
                    console.log('添加事件');
                    // this.addRolePar.name = '';
                    // this.diaArr.type = 'add';
                    this.showState.diaAdd = true;
                }
            },

            /* 编辑 事件 */
            btnChangeAuth(index,val){
                console.log(val);
                // this.showState.diaAdd = true;
                // this.authParams= val;   //单列 赋值 修改
                // this.diaInfoArr.diaType = 'edit';
            },

            //A2 添加弹窗确定
            sureAddDiaRole(formName){
                this.$refs[formName].validate((valid) => {
                    this.GLOBAL.btnStateChange(this,'btnLoad','btnSureAdd');
                    console.log(this.addRolePar);
                    if (valid) {
                        console.log(this.addRolePar);
                        registerUserApi(this.addRolePar).then(res=>{
                            console.log(res);
                            this.GLOBAL.axiosCallback(res,this);
                        }).catch(res=> {
                            console.log(res);
                        })

                        /*let type = this.diaArr.type;
                        if(type == 'add'){
                            this.FnAddPromiseRole();
                        }else{
                            this.FnUpdatePromiseRole();
                        }*/
                    }
                })
            },

            /* 密码修改 按钮事件*/
            btnChangePass(index,val){
                console.log(val);
                this.changePassVal =  val;
                this.showState.diaChangePass = true;
            },

        },
        created() {
            // 调用 获取用户列表 接口
            this.FnGetUserListApi();

            // 调用 角色 接口
            this.FnGetRoleApi();
        },
        components:{
            navRefush,

            changePass,
        }
    }
</script>
