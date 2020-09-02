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
        <div class="bgWhite-public bg-orderInfo">

            <header class="index-item-title">订单信息</header>
            <div class="bgWhite-padd20">
                <el-row :gutter="20" class="orderInfo-main" >
                    <el-col :span="12" >
                        <div class="orderInfo-item">
                            <h4 class="orderInfo-title">Order</h4>
                            <ul class="orderInfo-infoUl">
                                <li>
                                    <div>ID</div>
                                    <div>{{orderInfoArr.id}}</div>
                                </li>
                                <li>
                                    <div>Tracking No</div>
                                    <div>{{orderInfoArr.tracking_no}}</div>
                                </li>
                                <li>
                                    <div>Postal Code</div>
                                    <div>{{orderInfoArr.postal_code}}</div>
                                </li>
                                <li>
                                    <div>Status</div>
                                    <div>{{orderInfoArr.status}}</div>
                                </li>
                                <li>
                                    <div>Locker</div>
                                    <div>{{orderInfoArr.dev_no}}</div>
                                </li>
                                <li>
                                    <div>Compartment</div>
                                    <div>{{orderInfoArr.compartment}}</div>
                                </li>
                            </ul>
                        </div>
                    </el-col>

                    <el-col :span="12">
                        <div class="orderInfo-item">
                            <h4 class="orderInfo-title">Recipient</h4>
                            <ul class="orderInfo-infoUl">
                                <li>
                                    <div>Name</div>
                                    <div>{{orderInfoArr.recipient_name}}</div>
                                </li>
                                <li>
                                    <div>Phone</div>
                                    <div>{{orderInfoArr.recipient_phone}}</div>
                                </li>
                                <li>
                                    <div>Email</div>
                                    <div>{{orderInfoArr.email}}</div>
                                </li>
                                <li>
                                    <div>Signanture</div>
                                    <div>{{orderInfoArr.id}}</div>
                                </li>
                            </ul>
                        </div>
                    </el-col>

                    <el-col :span="12" >
                        <div class="orderInfo-item marTop20">
                            <div class="orderInfo-title flex-between">
                                <h4>Status History</h4>
                                <el-button class="btn-ptMore btnMoreStatus" @click="FnBtnMoreStatus"> LOAD MORE <i class="el-icon-arrow-right"></i></el-button>
                            </div>
                            <ul class="orderInfo-infoUl">
                                <li>
                                    <div>Transaction</div>
                                    <div>{{orderInfoArr.new_order_status.transaction}}</div>
                                </li>
                                <li>
                                    <div>Retrieve Time</div>
                                    <div>{{orderInfoArr.new_order_status.retrieve_time}}</div>
                                </li>
                                <li>
                                    <div>Expired Time</div>
                                    <div>{{orderInfoArr.new_order_status.expired_time}}</div>
                                </li>
                                <li>
                                    <div>Collect Time</div>
                                    <div>{{orderInfoArr.new_order_status.collect_time}}</div>
                                </li>
                            </ul>
                        </div>
                    </el-col>

                    <el-col :span="12">
                        <div class="orderInfo-item marTop20">
                            <h4 class="orderInfo-title">Reservation & Booking</h4>
                            <ul class="orderInfo-infoUl">
                                <li>
                                    <div>Locker</div>
                                    <div>{{orderInfoArr.dev_no}}</div>
                                </li>
                                <li>
                                    <div>Compartment</div>
                                    <div>{{orderInfoArr.compartment}}</div>
                                </li>
                            </ul>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!--All STATUS 弹出 -->
        <el-dialog  :append-to-body="true" title="All STATUS" :visible.sync="showState.diaMoreStatus" custom-class="passAlert"
                    width="600px" :destroy-on-close ='true'>
            <div v-if="orderInfoArr.parcelorderstatus.length == 0" class="tip-data">{{$t('public.noData')}}</div>
            <ul class="orderInfo-infoUl" v-for="(item,index) in orderInfoArr.parcelorderstatus" v-else>
                <li  v-if="item.transaction">
                    <div>Transaction</div>
                    <div>{{item.transaction}}</div>
                </li>
                <li v-if="item.retrieve_time">
                    <div>Retrieve Time</div>
                    <div>{{item.retrieve_time}}</div>
                </li>
                <li v-if="item.expired_time">
                    <div>Expired Time</div>
                    <div>{{item.expired_time}}</div>
                </li>
                <li v-if="item.collect_time">
                    <div>Collect Time</div>
                    <div>{{item.collect_time}}</div>
                </li>
            </ul>
        </el-dialog>

    </div>
</template>


<script>
    import {getOrderListApi} from "@/assets/js/api";
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

                /*弹窗 显影状态*/
                showState:{
                    diaMoreStatus:false,
                },

                // 导航操作按钮组
                btnAuth:[
                    { name:"添加", type:'if',  iconClass:'iconxinzengyonghu',  methodsName:'FnDiaAddOrder' ,pageName:'addAuth'},
                ],

                orderInfoParm:{
                    dev_no:'',
                    transaction:'',
                    recipient_phone:'',
                    tracking_no:'',

                    id:'',
                    page:1,
                    pageTotal:1, //总条目数
                    paginate:10,
                },

                /* orderInfo 数组*/
                orderInfoArr:{
                    new_order_status:{
                        transaction:'',
                    },
                    parcelorderstatus:{
                        transaction:'',
                    }
                },

            }
        },
        methods: {
            /*获取订单info 列表*/
            FnGetOrderInfo(){
                getOrderListApi(this.orderInfoParm).then(res=>{
                    console.log(res.DATA.data[0]);
                    this.orderInfoArr = res.DATA.data[0];
                }).catch(res=>{
                    console.log(res);
                })
            },

            /*更多历史订单状态 */
            FnBtnMoreStatus(){
              this.showState.diaMoreStatus = true;
            },

            // Z1 返回上一页
            BtnSecondBack(){
                console.log('返回点击事件');
                this.$emit('GoBack','orderList');
            },

            /*搜索点击事件 */
            btnSeaOrder(){

            },

        },
        created() {

            let  CookiePageOrder = JSON.parse(sessionStorage.getItem('pageNameOrder'));
            console.log(CookiePageOrder.id);
            if(CookiePageOrder){
                this.orderInfoParm.id = CookiePageOrder.id;
                this.FnGetOrderInfo();
            }

        },
        components:{
            navRefush,
        }
    }
</script>
