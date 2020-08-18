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

            </div>
        </div>
    </div>
</template>

<script>
    import {getUserListApi, } from "@/assets/js/api";
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    export default {
        name: "adminUser",
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

            }
        },
        methods: {


        },
        created() {

        },
        components:{
            navRefush,
        }
    }
</script>
