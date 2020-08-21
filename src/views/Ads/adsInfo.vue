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
                <el-table class="pub-table edit-table" :data="adsTable" border>
                    <el-table-column type="selection" label="index" min-width="50px"></el-table-column>
                    <el-table-column prop="id" label="ID" min-width="50px"></el-table-column>
                    <el-table-column prop="ads_title" label="ads_title"></el-table-column>
                    <el-table-column prop="ads_content" label="ads_content"></el-table-column>
                    <el-table-column prop="status" label="status"></el-table-column>
                    <el-table-column prop="create_time" label="create_time"></el-table-column>
                    <el-table-column prop="update_time" label="update_time"></el-table-column>
                </el-table>

                <el-pagination
                        background
                        :page-sizes="[2,10, 20, 30, 40]"
                        layout="prev, pager, next, sizes,total,  jumper"
                        :total="adsPar.pageTotal"
                        @current-change="PageCurrent"
                        @size-change="PageSizeChange">
                    >
                </el-pagination>

            </div>
        </div>
    </div>
</template>

<script>
    import {getAdsListApi, } from "@/assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    export default {
        name: "adsInfo",
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
                adsTable:[],
                adsPar:{
                    page:1,
                    pageTotal:1, //总条目数
                    paginate:10,
                },
            }
        },
        methods: {
            FnGetAdsList(){
                getAdsListApi().then(res=>{
                    console.log(res);
                    this.adsTable = res.DATA.data;
                    this.adsPar.pageTotal = res.DATA.total;
                }).catch(res=>{
                    console.log(res);
                })
            },

            /*分页*/
            PageCurrent(page) {
                console.log(page);
                this.adsPar.page = page;
                this.FnGetAdsList();
            },
            PageSizeChange(val){
                console.log(val);
                this.adsPar.paginate = val;
                this.FnGetAdsList();
            },
        },
        created() {
            this.FnGetAdsList();
        },
        components:{
            navRefush,
        }
    }
</script>
