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
    import {AllPromiseApi,getGroupApi,updateGroupAuthApi} from "../../../assets/js/api";

    export default {
        inject:['reLoad'],
        name: "groupMenu",   //菜单权限 页面
        props:{
            idsGroupMenu:{}, //权限组id
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
                    auth_ids:'',
                },

            }
        },
        methods: {

            // 获取全部 接口+ 数据
            FnGetAuth() {
                AllPromiseApi().then(res => {
                    console.log(res);
                    this.menuArr = res.data;
                    // let checkArr = res.data;
                    // res.data.forEach((item,index)=>{
                    //     item.sub_menu.forEach((item,index)=>{
                    //         if(item.is_check == 1){
                    //             this.defaultChecked.push(item.id)
                    //         }
                    //     })
                    // })
                }).catch(res => {
                    console.log(res);
                });
            },

            //获取当前 选择的 权限
            FnGetGroupAuth(){
                let nowIds = this.idsGroupMenu;
                console.log(nowIds)
                if(nowIds.length == 1){  //单选 就需要获取当前的权限
                    let  id = nowIds.join(",");  //赋值 提交 传值
                    this.editGroupPar.id = id;
                    console.log(id)
                    getGroupApi({id:id}).then(res => {
                        let authGrpupIds = res.data[0].auth_ids;
                        console.log(typeof (authGrpupIds));
                        this.defaultChecked = authGrpupIds;
                    }).catch(res => {
                        console.log(res);
                    });
                } else{  //如果多选 直接赋值空 不用获取
                    this.editGroupPar.id = this.idsGroupMenu.join(","); //赋值 提交 传值
                    this.defaultChecked = [];
                }
            },


            // 关闭弹窗
            FnCloseDiaMenu(){
                this.$emit('closeDiaMenu');
            },

            // 提交
            subMenu(){
                let subMenuArr = this.$refs.tree.getCheckedKeys().join(',');
                console.log(this.idsGroupMenu);

                let subGroupPar = {
                    ids:this.editGroupPar.id,
                    auth_ids:subMenuArr,
                };
                console.log(subGroupPar);

                updateGroupAuthApi(subGroupPar).then(res=>{
                    console.log(res);
                    this.GLOBAL.axiosCallback(res,this);
                }).catch(res=>{
                    console.log(res);
                })
            },
        },
        created() {
            // this.FnGetAuth();
            // this.FnGetGroupAuth();
            // console.log(this.propsMenuArr);
        },
    }
</script>
