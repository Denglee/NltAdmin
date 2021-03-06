import { Message } from 'element-ui';
// Vue.prototype.$message = Message;

// 全局 js
let localUrl = '';  //全局路径
var localOrigin = window.location.origin;

// console.log(localOrigin);
if(localOrigin == 'http://localhost:8282'){
    localUrl = 'http://vikily.f3322.net:20000';
} else {
    localUrl = localOrigin;
}
console.log(localUrl);


/*elementui把上传的图片转为base64*/
function getEleBase64(file) {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
            imgResult = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(imgResult);
        };
    });
    
    //调用 方法
    /*this.GLOBAL.getEleBase64(data.file).then(res=>{
        console.log(res);
    })*/
}

/*按钮点击状态 变化*/
function btnStateChange(that, id, val,  state = true,time=1500){
    that[id][val] = state;
    // that[id].text = textTrue;
    setTimeout(()=>{
        that[id][val] = false;
        // that[id].text = textFalse;
    },time);

    /*使用方法  搜索中 记得加状态 true */
    //this.GLOBAL.btnStateChange(this,'loadState','searchLoad',true);

}

function axiosCallback(res,isLoad){
    if(res.status == 1){
        Message.success({
            message: res.info,
            duration:1500,
            offset:40,
        });
        if(isLoad != undefined){
            setTimeout(()=>{
                isLoad.reLoad();
            },1500)
        }
        // this.$message({
        //     message: res.info,
        //     type: 'error',
        //     duration:1500,
        //     offset:40,
        // });

    }else{
        Message.error(res.info);
    }
}

export default {
    localUrl,
    getEleBase64:getEleBase64,

    btnStateChange:btnStateChange,

    axiosCallback:axiosCallback,
}