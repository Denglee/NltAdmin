<template>
    <div class="layoutR-contain animated fadeIn">
        <el-tree
                :data="menuArr"
                :show-checkbox = 'true'
                default-expand-all
                node-key="id"
                ref="tree"
                :default-checked-keys="defaultChecked"
                highlight-current
                :props="defaultProps">
        </el-tree>

        <el-button  @click="subMenu">提交</el-button>

    </div>
</template>

<script>
    import {getRoleAuthListApi,updateRoleAuthApi} from "../../../assets/js/api";

    export default {
        inject:['reLoad'],
        name: "groupMenu",   //菜单权限 页面
        props:{
            groupId: '',
            propsMenuArr:{},
        },
        data() {

            return {
                defaultChecked:[],

                defaultProps: {
                    children: 'sub_menu',
                    label: 'name',
                },
                menuArr:[],

                editGroupPar:{
                    id:'',
                    name:'',
                    pid:'',
                    auth_ids:'',
                }

            }
        },
        methods: {

            //获取当前
            FnGetRoleAuthList(){
                let authGrpupIds =this.propsMenuArr.auth_ids.split(",");
                console.log(authGrpupIds);
                this.defaultChecked = authGrpupIds;
                console.log(this.groupId);
                getRoleAuthListApi({
                    group_id:this.groupId,
                }).then(res => {
                    console.log(res);
                    this.menuArr = res.data;
                }).catch(res => {
                    console.log(res);
                });
            },

            // 更新接口
            FnUpdateRole(subGroupPar){
                updateRoleAuthApi(subGroupPar).then(res=>{
                    console.log(res);
                    this.GLOBAL.axiosCallback(res,this);
                }).catch(res=>{
                    console.log(res);
                })
            },

            // 关闭弹窗
            FnCloseDiaMenu(){
                this.$emit('closeDiaMenu');
            },

            // 提交
            subMenu(){
                let subMenuArr = this.$refs.tree.getCheckedKeys().join(',');
                console.log(subMenuArr);
                let subGroupPar = {
                    id:this.propsMenuArr.id,
                    auth_ids:subMenuArr,
                };
                console.log(subGroupPar);
                this.FnUpdateRole(subGroupPar);
            },
        },
        created() {

        },
    }
</script>
