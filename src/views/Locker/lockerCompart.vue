<template>
    <div class="layoutR-contain animated fadeIn">
        <!--<div class="btnNav-contain">
            <navRefush :btnBack="btnLoad.btnBack" class="btnNav-left"></navRefush>
            <ul>
                <li class="btnNav-flex btnNav-vip">
                    <button class="btnNav-box" v-for="(item,index) in btnAuth" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                        <i class="iconfont" :class="item.iconClass"></i>
                        <span>{{item.name}}</span>
                    </button>
                </li>
            </ul>
        </div>-->
        <div class="bgWhite-public">
            <header class="index-item-title">格口</header>
            <div class="bgWhite-padd20">

                <el-row :gutter="20" class="">
                    <el-col :span="4" v-for="(item,index) in compartSizeArr" :key="index">
                        <ul  class="locker-list locker-item flex-between" @click="FnChooseSize(index,item)"  :class="{'active-size':index === sizeChecked}">
                            <li class="locker-name">size:{{item.size}}</li>
                            <li class="locker-name">
                                <span>{{item.occupy}}</span> / <span>{{item.all}}</span>
                            </li>
                        </ul>
                    </el-col>
                </el-row>

                <div>
                    <header class="index-item-title">Module</header>
                    <el-row :gutter="20" class="locker-box">
                        <el-col :span="6" v-for="(item,index) in compartList" :key="index">
                            <ul  class="locker-list">
                                <li class="locker-name flex-between">
                                    <div>
                                        <span class="locker-label">{{item.label}}</span>
                                        <span class="locker-size">{{item.size}}</span>
                                    </div>
                                    <el-menu default-active="1-1" class="elMenu-compart  edit-elMenu-compart"
                                             background-color="rgba(255,255,255,0)" :collapse="true">
                                        <el-submenu index="1"  popper-class="edit-elLeftMenu">
                                            <template slot="title">
                                                <i class="iconfont iconmore-01"></i>
                                            </template>
                                            <el-menu-item index="1-1" @click.native="btnChangeLocker(item)">编辑</el-menu-item>
                                         </el-submenu>
                                    </el-menu>
                                </li>
                                <li class="locker-name">
                                    <span v-if="item.repair_status == 1">正常</span>
                                    <span v-if="item.repair_status == 2" class="color-Pink">维修</span>
                                    <span v-if="item.repair_status == 3" class="colorGray">清洁</span>
                                </li>
                                <li class="locker-name">
                                    <span v-if="item.status == 1">空闲</span>
                                    <span v-if="item.status == 2" class="fontGray">占用</span>
                                    <span v-if="item.status == 3" class="color-Pink">预定</span>
                                </li>
                                <li>
                                    <div class="locker-name" v-if="item.parcelorder != null">{{item.parcelorder.transaction}}</div>
                                    <div class="locker-name" v-else>暂无</div>
                                </li>
                            </ul>
                        </el-col>
                    </el-row>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {getCompartmentOrderApi } from "@/assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    export default {
        name: "lockerCompart",
        data() {
            return {
                sizeChecked:-1,
                btnLoad: {
                    btnBack:false,
                    btnSureAddAuth:false,
                },

                // 导航操作按钮组
                btnAuth:[
                    { name:"添加", type:'if',  iconClass:'iconxinzengyonghu',  methodsName:'FnDiaAddAuth' ,pageName:'addAuth'},
                ],


                compartSizeArr:[],  //尺寸 数组 集合
                compartList:[],     //柜机列表
                compactParm:{
                    size:'',
                    label:'',
                },
            }
        },
        methods: {

            /*获取抽屉列表 api 事件  */
            /*FnGetCompartmentList(){
                getCompartmentListApi().then(res=>{
                    console.log(res);
                    this.compartSizeArr = res.data.data;
                }).catch(res=>{
                    console.log(res);
                });
            },*/

            /*获取抽屉和订单信息 api*/
            FnGetCompartmentOrder(){
                getCompartmentOrderApi(this.compactParm).then(res=>{
                    console.log(res.data.list);
                    if(!this.compactParm.size){
	                    this.compartSizeArr = res.data.label_size_count;
                    }

                    this.compartList = res.data.list;
                }).catch(res=>{
                    console.log(res);
                });
            },

            /*尺寸选择 切换 */
            FnChooseSize(index,val){
                console.log(index);
                console.log(val);
                this.sizeChecked = index;
                this.compactParm.size = val.size;
                this.FnGetCompartmentOrder();
            },

            /*抽屉 操作 事件*/
            btnChangeLocker(val){
                console.log(val);
            },

        },
        created() {
            // this.FnGetCompartmentList();

            this.FnGetCompartmentOrder();
        },
        components:{
            navRefush,
        }
    }
</script>
