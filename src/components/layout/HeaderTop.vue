<template>
    <div class="headerTop-box">
        <div class="headerTop-user">

            <div class="clearfix">
               <!-- <div class="header-cityName ellipsis" @click="goIndex()" :title="UserInfo.city_name || '' ">
                    <i class="el-icon-s-home"></i>{{UserInfo.city_name  || "智迈科技"}} - 后台首页
                </div>-->

                <!--<a :href="localUrl+ '/admin/index/index.html'" title="旧版地址" class="header-cityName goOldUrl">回到旧版</a>-->
            </div>

            <div class="header-rMain">

                <LangeSelect></LangeSelect>

                <!--头部用户信息+退出+更换密码 -->
                <div class="headerTop-userInfo">
                    <!--<img class="userHeader" :src='localUrl+"/"+userInfo.logo || "assets/images/logo-daka.png"' alt="">-->
                    <el-dropdown class="dropdown-header">
                        <div class="el-dropdown-link">
                            <div class="user-name">{{userInfo.username || 'user1'}}</div>
                            <div><i class="el-icon-caret-bottom"></i></div>
                        </div>
                        <el-dropdown-menu slot="dropdown"
                                          hide-timeout="30000"
                                          class="dropdown-HeaderTop">
                            <el-dropdown-item style="text-align: center; color: #fff;">{{userInfo.username}}</el-dropdown-item>
                           <!-- <el-dropdown-item command="a">
                                <el-button type="text" @click="diaChangePass = true">更换密码</el-button>
                            </el-dropdown-item>-->
                            <el-dropdown-item command="b">
                                <el-button type="text" @click="loginOut()">退出</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>

        </div>

        <!--更换密码弹出-->
        <el-dialog  :append-to-body="true" title="更换密码"
                   :visible.sync="diaChangePass"
                   custom-class="passAlert"
                   width="600px">
            <el-form :model="changePassForm" status-icon :rules="changeRules" ref="changePassForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="oldPass">
                    <el-input type="password" :show-password="true" v-model="changePassForm.oldPass" autocomplete="off"  clearable></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                    <el-input type="password" :show-password="true" v-model="changePassForm.newPass" autocomplete="off"  clearable></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" :show-password="true" v-model="changePassForm.checkPass" autocomplete="off"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" class="btn-public" @click="submitForm('changePassForm')">提交</el-button>
                    <el-button size="small" @click="resetForm('changePassForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--<el-button size="small" @click="reLoad()">刷新</el-button>-->

    </div>
</template>

<script>

    import {ApiloginOut,ApiChangePass,ApiTopSearch} from '@/assets/js/api'
    import LangeSelect from "../LangeSelect/LangeSelect";

    import {mapState,mapActions, mapGetters} from 'vuex'
    let btnStateChange = true;  //修改密码按钮点击状态
    export default {
        /*在页面注入App.vue组件提供（provide）的 reload 依赖，在逻辑完成之后（删除或添加...）,
        直接this.reload()调用，即可刷新当前页面*/
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "HeaderTop",
        data() {
            /*旧密码验证规则*/
            let validateOldPass= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('旧密码不能为空'));
                } else if(value.length<=5){
                    callback(new Error('密码不能少于6位数'));
                }  else {
                    callback();
                }
            };
            /*新密码验证规则*/
            let validateNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('新密码不能为空'));
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
                } else if (value !== this.changePassForm.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                // cityName:'',
                localUrl:this.GLOBAL.localUrl,

                SearchVal:"",  //搜索框值
                diaChangePass: false,   //修改密码弹出框状态

                formLabelWidth: '80px',

                /*修改密码 form  changePassForm 对应v-model*/
                changePassForm: {
                    oldPass: '',
                    newPass:'',
                    checkPass: '',
                },

                userInfo:'',

                /*修改密码 form  changeRules 对应 :rules*/
                changeRules: {
                    oldPass: [
                        { validator: validateOldPass, trigger: 'blur' }
                    ],
                    newPass: [
                        { validator: validateNewPass, trigger: 'blur' }
                    ],
                    checkPass: [  //确认密码
                        { validator: validateCheckPass, trigger: 'blur' }
                    ],
                },
            }
        },
        methods: {
            ...mapActions({
                ACTlogout:'StoreTagNav/ACTlogout',   //store里 loginOut 退出登录方法
                mutUserInfo:'StoreTagNav/actUserInfo',
            }),

            /*退出登录*/
            loginOut(){
                let that = this;
                ApiloginOut().then(res=>{
                    console.log(res);
                    this.ACTlogout();
                    if(res.status == 1){
                        localStorage.removeItem('userInfo');
                        this.$message({
                            type:'success',
                            duration:1500,
                            message:"退出成功！",
                            offset:100,
                        });

                        setTimeout(()=>{
                            that.$router.push({path:'/login'})
                        },1500)
                    }
                })
            },

            /*搜索*/
            //queryString 为在框中输入的值
            //callback 回调函数,将处理好的数据推回
            querySearchAsync(queryString, callback) {
                // console.log(queryString);
                if(queryString){
                    let list =[];
                    ApiTopSearch({
                        keyword:queryString,
                    }).then(res=>{
                        if(res.value){
                            for(let i of res.value){
                                i.value = i.phone;
                            }
                            list = res.value;
                        } else{
                            list = [];
                        }
                        console.log(list);
                        callback(list);
                    }).catch(res=>{
                        console.error(res);
                    });
                }
            },

            /*选中*/
            handleSelect(item) {
                console.log(item);
                if(item.member_type == 1) {
                    console.log('正式会员');
                    let user_id = item.id;
                    console.log(user_id);
                    this.$router.push({name:'Memberreal_member',params:{'user_id':user_id,}});
                }
                if(item.member_type == 0){
                    console.log('非正式会员');
                    let user_id = item.id;
                    this.$router.push({name:'Memberindex', params:{'user_id':user_id,}})
                }
            },

            /*修改密码提交*/
            submitForm(changePassForm) {
                this.$refs[changePassForm].validate((valid) => {
                    if (valid && btnStateChange) {
                        console.log(btnStateChange);
                        btnStateChange = false;
                        setTimeout(()=>{
                            btnStateChange = true;
                        },1000);

                        let uid = this.UserInfo.uid;
                        let old_password = this.changePassForm.oldPass;
                        let new_password = this.changePassForm.newPass;
                        console.log(`${uid},${old_password},${new_password}`);
                        ApiChangePass({
                            uid:uid,
                            old_password:old_password,
                            new_password:new_password,
                        }).then(res =>{
                            if(res.status == 1){
                                this.$message({
                                    message: res.info,
                                    type: 'success',
                                    duration:1500,
                                    offset:100,
                                });
                                setTimeout(()=>{
                                    this.diaChangePass = false;
                                    /*刷新页面*/

                                },1500)
                            }
                            if(res.status == 0){
                                this.$message({
                                    message: res.info,
                                    type: 'error',
                                    duration:3000,
                                    offset:40,
                                });
                            }
                        }).catch(res=>{
                            console.log(res);
                        })
                    } else {
                        console.error('确认密码提交失败!!');
                        return false;
                    }
                });
            },
            /*修改密码 重置*/
            resetForm(changePassForm) {
                this.$refs[changePassForm].resetFields();
            },

            /*回到首页*/
            goIndex(){
                // this.$router.push({path:'/index'});
            },

        },
        created() {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            // console.log(userInfo);
            if(!userInfo){
                this.$message({
                    message:'登录过期',
                    // icon:'fail',
                    duration:2000,
                    type:'error',
                    offset:100,
                });
                setTimeout(() =>{
                    this.$router.push({path:'/login'});
                },1500)
            }else{
                this.userInfo = userInfo;
                if(userInfo.logo == 1){
                    this.userInfo.logo='statics/Admin/wxlogin/img/108.png'
                }
            }
        },

        components:{
            LangeSelect
        },
    }
</script>
