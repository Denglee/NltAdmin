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
    import {mapState,mapActions, mapGetters} from 'vuex'
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
        },

        methods: {
            ...mapActions('otherStore',[ //footerStatus是指modules文件夹下的no1.js
                'actLayoutWidth',  //footerStatus.js文件中的actions里的方法，在上面的@click中执行并传入实参
            ]),

            handleSetLanguage (lang) {
                this.$i18n.locale = lang;
                localStorage.setItem('lang', lang);
                this.getLanguage(lang);
            },
            getLanguage (val) {
                if(val === 'ta'){
                    this.language = 'ta';
                    console.log('lang == ta');
                    this.actLayoutWidth('220');
                }
                if (val === 'cn') {
                    this.language = '中文';
                    this.actLayoutWidth('150');
                }
                if (val === 'en') {
                    this.language = 'English';
                    this.actLayoutWidth('150');
                }
                if (val === 'id') {
                    this.language = 'id';
                    this.actLayoutWidth('220');
                    /*import('@/assets/i81n/css/ta.scss');*/
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