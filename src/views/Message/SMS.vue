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

            <header class="index-item-title"></header>
            <div class="bgWhite-padd20">

                <el-table class="pub-table edit-table" :data="smsTable" border>
                    <el-table-column type="selection" label="index" min-width="50px"></el-table-column>
                    <el-table-column prop="id" label="ID" min-width="50px"></el-table-column>
                    <el-table-column prop="msg_content" label="msg_content"></el-table-column>
                    <el-table-column prop="status" label="status"></el-table-column>
                    <el-table-column prop="msg_type" label="msg_type"></el-table-column>
                    <el-table-column prop="send_time" label="send_time"></el-table-column>
                </el-table>

                <el-pagination
                        background
                        :page-sizes="[2,10, 20, 30, 40]"
                        layout="prev, pager, next, sizes,total,  jumper"
                        :total="smsPar.pageTotal"
                        @current-change="PageCurrent"
                        @size-change="PageSizeChange">
                </el-pagination>

            </div>
        </div>
    </div>
</template>

<script>
    import {getMessageListApi, } from "@/assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    export default {
        name: "messageSMS",  //短信模板设置
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
                smsTable:[],

                smsPar:{
                    page:1,
                    pageTotal:1, //总条目数
                    paginate:10,
                },

            }
        },
        methods: {
            FnGetMessageList(){
                getMessageListApi().then(res=>{
                    console.log(res);
                    this.smsTable = res.DATA.data;
                    this.smsPar.pageTotal = res.DATA.total;
                }).catch(res=>{
                    console.log(res);
                })
            },

            /*分页*/
            PageCurrent(page) {
                console.log(page);
                this.smsPar.page = page;
                this.FnGetMessageList();
            },
            PageSizeChange(val){
                console.log(val);
                this.smsPar.paginate = val;
                this.FnGetMessageList();
            },

        },
        created() {
            this.FnGetMessageList();
        },
        components:{
            navRefush,
        }
    }
</script>
