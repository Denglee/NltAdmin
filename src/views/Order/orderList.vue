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

            <header class="index-item-title"></header>
            <div class="bgWhite-padd20">
                <div class="pt-screen">

                    <el-input :placeholder="$t('locker.dev_no')" v-model="orderPar.dev_no" class="ptScreen-input" clearable></el-input>
                    <el-input :placeholder="$t('locker.transaction')" v-model="orderPar.transaction" class="ptScreen-input" clearable></el-input>
                    <el-input :placeholder="$t('locker.recipient_phone')" v-model="orderPar.recipient_phone" class="ptScreen-input" clearable></el-input>
                    <el-input :placeholder="$t('locker.tracking_no')" v-model="orderPar.tracking_no" class="ptScreen-input" clearable></el-input>

                    <el-select  filterable v-model="orderPar.recent" placeholder="station" class="ptScreen-select">
                        <el-option v-for="(item,index) in countTime" :key="index" :label="$t('locker.'+item.label+'')" :value="item.name"></el-option>
                    </el-select>

                    <el-button icon="el-icon-search" @click="btnSeaOrder" :loading="btnLoad.searchLoad" class="btn-public">
                        {{$t('btn.search')}}</el-button>
                </div>

                <el-table class="pub-table edit-table" :data="orderTable" border>
                    <!--<el-table-column type="selection" label="index" min-width="50px"></el-table-column>-->
                    <el-table-column prop="id" label="ID" min-width="50px"></el-table-column>
                    <el-table-column prop="dev_no" :label="$t('locker.dev_no')" min-width="50px"></el-table-column>
                    <el-table-column prop="company" label="公司" min-width="50px"></el-table-column>
                    <el-table-column prop="recipient_phone" :label="$t('locker.recipient_phone')" min-width="50px"></el-table-column>
                    <el-table-column prop="tracking_no" :label="$t('locker.tracking_no')" min-width="50px"></el-table-column>
                    <el-table-column prop="transaction" :label="$t('locker.transaction')" min-width="50px"></el-table-column>
                    <el-table-column label="操作" min-width="300">
                        <template slot-scope="scope">
                            <el-menu default-active="1-2" class="el-menu-vertical-demo"
                                     :collapse="true" menu-trigger='click'>
                                <el-submenu index="1">
                                    <template slot="title">
                                        <i class="el-icon-more"></i>
                                    </template>
                                    <el-menu-item index="1-2" @click.native="getLabelOrder(scope.$index, scope.row)">选项2</el-menu-item>
                                    <el-menu-item index="1-3">选项3</el-menu-item>
                                </el-submenu>
                            </el-menu>
                        </template>
                    </el-table-column>

                </el-table>

                <el-pagination
                        background
                        layout="prev, pager, next,total,jumper"
                        :total="pageArr.pageTotal"
                        :page-size ="pageArr.total"
                        @current-change="PageCurrent">
                </el-pagination>

            </div>
        </div>
    </div>
</template>

<script>
    import {getOrderListApi,getOrderStatusApi,getLabelOrderApi, getLockerOrderCountApi } from "@/assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    export default {
        name: "orderList",  //订单列表
        data() {
            return {
                // collapse:true,
                pageArr:{
                    pageTotal:10,
                    total:1,
                },

                /*按钮 状态*/
                btnLoad: {
                    btnBack:false,
                    btnSureAddAuth:false,

                    searchLoad:false,
                },

                // 导航操作按钮组
                btnAuth:[
                    { name:"添加", type:'if',  iconClass:'iconxinzengyonghu',  methodsName:'FnDiaAddAuth' ,pageName:'addAuth'},
                ],

                orderPar:{
                    dev_no:'',
                    transaction:'',
                    recipient_phone:'',
                    tracking_no:'',
                },

                /*订单 table  数组*/
                orderTable:[],


                /*今天 七天前 30天前 日期选择*/
                countTime:[
                    {id:1,name:"",label:'today'},
                    {id:2,name:"last7d",label:'last7d'},
                    {id:3,name:"last30d",label:'last30d'},
                ],
                recent:'',

            }
        },
        methods: {
            /*分页*/
            PageCurrent(page) {
                console.log(page);
                this.searchVal.p = page;
                this.getPTSaleroom();
                // this.staffPage = page;
            },

            /*快递柜最近天数订单统计*/
            getLockerOrderCount(){
                getLockerOrderCountApi({
                    recent:this.recent,
                }).then(res=>{
                    console.log(res);
                }).catch(res=>{
                    console.log(res);
                })
            },

            /*搜索点击事件*/
            btnSeaOrder(){
                /*this.getLockerOrderCount();*/
                this.getOrderList();
            },

            /*获取订单列表*/
            getOrderList(){
                getOrderListApi().then(res=>{
                    console.log(res);
                    this.orderTable = res.DATA;
                }).catch(res=>{
                    console.log(res);
                })
            },

            /*查询订单状态*/
            lookState(index,val){
              console.log(val);
                getOrderStatusApi({
                    transaction:val.transaction,
                }).then(res=>{
                    console.log(res);
                }).catch(res=>{
                    console.log(res);
                })
            },

            /*获取抽屉对应订单*/
            getLabelOrder(index,val){
                console.log(val.id);
                getLabelOrderApi({
                    compartment:val.compartment,
                }).then(res=>{
                    console.log(res);
                }).catch(res=>{
                    console.log(res);
                })
            },
        },
        created() {
            this.getOrderList();
        },
        components:{
            navRefush,
        }
    }
</script>
