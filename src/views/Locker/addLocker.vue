<template>
    <div>
        <el-form label-position="left" :model="addLockerPar" class="dia-form" label-width="120px" ref="addForm">
            <el-form-item label="设备号" prop="dev_no"  :rules="{ required: true, message: '设备号不能为空', trigger: 'blur' }">
                <el-input v-model="addLockerPar.dev_no" clearable placeholder="设备号" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="SN号" prop="serial_no">
                <el-input v-model="addLockerPar.serial_no" clearable placeholder="SN号" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮编号" prop="postal_code">
                <el-input v-model="addLockerPar.postal_code" clearable placeholder="邮编号" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分组识别" prop="label">
                <el-input v-model="addLockerPar.label" clearable placeholder="分组识别" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="柜子地址" prop="location">
                <el-input v-model="addLockerPar.location" clearable placeholder="柜子地址" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="城市id" prop="city_id">
                <el-input v-model="addLockerPar.city_id" clearable placeholder="城市id" class="dia-inp" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer-toRight">
            <!--            <el-button @click="showState.diaLocker = false" plain>取 消</el-button>-->
            <el-button type="primary" @click="sureDiaLocker('addForm')" :loading="ArrAddLocker.btnSureLocker">确 定</el-button>
        </div>

    </div>
</template>

<script>
    import {addLockerApi, updateLockerApi} from "../../assets/js/api";
    export default {
        inject:['reLoad'],
        name: "addLocker",
        props:{
            addLockerPar:{},
            addLockerType:'',
        },
        data() {
            return {

                ArrAddLocker:{
                    btnSureLocker:false,
                }
            }
        },
        methods: {
            /* 编辑/添加 弹窗确定 提交*/
            sureDiaLocker(formName){
                console.log(this.addLockerPar);
                let addLockerType = this.addLockerType;
                this.$refs[formName].validate((valid) => {
                    this.GLOBAL.btnStateChange(this,'ArrAddLocker','btnSureLocker');
                    if (valid) {
                        /*添加*/
                        if(addLockerType == '1'){
                            console.log('locker add');

                            let addPar = this.addLockerPar;
                            addLockerApi( addPar).then(res=>{
                                console.log(res);
                                /*this.GLOBAL.axiosCallback(res,this);*/
                            }).catch(res=>{
                                this.$message.error(res);
                            })
                        }

                        if(addLockerType == '2'){
                            console.log('locker change');
                            let addPar = this.addLockerPar;
                            updateLockerApi( addPar).then(res=>{
                                console.log(res);
                                /*this.GLOBAL.axiosCallback(res,this);*/
                            }).catch(res=>{
                                this.$message.error(res);
                            })
                        }

                    }
                });
            },
        },
        created() {

        },
    }
</script>
