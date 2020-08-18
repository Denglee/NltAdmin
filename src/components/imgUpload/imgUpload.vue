<template>
    <div>
        <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :http-request="httpRequest">
            <i   class="el-icon-plus avatar-uploader-icon"></i>
            <!--            <el-input v-model.trim="item.secretKeyFileName" readonly></el-input>-->
            <!--            <el-button type="primary" @click="getFile(index)">选取文件</el-button>-->
            <!--            <div slot="tip" class="el-upload__tip">文件上传限制说明</div>-->
        </el-upload>

    </div>
</template>

<script>
    import {ApiImgUplod} from "../../assets/js/api";

    export default {
        name: "imgUpload",    //图片上传插件
        data() {
            return {}
        },
        methods: {

            // 成功  回调
            handleAvatarSuccess(res, file){
                console.log(res);
                console.log(file);
            },

            /*接口*/
            FnApiImgUplod(file){
                ApiImgUplod({
                    img:file,
                    phone:'17688829466',
                    city_id:'17',
                }).then(res=>{
                    console.log(res);
                    this.handleAvatarSuccess(res);

                })
            },

            /*上传*/
            httpRequest(data) {
                this.GLOBAL.getEleBase64(data.file).then(res=>{
                    console.log(res);
                    this.FnApiImgUplod(res);
                })
            },


        },
        created() {

        },
    }
</script>
