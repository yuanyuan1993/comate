import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}
const mutations = {
    handleGoodsname: (state, goodsname) => {
        state.goodsname = goodsname
    },
    handleCategory: (state, category) => {
        state.category = category
    }
}
const state = {
    goodsname: '',
    category:'',
}
// getters 只会依赖 state 中的成员去更新
const getters = {
    goodsname: (state) => state.goodsname,
    category:(state) => state.category
}

const store = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
export default store 