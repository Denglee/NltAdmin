<template>
    <div class="headerTop-userInfo">
        <el-dropdown  @command="handleSetLanguage">
            <div class="el-dropdown-link">
                <div class="user-name">
                    {{$t('login.username')}}
                </div>
                <div><i class="el-icon-caret-bottom"></i></div>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="cn">中文(简体)</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
                <el-dropdown-item command="id">bahasa</el-dropdown-item>
                <el-dropdown-item command="ta">மொழி</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>

<!--    <el-dropdown trigger="click" class='international' @command="handleSetLanguage">-->
<!--        <div>-->
<!--            <span class="el-dropdown-link">{{language}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></span>-->
<!--            <div>{{$t('login.username')}}</div>-->
<!--        </div>-->
<!--        <el-dropdown-menu slot="dropdown">-->
<!--            <el-dropdown-item command="cn">中文</el-dropdown-item>-->
<!--            <el-dropdown-item command="en">English</el-dropdown-item>-->
<!--            <el-dropdown-item command="id">印尼语</el-dropdown-item>-->
<!--            <el-dropdown-item command="id">马来语</el-dropdown-item>-->
<!--        </el-dropdown-menu>-->
<!--    </el-dropdown>-->
</template>
<script>
    export default {
        data () {
            return {
                language: ''
            }
        },
        mounted () {
            let nowLang = localStorage.lang;
            if(!nowLang){
                nowLang = 'cn';
                localStorage.setItem('lang', 'cn')
            }
            /*console.log(nowLang);*/
            this.getLanguage(nowLang);

            //TODO  1、样式切换 ： 导航宽度自定  ？  固定 ； 2、路由命名； 3、i18n 多语言完善。

        },
        methods: {
            handleSetLanguage (lang) {
                this.$i18n.locale = lang;
                localStorage.setItem('lang', lang);
                this.getLanguage(lang);
            },
            getLanguage (val) {
                if(val === 'ta'){
                    this.language = 'ta';
                    console.log('lang == ta');
                    import('@/assets/i81n/css/ta.scss');
                }
                if (val === 'cn') {
                    this.language = '中文';
                }
                if (val === 'en') {
                    this.language = 'English';
                }
                if (val === 'id') {
                    this.language = 'id';
                }
            },
        }
    }
</script>
<!--<style>-->
<!--    .international .el-dropdown-link {  cursor: pointer;  color: #c0ccda;  font-size: 14px;  }-->
<!--    .el-icon-arrow-down {  font-size: 14px;  }-->
<!--</style>-->
<!--<style scoped>-->
<!--    .international-icon {-->
<!--        font-size: 20px;-->
<!--        cursor: pointer;-->
<!--        vertical-align: -5px !important;-->
<!--    }-->
<!--</style>-->