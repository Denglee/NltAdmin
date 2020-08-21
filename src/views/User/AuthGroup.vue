<template>
    <div class="layoutR-contain animated fadeIn">

        <div v-show="showState.showGroupIndex">

            <div class="btnNav-contain">
                <navRefush :btnBack="btnLoad.btnBack" class="btnNav-left"></navRefush>
                <ul>
                    <li class="btnNav-flex btnNav-vip">
                        <button class="btnNav-box" v-for="(item,index) in btnVip" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                            <i class="iconfont" :class="item.iconClass"></i>
                            <span>{{item.name}}</span>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="bgWhite-public">
                <header class="index-item-title">权限组</header>
                <div class="bgWhite-padd20">

                    <!--表格-->
                    <el-table class="pub-table edit-table" :data="promiseGroupArr" border
                              @selection-change="checkedStaff"
                              ref="multipleTable"
                              @row-click="handleRowClick">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column type="index" label="序号" width="50px"></el-table-column>
                        <el-table-column prop="id" label="ID"></el-table-column>
                        <el-table-column prop="name" label="分组名称" ></el-table-column>
                        <el-table-column prop="username" label="组管理员" ></el-table-column>

                        <el-table-column :label="$t('public.operation')" width="400" min-width="300">
                            <template slot-scope="scope">
                                <el-button size="mini" class="btn-noBor" @click="btnChangePass(scope.$index, scope.row)">组管理员密码修改</el-button>
                                <el-button size="mini" class="btn-noBor" @click="FnEditGroup(scope.$index, scope.row)">权限组编辑</el-button>
                                <el-button size="mini" class="btn-noBor" @click="btnGroupRole(scope.$index, scope.row)">角色管理</el-button>
                            </template>
                         </el-table-column>
                    </el-table>

                </div>
            </div>
        </div>

        <!--tab2 分组名称 添加 弹窗-->
        <el-dialog  :append-to-body="true" title="添加权限组" :visible.sync="showState.diaGroup" custom-class="passAlert" width="600px">
            <addGroupForm></addGroupForm>
        </el-dialog>

        <!--菜单权限-->
        <el-dialog  :append-to-body="true" title="权限组设置" :visible.sync="showState.diaPower" custom-class="passAlert" >
            <groupMenu  ref="childGroupMenu" :idsGroupMenu="idsGroupMenu"></groupMenu>
        </el-dialog>

        <!--更换 密码 弹出-->
        <el-dialog  :append-to-body="true" title="组管理员密码修改" :visible.sync="showState.diaChangePass" custom-class="passAlert" width="600px">
            <changePass :changePassVal = "changePassVal"></changePass>
        </el-dialog>

        <!--更新 权限组 弹出 -->
        <el-dialog  :append-to-body="true" title="权限组编辑" :visible.sync="showState.diaEditGroup" custom-class="passAlert" width="600px">
            <el-form :model="editGroupArr" class="dia-form" label-width="120px" ref="addForm">
                <el-form-item label="分组名称" prop="name"  :rules="{ required: true, message: '用户名不能为空', trigger: 'blur' }">
                    <el-input v-model="editGroupArr.name" clearable placeholder="分组名称" class="dia-inp" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer-toRight">
                <el-button type="primary" @click="sureDiaEditGroup('addForm')" :loading="btnLoad.btnEditSureGroup">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { getGroupApi,updateGroupApi} from '../../assets/js/api'
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */

    import groupMenu from './authGroup/groupMenu';
    import addGroupForm from "./authGroup/addGroupForm";
    import changePass from "./groupMember/changePass";

    export default {
        inject:['reLoad'],
        name: "AuthGroup",   //权限组 所有权限 。

        data() {
            /*新密码验证规则*/
            let validateNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('新密码不能为空'));
                } else if(value.length<=5){
                    callback(new Error('密码不能少于6位数'));
                }  else {
                    callback();
                }
            };
            /*确认密码验证规则*/
            let validateCheckPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if(value.length<=5){
                    callback(new Error('密码不能少于6位数'));
                } else if (value !== this.changePassForm.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                checkedRows: [],  //选中的值

                //  显隐状态
                showState:{
                    showGroupIndex:true,  //权限组管理

                    diaGroup:false,  //添加组  弹窗 显隐状态

                    diaPower:false,   //权限  弹窗 显隐状态

                    diaChangePass:false,// 修改密码 弹窗 显隐状态

                    diaEditGroup:false,// 编辑组 弹窗 显隐状态
                },

                // 按钮点击状态
                btnLoad:{
                    btnBack:false,  //返回按钮是否显示
                    btnEditSureGroup:false,
                },

                // 导航操作按钮组
                btnVip:[
                    { name:"权限设置", type:'if',  iconClass:'iconxinzengyonghu',  methodsName:'btnSetPower' ,pageName:'btnSetPower'},
                    { name:"添加权限组", type:'if',  iconClass:'iconxinzengyonghu',  methodsName:'editDiaGroup' ,pageName:'editDiaGroup'},
                ],

                promiseGroupArr:[], // 权限组 表格 数组

                editGroupArr:[], //更新 组 form数据

                idsGroupMenu:[],  //更新权限组id
                changePassVal:{}, //更新密码 弹窗传值
            }
        },
        methods: {
            /* 1.10、 编辑选中 */
            checkedStaff(val) {
                this.checkedRows = val;
            },
            //点击行触发，选中或不选中复选框
            handleRowClick(row, column, event){
                this.$refs.multipleTable.toggleRowSelection(row);
            },


            /* api3 - 获取所有权限组*/
            FnGetAllPromiseGroup(){
                getGroupApi().then(res=>{
                    console.log(res);
                    this.promiseGroupArr = res.data;
                }).catch(res=>{
                    console.log(res);
                })
            },

            /* 导航 按钮 点击事件 */
            btnMethods(methodsName){
                if(methodsName == 'editDiaGroup'){//组 权限添加 点击弹窗事件
                    this.showState.diaGroup = true;
                }
                if(methodsName == 'btnSetPower'){  //组 权限设置 点击弹窗事件
                    let checkedRows = this.checkedRows;
                    console.log(checkedRows);
                    if(checkedRows.length == 0){
                        this.$message.error('请至少选一个操作对象');
                    } else {
                        let idsGroupMenu = [];
                        checkedRows.forEach((item,index)=>{
                            idsGroupMenu.push(item.id);
                        });
                        console.log(idsGroupMenu);
                        this.idsGroupMenu = idsGroupMenu;

                        this.showState.diaPower = true;
                        this.$nextTick(()=>{
                            this.$refs.childGroupMenu.FnGetGroupAuth();
                            this.$refs.childGroupMenu.FnGetAuth();
                        });
                    }
                }
            },


            /* A 编辑、更新 组 按钮事件*/
            FnEditGroup(index,val){
                console.log(val);
                console.log(this.editGroupArr);
                this.editGroupArr= val;
                this.showState.diaEditGroup = true;
            },
            /* A 编辑、更新 组  提交*/
            sureDiaEditGroup(formName){
                let that = this;
                that.$refs[formName].validate((valid) => {
                    that.GLOBAL.btnStateChange(this,'btnLoad','btnEditSureGroup');
                    if (valid) {
                        let editPar = {
                            name:this.editGroupArr.name,
                            id:this.editGroupArr.id,
                        }
                        updateGroupApi( editPar).then(res=>{
                            console.log(res);
                            this.GLOBAL.axiosCallback(res,that);
                        }).catch(res=>{
                            this.$message.error(res);
                        })
                    }
                });
            },


            /* 密码修改 按钮事件*/
            btnChangePass(index,val){
                console.log(val);
                this.changePassVal =  val;
                this.showState.diaChangePass = true;
            },

            //G1 进入系统用户页面 角色管理
            btnGroupRole(index,val){
                console.log(val);

                this.$router.push({
                    path:'/admin/auth/role',
                    query:{
                      groupId:val.id,
                    },
                });
                sessionStorage.setItem('authGroupId',val.id);
            },

        },
        created() {
            this.FnGetAllPromiseGroup();
        },
        components:{
            navRefush,

            groupMenu,
            addGroupForm,
            changePass,
        }
    }
</script>

<style lang="scss">
    /*@import "../../assets/css";*/
</style>