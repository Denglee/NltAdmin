<template>
    <div class="layoutR-contain animated fadeIn">
        <div v-if="pageOrder.orderList">
            <div class="btnNav-contain">
                <navRefush :btnBack="btnLoad.btnBack" class="btnNav-left"></navRefush>
                <ul>
                    <!--<li class="btnNav-flex btnNav-vip">
                        <button class="btnNav-box" v-for="(item,index) in btnAuth" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                            <i class="iconfont" :class="item.iconClass"></i>
                            <span>{{item.name}}</span>
                        </button>
                    </li>-->
                </ul>
            </div>
            <div class="bgWhite-public">

                <header class="index-item-title"></header>
                <div class="bgWhite-padd20">
                    <div class="pt-screen">

                        <el-input :placeholder="$t('locker.dev_no')" v-model="orderPar.keyword" class="ptScreen-input" clearable></el-input>
                        <el-date-picker
                                v-model="dayTrend"
                                type="daterange"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                calss="ptScreen-select">
                        </el-date-picker>

                        <el-select  filterable v-model="orderPar.status" placeholder="status" class="sel-status">
                            <el-option v-for="(item,index) in orderStatusArr" :key="index" :label="$t('order.status.'+item.value+'')" :value="item.type"></el-option>
                        </el-select>

                        <el-button icon="el-icon-search" @click="btnSeaOrder" :loading="btnLoad.searchLoad" class="btn-public">
                            {{$t('btn.search')}}</el-button>
                    </div>

                    <el-table class="pub-table edit-table" :data="orderTable" border>
                        <!--<el-table-column type="selection" label="index" min-width="50px"></el-table-column>-->
                        <el-table-column prop="id" label="ID" min-width="50px"></el-table-column>
                        <el-table-column prop="tracking_no" :label="$t('locker.tracking_no')" min-width="50px"></el-table-column>
                        <el-table-column prop="postal_code" :label="$t('locker.postal_code')" min-width="50px"></el-table-column>
                        <el-table-column prop="status" :label="$t('locker.status')" min-width="50px">
                            <template slot-scope="scope">
                               <div v-for="(item,index) in orderStatusArr" :key="index" v-if="item.type == scope.row.status">
                                   {{scope.row.status}}
                                   {{$t('order.status.'+item.value+'')}}
                               </div>
                            </template>
                        </el-table-column>

                        <el-table-column prop="company" label="公司" min-width="50px"></el-table-column>
                        <el-table-column prop="recipient_phone" :label="$t('locker.recipient_phone')" min-width="50px"></el-table-column>
                        <el-table-column prop="transaction" :label="$t('locker.transaction')" min-width="50px"></el-table-column>
                        <el-table-column :label="$t('public.operation')" min-width="100">
                            <template slot-scope="scope">
                                <el-menu default-active="1-2" class="edit-elMenu-compart"
                                         :collapse="true" menu-trigger='click' background-color="rgba(255,255,255,0)">
                                    <el-submenu index="1" popper-class="edit-elLeftMenu">
                                        <template slot="title">
                                            <i class="iconfont iconmore-01"></i>
                                        </template>
                                        <!--<el-menu-item index="1-2" @click.native="lookState(scope.$index, scope.row)">获取订单状态</el-menu-item>
                                        <el-menu-item index="1-3" @click.native="getLabelOrder(scope.$index, scope.row)">抽屉对应订单</el-menu-item>-->
                                        <el-menu-item index="1-3" @click.native="FnGoOrderInfo(scope.$index, scope.row)">查看订单详情</el-menu-item>
                                    </el-submenu>
                                </el-menu>
                            </template>
                        </el-table-column>

                    </el-table>

                    <el-pagination
                            background
                            :page-sizes="[2,10, 20, 30, 40]"
                            layout="prev, pager, next, sizes,total,  jumper"
                            :total="orderPar.pageTotal"
                            @current-change="PageCurrent"
                            @size-change="PageSizeChange">
                      >
                    </el-pagination>

                </div>
            </div>
        </div>
        <div v-if="pageOrder.orderInfo">
            <orderInfo @GoBack="goBack(arguments)"></orderInfo>
        </div>
    </div>
</template>

<script>
    import {getOrderListApi,getOrderStatusApi,getLabelOrderApi } from "@/assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    import orderInfo from "./orderInfo";
    export default {
        name: "orderList",  //订单列表
        data() {
            return {
                dayTrend:'',

                pageArr:{
                    pageTotal:1, //总条目数
                },

                /*按钮 状态*/
                btnLoad: {
                    btnBack:false,
                    btnSureAddAuth:false,

                    searchLoad:false,
                },

                /*页面显影状态*/
                pageOrder:{
                    orderList:true,
                    orderInfo:false,
                },

                // 导航操作按钮组
                btnAuth:[
                    { name:"添加", type:'if',  iconClass:'iconxinzengyonghu',  methodsName:'FnDiaAddOrder' ,pageName:'addAuth'},
                ],

                orderPar:{
                    dev_no:'',
                    transaction:'',
                    recipient_phone:'',
                    tracking_no:'',

                    keyword:'',
                    page:1,
                    pageTotal:1, //总条目数
                    paginate:10,
                    status:'',
                },

                /*订单 table  数组*/
                orderTable:[],

                orderStatusArr:[
                    {type: 0, value:'AllStates'},
                    {type: 1, value:'Created'},
                    {type: 2, value:'Reserved'},
                    {type: 3, value:'Delivered'},
                    {type: 4, value:'TimedOut'},
                    {type: 5, value:'Cancelled'},
                    {type: 6, value:'Recovered'},
                    {type: 7, value:'Pieced'},
                    {type: 8, value:'HasPassed'},
                    {type: 9, value:'DeliveryFailed'},
                    {type: 10, value:'RecycleFailed'},
                    {type: 11, value:'Reserve'},
                ],


            }
        },
        methods: {
            /*进入订单详情*/
            FnGoOrderInfo(){
                this.pageOrder={
                    orderList:false,
                    orderInfo:true,
                };
                sessionStorage.setItem('pageOrder','orderInfo');
            },

            // Z1
            goBack(val){
                console.log(val[0]);
                let indexPage = val[0];
                this.pageShow('orderList','orderInfo',);
                sessionStorage.removeItem('pageOrder');
            },

            // 页面显影方法
            pageShow(nowPage,indexPage){
                this.pageOrder[indexPage] = false;
                this.pageOrder[nowPage] = true;
            },

            /*分页*/
            PageCurrent(page) {
                console.log(page);
                this.orderPar.page = page;
                this.getOrderList();
            },
            PageSizeChange(val){
                console.log(val);
                this.orderPar.paginate = val;
                this.getOrderList();
            },


            /*按钮组 点击事件*/
            btnMethods(val){
                console.log(val);

                //添加 点击弹窗事件
                if(val == 'FnDiaAddOrder'){
                    console.log('add');
                }
            },

            /*搜索点击事件*/
            btnSeaOrder(){
                this.getOrderList();
            },

            /*获取订单列表*/
            getOrderList(){
                getOrderListApi(this.orderPar).then(res=>{
                    console.log(res);
                    this.orderTable = res.DATA.data;
                    this.orderPar.pageTotal = res.DATA.total;
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
                console.log(val);
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

            let  CookiePageOrder = sessionStorage.getItem('pageOrder');
            console.log(CookiePageOrder);
            if(CookiePageOrder){
                this.pageOrder={
                    orderList:false,
                    orderInfo:true,
                };
            };
        },
        components:{
            navRefush,
            orderInfo,
        }
    }
</script>
