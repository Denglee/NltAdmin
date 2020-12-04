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
            <header class="index-item-title">{{$t('locker.title')}}</header>
            <div class="bgWhite-padd20">

                <!--筛选-->
                <div class="pt-screen">
                    <el-select  filterable v-model="searchForm.sel1" placeholder="Station" class="ptScreen-select">
                        <el-option v-for="item in sel1Arr" :key="item.index" :label="item.value" :value="item.name"></el-option>
                    </el-select>


                    <el-select  filterable v-model="searchForm.sel2" placeholder="Location" class="ptScreen-select">
                        <el-option v-for="item in sel2Arr" :key="item.index" :label="item.value" :value="item.name"></el-option>
                    </el-select>

                    <el-date-picker
                            v-model="searchForm.salerTime"
                            type="daterange"
                            unlink-panels
                            range-separator="to"
                            start-placeholder="lst.After"
                            end-placeholder="lst.Before"
                            value-format="yyyy-MM-dd"
                            calss="ptScreen-select">
                    </el-date-picker>

                    <el-input placeholder="Name" v-model="searchForm.inp" class="ptScreen-input" clearable></el-input>

                    <el-button icon="el-icon-search" @click="btnSeaLocker" :loading="btnLoad.searchLoad" class="btn-public">Search</el-button>

                </div>

                <el-row :gutter="20" class="locker-ul">
                    <el-col :span="6" v-for="(item,index) in lockerArr2" :key="index">
                        <ul  class="locker-item">
                            <li class="locker-name">{{item.name}}</li>
                            <li class="locker-val"><el-tag :color ='item.color'>{{item.value}}</el-tag></li>
                        </ul>
                    </el-col>
                </el-row>

            </div>
        </div>

        <div class="bgWhite-public">

            <header class="index-item-title">CHARTS</header>
            <div class="bgWhite-padd20">
                <el-row :gutter="20" class="locker-ul" >
                    <el-col :span="14" >
                        <div class="charts-item">
                            <h4 class="charts-title  flex-between">
                                <div>COLLECTION TIME BAR CHART</div>
                                <el-select  filterable v-model="searchForm.sel2" placeholder="PANGE" class="select">
                                    <el-option v-for="item in sel2Arr" :key="item.index" :label="item.value" :value="item.name"></el-option>
                                </el-select>
                            </h4>
                            <div style="padding: 0 20px">
                                <ve-histogram :data="chartData" :colors="timeColor"  :extend="histogramSettings" ></ve-histogram>
                            </div>
                        </div>
                    </el-col>

                    <el-col :span="10">
                        <div class="charts-item">
                            <h4 class="charts-title flex-between">
                                <div>COMPANY</div>
                                <el-select  filterable v-model="searchForm.sel2" placeholder="PANGE" class="select">
                                    <el-option v-for="item in sel2Arr" :key="item.index" :label="item.value" :value="item.name"></el-option>
                                </el-select>
                            </h4>
                            <div style="padding: 0 20px">
                                <ve-ring :data="pieChartData"  :extend="pieSettings" :colors="companyColor"></ve-ring>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import {getLockerListApi, } from "@/assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    export default {
        name: "lockerList",  //柜机列表
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

                chartData: {
                    columns: ['TIME', 'NUMBER'],
                    rows: [
                        { 'TIME': '8:00', 'NUMBER': 193},
                        { 'TIME': '9:00', 'NUMBER': 93},
                        { 'TIME': '10:00', 'NUMBER': 393},
                        { 'TIME': '11:00', 'NUMBER': 493},
                        { 'TIME': '12:00', 'NUMBER': 1393},
                        { 'TIME': '13:00', 'NUMBER': 1193},
                        { 'TIME': '14:00', 'NUMBER': 1093},
                        { 'TIME': '15:00', 'NUMBER': 793},
                        { 'TIME': '16:00', 'NUMBER': 1393},
                        { 'TIME': '17:00', 'NUMBER': 493},
                        { 'TIME': '18:00', 'NUMBER': 1693},
                        { 'TIME': '19:00', 'NUMBER': 1493},
                        { 'TIME': '20:00', 'NUMBER': 1193},
                        { 'TIME': '21:00', 'NUMBER': 1393},
                        { 'TIME': '21:00', 'NUMBER': 1393},
                    ]
                },


                pieChartData: {

                    columns: ['company', 'number'],
                    rows: [
                        { 'company': 'A', 'number': 1393 },
                        { 'company': 'B', 'number': 3530 },
                        { 'company': 'C', 'number': 2923 },
                        { 'company': 'D', 'number': 1723 },
                        { 'company': 'E', 'number': 3792 },
                        { 'company': 'F', 'number': 4593 },
                        { 'company': 'G', 'number': 4593 },
                        { 'company': 'H', 'number': 1404 },
                    ]
                },


                lockerArr2:[],

                btnLoad: {
                    btnBack:false,
                    btnSureAddAuth:false,

                    searchLoad:false,
                },

                searchForm:{
                    sel1:'',
                    sel2:'',
                    inp:'',
                    salerTime:'',
                },

                sel1Arr:[
                    {id:1,name:"柜机11",value:'柜机'},
                    {id:1,name:"柜机12"},
                ],
                sel2Arr:[
                    {id:1,name:"位置1",value:'位置1'},
                    {id:1,name:"位置1",value:'位置2'},
                ],

                // 导航操作按钮组
                btnAuth:[
                    { name:"ADD", type:'if',  iconClass:'el-icon-circle-plus-outline',  methodsName:'FnDiaAddAuth' ,pageName:'addAuth'},
                ],

                lockerTable:[],

            }
        },
        methods: {
            FnGetLockerList(){
                getLockerListApi().then(res=>{
                    console.log(res);
                    this.lockerTable = res.data;
                }).catch(res=>{
                    console.log(res);
                })
            },

            btnMethods(val){
                console.log(val);
            },

            /*搜索按钮 时间*/
            btnSeaLocker(){

            },

            compare(){
                let colorArr = [
                    {color: '#005AD4',},
                    {color: '#FF8A7E',},
                    {color: '#4CCBEB',},
                    {color: '#005AD4',},
                    {color: '#FF8A7E',},
                    {color: '#4CCBEB',},
                    {color: '#005AD4',},
                    {color: '#005AD4',},
                    {color: '#FF8A7E',},
                    {color: '#FF8A7E',},
                    {color: '#4CCBEB',},
                    {color: '#005AD4',},
                    {color: '#4CCBEB',},
                    {color: '#005AD4',},
                    {color: '#FF8A7E',},
                    {color: '#4CCBEB',},
                    {color: '#005AD4',},
                ];

                let dataArr = [
                    { name:'ONLINE', value:321,},
                    { name:'OFFLINE' , value:1,},
                    { name:'DEPOSITS TODAY' , value:1616,},
                    { name:'COLLECTION TODAY', value:1399, },
                    { name:'CANCELED TODAY', value:4, },
                    { name:'OVERALL DEPOSITS', value:571666, },
                    { name:'PENDING COLLECTION' , value:1666,},
                    { name:'EXPIRED (24H)' ,  value:1399,},
                    { name: 'EXCEPTIONS', value: '1545', },
                    { name: 'FAILED SMS', value: '0', },
                    { name:"OVERALL COMPARTMENT USAGE" , value:'45.75%'},
                    { name:"X-LARGE USAGE" , value:'56.09%'},
                    { name:"LARGE USAGE" , value:'62.73%'},
                    { name:"MEDIUM USAGE" , value:'34.05%'},
                    { name:"SMALL USAGE" , value:'17.52%'},
                    { name:"SMALL (V) USAGE" , value:'40.54%'},
                    { name:"MINI USAGE" , value:'71.24%'},
                ];

                /*map合并 返回新数组 */
                let compareArr = colorArr.map((item, index) => {
                    return {...item, ...dataArr[index]};
                });

                this.lockerArr2 = compareArr;
            },

        },
        created() {
            this.FnGetLockerList();

            this.compare();
        },
        components:{
            navRefush,
        }
    }
</script>

<style lang="scss">

    .charts-item {
        -webkit-box-shadow: -1px 2px 12px 0 hsla(0,0%,85.9%,.79);
        box-shadow: -1px 2px 12px 0 hsla(0,0%,85.9%,.79);
        border-radius: 20px;
    }
    .charts-title{
        border-bottom: 1px solid #eff2f9;
        font-size: 16px;
        font-weight: 500;
        padding: 0 27px;
        height: 44px;
        line-height: 44px;
        margin-bottom: 20px;
    }

    .locker-item{

        background-color: #eff2f9;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        border-radius: 4px;
        padding: 11px 14px;
        /*&:last-child {
            margin-bottom: 0;
        }*/
        .locker-name{

        }
        .locker-val{

        }
        .el-tag{
            color: #fff;
            border: none;
            padding: 1px 6px;
            height: auto;
            min-width: 28px;
            text-align: center;
        }
    }


</style>
