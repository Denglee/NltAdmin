<template>
    <div class="layoutR-contain animated fadeIn">
        <div class="btnNav-contain">
            <navRefush :btnBack="btnLoad.btnBack" class="btnNav-left" @SecondBack="BtnSecondBack"></navRefush>
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

            <header class="index-item-title">订单信息</header>
            <div class="bgWhite-padd20">
                <el-row :gutter="20" class="orderInfo-main" >
                    <el-col :span="12" >
                        <div class="orderInfo-item">
                            <h4 class="orderInfo-title">Order</h4>
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                    </el-col>

                    <el-col :span="12">
                        <div class="orderInfo-item">
                            <h4 class="orderInfo-title">receipient</h4>
                        </div>
                    </el-col>

                    <el-col :span="12" >
                        <div class="orderInfo-item marTop20">
                            <h4 class="orderInfo-title">Status History</h4>
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                    </el-col>

                    <el-col :span="12">
                        <div class="orderInfo-item marTop20">
                            <h4 class="orderInfo-title">Reservation & Booking</h4>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>


<script>
    import {getOrderListApi,getOrderStatusApi,getLabelOrderApi } from "@/assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    export default {
        name: "orderInfo",  //订单信息
        data() {
            return {
                // collapse:true,
                pageArr:{
                    pageTotal:1, //总条目数
                },

                /*按钮 状态*/
                btnLoad: {
                    btnBack:true,
                    btnSureAddAuth:false,

                    searchLoad:false,
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
                    page:1,
                    pageTotal:1, //总条目数
                    paginate:10,
                },

                /*订单 table  数组*/
                orderTable:[],

            }
        },
        methods: {
            // Z1 返回上一页
            BtnSecondBack(){
                console.log('返回点击事件');
                this.$emit('GoBack','orderList');
            },


            /*搜索点击事件*/
            btnSeaOrder(){

            },

        },
        created() {

        },
        components:{
            navRefush,
        }
    }
</script>
