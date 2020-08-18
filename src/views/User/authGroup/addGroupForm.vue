<template>
    <div>
        <el-form :model="addGroupPar" class="dia-form" label-width="120px" ref="addForm"  :rules="changeRules">
            <el-form-item label="分组名称" prop="name"  :rules="{ required: true, message: '用户名不能为空', trigger: 'blur' }">
                <el-input v-model="addGroupPar.name" clearable placeholder="分组名称" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="组管理员" prop="username"  :rules="{ required: true, message: '组管理员不能为空', trigger: 'blur' }">
                <el-input v-model="addGroupPar.username" clearable placeholder="组管理员" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="组管理员密码" prop="password">
                <el-input v-model="addGroupPar.password" show-password clearable placeholder="组管理员密码" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="组管理员确认密码" prop="checkedPassword">
                <el-input v-model="addGroupPar.checkedPassword"  show-password clearable placeholder="组管理员确认密码" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
<!--            <el-button @click="showState.diaGroup = false" plain>取 消</el-button>-->
            <el-button type="primary" @click="sureDiaGroup('addForm')" :loading="ArrAddGroup.btnSureGroup">确 定</el-button>
        </div>

    </div>
</template>

<script>
    import {addGroupApi, updateGroupApi} from "../../../assets/js/api";


    export default {
        inject:['reLoad'],
        name: "addGroupForm",
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
                    name:'',
                    username:'',
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
            /* 编辑/添加 弹窗确定 提交*/
            sureDiaGroup(formName){
                this.$refs[formName].validate((valid) => {
                    this.GLOBAL.btnStateChange(this,'ArrAddGroup','btnSureGroup');
                    if (valid) {
                        let addPar = {
                            name:this.addGroupPar.name,
                            username:this.addGroupPar.username,
                            password:this.addGroupPar.password,
                        }
                        addGroupApi( addPar).then(res=>{
                            console.log(res);
                            this.GLOBAL.axiosCallback(res,this);
                        }).catch(res=>{
                            this.$message.error(res);
                        })
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
