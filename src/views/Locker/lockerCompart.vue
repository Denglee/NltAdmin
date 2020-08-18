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
            <header class="index-item-title">{{$t('locker.title')}}</header>
            <div class="bgWhite-padd20">

                <el-row :gutter="20" class="locker-ul">
                    <el-col :span="6" v-for="(item,index) in compartTable" :key="index">
                        <ul  class="locker-item flex-between">
                            <li class="locker-name">{{item.size}}</li>
                            <li class="locker-name">
                                <span></span> / <span>{{item.number}}</span>
                            </li>
                        </ul>
                    </el-col>
                </el-row>

                <div>
                    <header class="index-item-title">Module</header>
                    <el-row :gutter="20" class="locker-ul">
                        <el-col :span="6" v-for="(item,index) in compartTable" :key="index">
                            <ul  class="locker-item">
                                <li class="locker-name flex-between">
                                    <div>{{item.label}}<span>{{item.label}}</span></div>
                                    <el-menu default-active="1-1" class="el-menu-vertical-demo edit-elMenu-compart" :collapse="true">
                                        <el-submenu index="1"  popper-class="edit-elLeftMenu">
                                            <template slot="title">
                                                <i class="iconfont iconmore-01"></i>
                                            </template>
                                            <el-menu-item index="1-1" @click.native="btnChangeLocker(item)">编辑</el-menu-item>
                                         </el-submenu>
                                    </el-menu>
                                </li>
                                <li class="locker-name">{{item.dev_no}}</li>
                                <li class="locker-name">status{{item.status}}</li>
                            </ul>
                        </el-col>
                    </el-row>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    import {getCompartmentListApi, } from "@/assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    export default {
        name: "lockerCompart",
        data() {
            return {
                btnLoad: {
                    btnBack:false,
                    btnSureAddAuth:false,
                },

                // 导航操作按钮组
                btnAuth:[
                    { name:"添加", type:'if',  iconClass:'iconxinzengyonghu',  methodsName:'FnDiaAddAuth' ,pageName:'addAuth'},
                ],

                userTable:[],

                compartTable:[],
            }
        },
        methods: {

            /*获取抽屉列表 api 事件*/
            FnGetCompartmentList(){
                getCompartmentListApi().then(res=>{
                    console.log(res);
                    this.compartTable = res.DATA.data;
                }).catch(res=>{
                    console.log(res);
                });
            },

            btnChangeLocker(val){
                console.log(val);
            },

        },
        created() {
            this.FnGetCompartmentList();
        },
        components:{
            navRefush,
        }
    }
</script>
<style lang="scss">

    .locker-item{
        background-color: #eff2f9;
        margin-top: 20px;
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