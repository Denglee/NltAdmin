import { Message } from 'element-ui';
import router from '../router/router'

const state = {
    layoutWidth:'150',   //左侧导航宽度
}

const getters = {
    getsLayoutWidth(state, layoutWidth) {
        return state.layoutWidth;
    },
}

const mutations = {
    mutLayoutWidth: (state, data) => {
        console.log(data);
        state.layoutWidth = data;
    },
}

const actions = {
    /* 调用 获取用户信息*/
    actLayoutWidth({commit},val){
        console.log(val);
        return commit('mutLayoutWidth',val);
    },
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}