<template>
    <div>

        <el-form :model="addGroupPar" class="dia-form" label-width="120px" ref="addForm"  :rules="changeRules">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addGroupPar.username" disabled clearable placeholder="用户名" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addGroupPar.password" show-password clearable placeholder="密码" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkedPassword">
                <el-input v-model="addGroupPar.checkedPassword"  show-password clearable placeholder="确认密码" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" style="text-align: right;">
            <el-button type="primary" @click="sureDiaGroup('addForm')" :loading="ArrAddGroup.btnSureGroup">确 定</el-button>
        </div>

    </div>
</template>

<script>
    import {updatePasswordApi} from "../../../assets/js/api";

    export default {
        props:{
            changePassVal:{},
        },
        name: "changePass",
        watch: {
            'changePassVal': function (val) {//监听props中的属性
                this.addGroupPar.username = val.username;
            },
            immediate: true,
        },
        data() {

            /*新密码验证规则*/
            let validateNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else if(value.length<=5){
                    callback(new Error('密码不能少于6位数'));
                }  else {
                    callback();
                }
            };

            /*确认密码验证规则*/
            let validateCheckPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if(value.length<=5){
                    callback(new Error('密码不能少于6位数'));
                } else if (value !== this.addGroupPar.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                //添加 弹窗相关
                ArrAddGroup:{
                    btnSureGroup:false,
                },

                /*添加/编辑组*/
                addGroupPar:{
                    username:this.changePassVal.username,
                    password:'',
                    checkedPassword:'',
                },

                /*修改密码 form  changeRules 对应 :rules*/
                changeRules: {
                    password: [
                        { validator: validateNewPass, trigger: 'blur' }
                    ],
                    checkedPassword: [  //确认密码
                        { validator: validateCheckPass, trigger: 'blur' }
                    ],
                },
            }
        },

        methods: {
            /* api4 - 修改密码 接口 */
            FnAddPromiseGroup(addPar){
                updatePasswordApi( addPar).then(res=>{
                    console.log(res);
                    this.GLOBAL.axiosCallback(res,this);
                }).catch(res=>{
                    this.$message.error(res);
                })
            },

            /* 编辑/添加 弹窗确定 提交*/
            sureDiaGroup(formName){
                let that = this;
                that.$refs[formName].validate((valid) => {
                    that.GLOBAL.btnStateChange(this,'ArrAddGroup','btnSureGroup');
                    if (valid) {

                        let addPar = {
                            name:this.addGroupPar.name,
                            username:this.addGroupPar.username,
                            password:this.addGroupPar.password,
                        }
                        this.FnAddPromiseGroup(addPar);

                        // return false
                        // let type = this.ArrAddGroup.type;
                        // if(type == '1' ){
                        //     // 调用添加
                        //     console.log('调用添加');
                        //
                        //     this.FnAddPromiseGroup(addPar);
                        // }else{
                        //     // 调用更新
                        //     console.log('调用更新');
                        //     let editPar = {
                        //         id:this.addGroupPar.id,
                        //         name:this.addGroupPar.name,
                        //         pid:this.addGroupPar.pid,
                        //     }
                        //     this.FnUupdateGroup(editPar);
                        // }

                    }
                });
            },

            FnClearValidate(){
                this.$nextTick(()=>{
                    this.$refs.addForm.clearValidate();
                })
            },


        },
        created() {

        },
    }
</script>
