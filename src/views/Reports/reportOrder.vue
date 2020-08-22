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
                <h4>{{$t('report.title')}}</h4>
                <el-select  filterable v-model="recent" placeholder="station" class="ptScreen-select" @change="changeTime">
                    <el-option v-for="(item,index) in countTime" :key="index" :label="$t('locker.'+item.label+'')" :value="item.name"></el-option>
                </el-select>
            </header>
            <div class="bgWhite-padd20">

                <el-row :gutter="20" class="locker-ul">
                    <el-col :span="14" >
                        <div class="charts-item">
                            <ve-histogram :data="hisChartData" :colors="timeColor"  :extend="histogramSettings"></ve-histogram>
                        </div>
                    </el-col>

                    <el-col :span="10">
                        <div class="charts-item">
                            <ve-ring :data="pieChartData" :extend="pieSettings" :colors="companyColor"></ve-ring>
                        </div>
                    </el-col>
                </el-row>

            </div>
        </div>
    </div>
</template>

<script>
    import {getLockerOrderCountApi, } from "@/assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    export default {
        name: "reportOrder",   //订单报表
        data() {

            this.timeColor=['#005ad4'];
            this.companyColor = ['#ff8a7e','#005ad4','#00a0e9','#8763ce','#1eaaa1','#4ccbeb','#5b5ec7','#ffbe00'];
            this.histogramSettings = {
                legend: {
                    orient: 'vertical',
                    left: 10,
                    show:false,
                },
                series: {
                    barWidth: 20,
                    type: 'bar',
                }
            }
            this.pieSettings = {
                legend: {
                    orient: 'vertical',
                    right: 10,
                    top:'10%',
                },
                series:{
                    label: {   //去掉指引线
                        normal: {
                            position: 'inner',
                            show: false,
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                }
            };

            return {
                btnLoad: {
                    btnBack:false,
                    btnSureAddAuth:false,
                },

                // 导航操作按钮组
                btnAuth:[
                    { name:"添加", type:'if',  iconClass:'iconxinzengyonghu',  methodsName:'FnDiaAddAuth' ,pageName:'addAuth'},
                ],
                reportTable:[],

                /*今天 七天前 30天前 日期选择*/
                countTime:[
                    {id:1,name:"",label:'today'},
                    {id:2,name:"last7d",label:'last7d'},
                    {id:3,name:"last30d",label:'last30d'},
                    {id:4,name:"last90d",label:'last90d'},
                ],
                recent:'',

                pieChartData: {
                    columns: ['name','COUNT'],
                    rows: []
                },

                hisChartData: {
                    columns: ['name','COUNT'],
                    rows: []
                },
            }
        },
        methods: {

            /*快递柜最近天数订单统计*/
            FnGetLockerOrderCount(){
                getLockerOrderCountApi({
                    recent:this.recent,
                }).then(res=>{
                    console.log(res.DATA.list);
                    this.reportTable = res.DATA.list;
                    this.pieChartData.rows = res.DATA.list.status;
                    this.hisChartData.rows = res.DATA.list.order;
                }).catch(res=>{
                    console.log(res);
                })
            },

            /*搜索*/
            btnSeaOrder(){
                this.FnGetLockerOrderCount();
            },

            /*select 时间选择  */
            changeTime(val){
                console.log(val);
                this.recent = val;
                this.FnGetLockerOrderCount();
            },

        },
        created() {
            this.FnGetLockerOrderCount();
        },
        components:{
            navRefush,
        }
    }
</script>
