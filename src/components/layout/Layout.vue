<template>
    <el-row type="flex" class="layout-box row-bg" justify="space-between" :data="getsLayoutWidth">
        <!--左侧侧边导航-->
        <el-col :span="2" class="layout-left" :style="{width:getsLayoutWidth+'px',}">
            <LeftNav></LeftNav>
        </el-col>

        <!--右侧主体内容-->
        <el-col :span="22" class="layout-right" :style="{marginLeft:getsLayoutWidth+'px',}" >

            <!--右侧头部-->
            <header class="layoutR-header">
                <!-- 头部 -->
                <header-top/>
                <!--左侧点击路由添加显示在头部导航-->
                <tag-nav></tag-nav>
            </header>

            <!--右边主体内容-->
            <router-view></router-view>

            <!--回到顶部-->
            <el-backtop :bottom="20">
                <el-tooltip content="回到顶部" placement="right">
                    <span></span>
                </el-tooltip>
            </el-backtop>

        </el-col>
    </el-row>
</template>

<script>
    // import HeaderBar from './HeaderBar'
    import HeaderTop from './HeaderTop'
    import LeftNav from './LeftNav'
    import TagNav from './TagNav'

    import {mapState,mapActions, mapGetters} from 'vuex'

    export default {
        data(){
            return{
                localUrl:this.GLOBAL.localUrl,
                // dialogFormVisible:'false',
                // activeIndex: '1',
                // activeIndex2: '1',
            }
        },
        methods:{
            getGlobal(){
                // console.log(this.localUrl);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            changePass(){

            }
        },
        created() {
          this.getGlobal();
        },
        components:{
            // HeaderBar,
            HeaderTop,
            LeftNav,
            TagNav
        },

        computed: {
            ...mapGetters('otherStore',[ //用mapGetters来获取collection.js里面的getters
                'getsLayoutWidth',
            ]),
        }

    }
</script>
<style lang="scss">
    @import "@/assets/css/LayoutNav.scss";

</style>
