<template>
    <div class="layoutR-contain animated fadeIn">
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

            <header class="index-item-title">权限组</header>
            <div class="bgWhite-padd20">
                <el-table class="pub-table edit-table" :data="authTable" border>
                    <el-table-column prop="id" label="ID" width="50px"></el-table-column>
                    <el-table-column prop="is_default" label="是否默认">
                        <template slot-scope="scope">
                            <div v-if="scope.row.is_default == 0 " class="auth-isShow0">否</div>
                            <div v-if="scope.row.is_default == 1 " class="auth-isShow1">是</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" class="btn-noBor" @click="btnChangeAuth(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import {getUserListApi, updateUserInfoApi,updateUserStautsApi,updatePasswordApi} from "../../assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    export default {
        name: "adminUser",
        data() {
            return {
                btnLoad: {
                    btnBack:false,
                    btnSureAddAuth:false,
                },

                // 导航操作按钮组
                btnAuth:[
                    { name:"添加权限", type:'if',  iconClass:'iconxinzengyonghu',  methodsName:'FnDiaAddAuth' ,pageName:'addAuth'},
                ],
                userTable:[],

            }
        },
        methods: {
            FnGetUserListApi(){
                getUserListApi().then(res=>{
                    console.log(res);
                    this.userTable =res.data;
                }).catch(res=>{
                    console.log(res);
                })
            },

            /* 权限 编辑 */
            btnChangeAuth(index,val){
                console.log(val);
                this.showState.diaAddAuth = true;
                this.authParams= val;   //单列 赋值 修改
                this.diaInfoArr.diaType = 'edit';
            },

        },
        created() {
            this.FnGetUserListApi();
        },
        components:{
            navRefush,
        }
    }
</script>
