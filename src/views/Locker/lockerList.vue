<template>
    <div class="layoutR-contain animated fadeIn">
        <div class="btnNav-contain">
            <navRefush :btnBack="btnLoad.btnBack" class="btnNav-left"></navRefush>
            <ul>
                <li class="btnNav-flex btnNav-vip">
                    <button class="btnNav-box" v-for="(item,index) in btnAuth" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                        <i class="iconfont" :class="item.iconClass"></i>
                        <span>{{$t('locker.'+item.name+'')}}</span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="bgWhite-public">

            <header class="index-item-title">{{$t('locker.title')}}</header>
            <div class="bgWhite-padd20">

                <!--员工列表 筛选-->
                <div class="pt-screen">

                    <el-input :placeholder="$t('locker.dev_no')" v-model="searchForm.keyword" class="ptScreen-input" clearable></el-input>
                    <el-button icon="el-icon-search" @click="btnSeaLocker" :loading="btnLoad.searchLoad" class="btn-public">
                        {{$t('btn.search')}}</el-button>

                    <el-select  filterable v-model="searchForm.sel1" placeholder="station" class="sel-status">
                        <el-option v-for="item in lockerStatusArr" :key="item.index" :label="item.label" :value="item.name"></el-option>
                    </el-select>
                </div>

                <el-table class="pub-table edit-table" :data="lockerTable" border>
                    <el-table-column type="selection" label="index" min-width="50px"></el-table-column>
                    <el-table-column prop="id" label="ID" min-width="50px"></el-table-column>
                    <el-table-column prop="dev_no" :label="$t('locker.dev_no')" ></el-table-column>
                    <el-table-column prop="location" :label="$t('locker.location')" ></el-table-column>
                    <el-table-column prop="postal_code" :label="$t('locker.postal_code')" ></el-table-column>
                    <el-table-column prop="serial_no" :label="$t('locker.serial_no')" ></el-table-column>
                    <!--<el-table-column prop="is_default" label="是否默认">
                        <template slot-scope="scope">
                            <div v-if="scope.row.is_default == 0 " class="auth-isShow0">否</div>
                            <div v-if="scope.row.is_default == 1 " class="auth-isShow1">是</div>
                        </template>
                    </el-table-column>-->
                    <el-table-column :label="$t('public.operation')" min-width="100">
                        <template slot-scope="scope">
                            <el-menu default-active="1-1" class="edit-elMenu-compart" :collapse="true"
                                     background-color="rgba(255,255,255,0)">
                                <el-submenu index="1"  popper-class="edit-elLeftMenu">
                                    <template slot="title">
                                        <i class="iconfont iconmore-01"></i>
                                    </template>
                                    <el-menu-item index="1-1" @click.native="btnChangeLocker(scope.$index, scope.row)">编辑</el-menu-item>
                                    <el-menu-item index="1-2" @click.native="btnGetLockerLabel(scope.$index, scope.row)">查看对应抽屉</el-menu-item>
                                </el-submenu>
                            </el-menu>
                        </template>

                        <!--<template slot-scope="scope">
                            <el-button size="mini" class="btn-noBor" @click.native="btnChangeLocker(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" class="btn-noBor" @click.native="btnGetLockerLabel(scope.$index, scope.row)">查看对应抽屉</el-button>
                            <el-button size="mini" class="btn-noBor" @click.native="btnGetLockerGroup(scope.$index, scope.row)">查看组</el-button>
                            <el-button size="mini" class="btn-noBor" @click.native="btnGetGroupUser(scope.$index, scope.row)">查看组对应用户</el-button>
                            <el-button size="mini" class="btn-noBor" @click.native="btnGetUserLocker(scope.$index, scope.row)">查看用户对应柜子</el-button>
                            <el-button size="mini" class="btn-noBor" @click.native="btnGetUserGroup(scope.$index, scope.row)">查看用户对应企业</el-button>
                        </template>-->
                    </el-table-column>
                </el-table>

                <el-pagination
                        background
                        :page-sizes="[2,10, 20, 30, 40]"
                        layout="prev, pager, next, sizes,total,  jumper"
                        :total="searchForm.pageTotal"
                        @current-change="PageCurrent"
                        @size-change="PageSizeChange">
                </el-pagination>

            </div>
        </div>

        <!--tab2 分组名称 添加 弹窗-->
        <el-dialog  :append-to-body="true" :title="lockerListArr.addLockerTitle" :visible.sync="showState.diaAddShow" custom-class="passAlert" width="600px">
            <addLocker :addLockerPar="addLockerPar" :addLockerType ="lockerListArr.addLockerType" ></addLocker>
        </el-dialog>
    </div>
</template>

<script>
    import {getLockerListApi, getLockerLabelApi, getLockerGroupApi,
        getGroupUserApi,getUserLockerApi, getUserGroupApi} from "@/assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    import addLocker from "./addLocker";
    export default {
        name: "lockerList",  //柜机列表
        data() {
            return {

                btnLoad: {
                    btnBack:false,
                    btnSureAddAuth:false,

                    searchLoad:false,
                },

                /*柜机列表 相关*/
                lockerListArr:{
                    addLockerType:'1',  //1 添加 2修改
                    addLockerTitle:'添加柜机',
                },

                /*显影状态*/
                showState:{
                    diaAddShow:false,  //添加/编辑 弹窗状态
                },

                /*搜索 字段*/
                searchForm:{
                    keyword:'',
                    dev_no:'',
                    location:'',
                    postal_code:'',
                    serial_no:'',
                    page:1,
                    pageTotal:1, //总条目数
                    paginate:10,
                },

                lockerStatusArr:[
                    {id:1,label:"Status",value:'1'},
                    {id:2,label:"Status2",value:'2'},
                ],

                // 导航操作按钮组
                btnAuth:[
                    { name:"btnAdd", type:'if',  iconClass:'el-icon-circle-plus-outline',  methodsName:'FnDiaAdd' ,pageName:'addAuth'},
                ],

                /*柜子 table 数组*/
                lockerTable:[],

                /*添加/修改 表单字段*/
                addLockerPar:{
                    locker_id:'',
                    dev_no:'',
                    serial_no:'',
                    postal_code:'',
                    label:'',
                    location:'',
                    city_id:'',
                },

            }
        },
        methods: {
            /*获取列表 api*/
            FnGetLockerList(){
                getLockerListApi(this.searchForm).then(res=>{
                    console.log(res);
                    this.lockerTable = res.DATA.data;
                    this.searchForm.pageTotal = res.DATA.total;

                }).catch(res=>{
                    console.log(res);
                })
            },

            /*按钮组 点击事件*/
            btnMethods(val){
                console.log(val);

                //添加 点击弹窗事件
                if(val == 'FnDiaAdd'){
                    this.addLockerPar = this.$options.data().addLockerPar;  //初始化 addLockerPar
                    this.lockerListArr.addLockerTitle = '添加柜机';
                    this.lockerListArr.addLockerType = '1';
                    this.showState.diaAddShow = true;
                }
            },

            /*分页*/
            PageCurrent(page) {
                console.log(page);
                this.searchForm.page = page;
                this.FnGetLockerList();
            },
            PageSizeChange(val){
                console.log(val);
                this.searchForm.paginate = val;
                this.FnGetLockerList();
            },

            /*修改 locker*/
            btnChangeLocker(index,val){
                this.lockerListArr.addLockerTitle = '柜机编辑';
                this.lockerListArr.addLockerType = '2';
                this.showState.diaAddShow = true;
                this.addLockerPar = val;
            },

            /*查看对应抽屉*/
            btnGetLockerLabel(index,val){
                console.log(val);
                this.$router.push({
                    name:'lockerCompart',
                });
            },

            /*获取对应组*/
            btnGetLockerGroup(index,val){
                console.log(val);
                getLockerGroupApi({locker_id: val.id}).then(res=>{
                    console.log(res);
                }).catch(res=>{
                    console.log(res);
                });
            },

            /*搜索按钮 事件*/
            btnSeaLocker(){
                console.log(this.searchForm);
                this.GLOBAL.btnStateChange(this,'btnLoad','searchLoad');

                this.FnGetLockerList();
            },


            /*获取组对应用户*/
            btnGetGroupUser(){
                getGroupUserApi({group_id:65,}).then(res=>{
                    console.log(res);
                }).catch(res=>{
                    console.log(res);
                })
            },

            /*获取用户对应柜子*/
            btnGetUserLocker(){
                getUserLockerApi({id:34,}).then(res=>{
                    console.log(res);
                }).catch(res=>{
                    console.log(res);
                })
            },

            /*获取用户对应企业*/
            btnGetUserGroup(){
                getUserGroupApi({id:39,}).then(res=>{
                    console.log(res);
                }).catch(res=>{
                    console.log(res);
                })
            },

        },

        created() {
            this.FnGetLockerList();

        },
        components:{
            navRefush,
            addLocker,
        }
    }
</script>
