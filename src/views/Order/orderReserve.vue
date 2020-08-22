<template>
    <div class="layoutR-contain animated fadeIn">
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

            <header class="index-item-title flex-between">
                <h4>Reservation & Booking</h4>
                <div>
                    <el-radio-group v-model="orderReserveParm.status" size="mini" @change = 'FnRadioReserva'>
                        <el-radio-button :label="0">ALL</el-radio-button>
                        <el-radio-button :label="1">Reservation</el-radio-button>
                        <el-radio-button :label="2">Booking</el-radio-button>
                    </el-radio-group>
                </div>
            </header>
            <div class="bgWhite-padd20">
                <div class="pt-screen">

                    <el-input :placeholder="$t('locker.dev_no')" v-model="orderReserveParm.dev_no" class="ptScreen-input" clearable></el-input>
                    <el-input :placeholder="$t('locker.transaction')" v-model="orderReserveParm.transaction" class="ptScreen-input" clearable></el-input>
                    <el-input :placeholder="$t('locker.recipient_phone')" v-model="orderReserveParm.recipient_phone" class="ptScreen-input" clearable></el-input>
                    <el-input :placeholder="$t('locker.tracking_no')" v-model="orderReserveParm.tracking_no" class="ptScreen-input" clearable></el-input>

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
                    <el-table-column :label="$t('public.operation')" min-width="100">
                        <template slot-scope="scope">
                            <el-menu default-active="1-2" class="edit-elMenu-compart"
                                     :collapse="true" menu-trigger='click' background-color="rgba(255,255,255,0)">
                                <el-submenu index="1" popper-class="edit-elLeftMenu">
                                    <template slot="title">
                                        <i class="iconfont iconmore-01"></i>
                                    </template>
                                    <el-menu-item index="1-2" @click.native="lookState(scope.$index, scope.row)">获取订单状态</el-menu-item>
                                    <el-menu-item index="1-3" @click.native="getLabelOrder(scope.$index, scope.row)">抽屉对应订单</el-menu-item>
                                </el-submenu>
                            </el-menu>
                        </template>
                    </el-table-column>

                </el-table>

                <el-pagination
                        background
                        :page-sizes="[2,10, 20, 30, 40]"
                        layout="prev, pager, next, sizes,total,  jumper"
                        :total="orderReserveParm.pageTotal"
                        @current-change="PageCurrent"
                        @size-change="PageSizeChange">
                  >
                </el-pagination>

            </div>
        </div>
    </div>
</template>

<script>
    import {getOrderListApi,getOrderStatusApi,getLabelOrderApi } from "@/assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    export default {
        name: "orderReserve",  //预约订单
        data() {
            return {
                // collapse:true,
                pageArr:{
                    pageTotal:1, //总条目数
                },

                /*按钮 状态*/
                btnLoad: {
                    btnBack:false,
                    btnSureAddAuth:false,

                    searchLoad:false,
                },

                // 导航操作按钮组
                btnAuth:[
                    { name:"添加", type:'if',  iconClass:'iconxinzengyonghu',  methodsName:'FnDiaAddOrder' ,pageName:'addAuth'},
                ],

                orderReserveParm:{
                    dev_no:'',
                    transaction:'',
                    recipient_phone:'',
                    tracking_no:'',
                    page:1,
                    pageTotal:1, //总条目数
                    paginate:10,

                    status:'0',
                },

                /*订单 table  数组*/
                orderTable:[],


            }
        },
        methods: {
            /*状态 切换 选中 事件*/
            FnRadioReserva(){
                console.log(this.orderReserveParm.status);
            },

            /*分页*/
            PageCurrent(page) {
                console.log(page);
                this.orderReserveParm.page = page;
                this.getOrderList();
            },
            PageSizeChange(val){
                console.log(val);
                this.orderReserveParm.paginate = val;
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
                getOrderListApi(this.orderReserveParm).then(res=>{
                    console.log(res);
                    this.orderTable = res.DATA.data;
                    this.orderReserveParm.pageTotal = res.DATA.total;
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
        },
        components:{
            navRefush,
        }
    }
</script>
