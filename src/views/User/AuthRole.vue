<template>
    <div class="layoutR-contain animated fadeIn">
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
            <header class="index-item-title">角色管理</header>
            <div class="bgWhite-padd20">

                <!--表格-->
                <el-table class="pub-table edit-table" :data="roleTable" border>
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="id" label="角色ID"></el-table-column>
                    <el-table-column prop="name" label="角色名"></el-table-column>
                    <el-table-column :label="$t('public.operation')" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" class="btn-noBor" @click="btnSetPower(scope.$index, scope.row)">角色权限设置</el-button>
                            <el-button size="mini" class="btn-noBor" @click="editGroup(scope.$index, scope.row)">角色编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--tab1  添加弹窗-->
                <el-dialog  :append-to-body="true" :title="diaArr.diaAddTitle" :visible.sync="showState.diaAdd" width="600px" >
                    <el-form :model="addRolePar" class="dia-form" :label-width="diaArr.formLabelWidth" ref="addForm">
                        <el-form-item label="角色名" prop="name" :rules="{ required: true, message: '角色名不能为空', trigger: 'blur' }">
                            <el-input v-model="addRolePar.name" placeholder="角色名" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer-toRight">
                        <el-button @click="showState.diaAdd = false" plain>取 消</el-button>
                        <el-button type="primary" @click="sureAddDiaGroup('addForm')" :loading="btnLoad.btnSureAdd">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>

        <!--菜单权限-->
        <el-dialog  :append-to-body="true" :title="diaMenuArr.diaPowerTitle" :visible.sync="diaMenuArr.diaPower" width="80%" >
            <roleMenu  ref="childGroupMenu" @closeDiaMenu ='closeDiaMenu' :propsMenuArr="propsMenuArr" :groupId="addRolePar.group_id"></roleMenu>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getRoleApi,
        addRoleApi,
        updateRoleApi,
    } from '@/assets/js/api'
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */

    import roleMenu from "./groupMember/roleMenu";
    export default {
        name: "AuthRole", //角色
        inject:['reLoad'],
        data() {
            return {

                // 按钮点击状态
                btnLoad:{
                    btnBack:false,  //返回按钮是否显示
                    search:false,   //搜索按钮点击状态
                    btnSureEdit:false,
                    btnSureAdd:false,
                },

                /*权限 弹窗 相关*/
                diaMenuArr:{
                    diaPowerTitle:'角色权限设置',
                    diaPower:false,  //权限弹窗
                },

                /*弹窗 相关*/
                diaArr:{
                    formLabelWidth:'90px',
                    diaAddTitle:'',
                    type:'',
                },

                //  显隐状态
                showState:{
                    diaAdd:false,  //添加角色弹窗
                },

                // 数据 参数
                addRolePar: {
                    name:'',
                    group_id:'',
                    id:'',
                },

                // 导航操作按钮组
                btnVip:[
                    { name:"添加角色", type:'if',  iconClass:'iconxinzengyonghu',  methodsName:'AddDiaGroup' ,pageName:'addNewMember'},
                ],

                roleTable:[],

                propsMenuArr:[],

            }
        },
        methods: {
            // 获取 所有 权限角色
            FngetRole(){
                getRoleApi({
                    group_id: this.addRolePar.group_id,
                }).then(res=>{
                    let roleTableArr = res.data.role;
                    console.log(roleTableArr);
                    this.roleTable = roleTableArr;

                }).catch(res=>{
                    console.log(res);
                })
            },

            /* api 2 : 添加 */
            FnAddPromiseRole(){
                addRoleApi(this.addRolePar).then(res=>{
                    console.log(res);
                    this.GLOBAL.axiosCallback(res,this);
                }).catch(res=>{
                    console.log(res);
                })
            },

            //A1 添加角色 事件
            btnMethods(methodsName){
                if(methodsName == 'AddDiaGroup'){
                    console.log('添加事件');
                    this.addRolePar.name = '';
                    this.diaArr.type = 'add';
                    this.showState.diaAdd = true;
                }
            },

            //A2 添加弹窗确定
            sureAddDiaGroup(formName){
                let that = this;
                that.$refs[formName].validate((valid) => {
                    this.GLOBAL.btnStateChange(this,'btnLoad','btnSureAdd');
                    if (valid) {
                        console.log(this.addRolePar);

                        let type = this.diaArr.type;
                        if(type == 'add'){
                            this.FnAddPromiseRole();
                        }else{
                            this.FnUpdatePromiseRole();
                        }
                    }
                })
            },

            /* api 3 : 修改更新  */
            FnUpdatePromiseRole(){
                updateRoleApi(this.addRolePar).then(res=>{
                    console.log(res);
                    this.GLOBAL.axiosCallback(res,this);
                }).catch(res=>{
                    console.log(res);
                })
            },

            /*编辑事件*/
            editGroup(index,val){
                console.log(val);
                this.addRolePar.id = val.id;
                this.addRolePar.name = val.name;
                this.diaArr.type = 'edit';
                this.showState.diaAdd = true;
            },

            /*B 权限 弹窗*/
            closeDiaMenu(){
                this.diaMenuArr.diaPower= false;
            },
            //A1 权限设置
            btnSetPower(index,val){
                console.log(val);
                this.propsMenuArr= val;
                this.diaMenuArr.diaPower = true;
                this.$nextTick(()=>{
                    this.$refs.childGroupMenu.FnGetRoleAuthList();
                });

            },
        },
        created() {
            let groupId = sessionStorage.getItem('authGroupId');
            console.log('query groupId' + groupId)
            if(groupId){
                this.addRolePar.group_id = groupId;
            }
            this.FngetRole();

        },

        components:{
            navRefush,

            roleMenu,
        }
    }
</script>
