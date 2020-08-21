<template>
    <div class="layoutR-contain animated fadeIn">

        <div class="bgWhite-public">
            <header class="index-item-title">权限组</header>
            <div class="bgWhite-padd20">

                首页

             <!--   <form class="pt-screen">
                    <el-input placeholder="请输入会员姓名、电话" v-model="staffForm.staffName" class="ptScreen-input"
                              clearable></el-input>
                    <el-date-picker placeholder="请选择月份" class="month-picker" v-model="staffForm.staffMonth" type="month"
                                    value-format="yyyy-MM"></el-date-picker>
                    <el-button icon="el-icon-search" @click="btnSearch" :loading="btnState.searchLoad" class="btn-public">搜索</el-button>

                </form>

                &lt;!&ndash;表格&ndash;&gt;
                <el-table class="pub-table edit-table" :data="authTable" border>
                    <el-table-column prop="id" label="ID" width="50px"></el-table-column>
                    <el-table-column prop="name" label="规则描述"></el-table-column>
                    <el-table-column prop="value" label="规则标识"></el-table-column>
                    <el-table-column :label="$t('public.operation')" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" class="btn-noBor" @click="btnChangeAuth(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>-->

            </div>
        </div>

        <el-dialog  :append-to-body="true" :title="diaInfoArr.diaAuthTitle" :visible.sync="diaInfoArr.diaAddAuth" width="600px"
                    @close = 'closeAuthForm'>

        </el-dialog>

    </div>

</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                btnState:{
                    searchLoad:false,
                },
                staffForm:{
                    staffName:'',
                    staffMonth:'',
                },

                authTable:[
                    {name:'名称', value:'value', },
                ],

                diaInfoArr:{
                    diaAuthTitle:'',
                    diaAddAuth:false,
                    formLabelWidth:'100px',
                },
                addProRules:{},

            };
        },
        methods: {
            btnSearch(){
                console.log(this.staffForm);
                this.GLOBAL.btnStateChange(this, 'btnState', 'searchLoad')
            },

            btnChangeAuth(){
                this.diaInfoArr.diaAddAuth = true;
            },

            closeAuthForm(){

            },

        },
        created() {

        },
    }
</script>
