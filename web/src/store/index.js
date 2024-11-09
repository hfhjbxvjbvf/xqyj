import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map_user_info: {},
    vuex_skin_obj: {
      name: 'quwan',
      chinaName: '趣玩硬件',
    },
    isDarkTheme: true,
  },
  mutations: {
    map_set_user_info(state, data) {
      state.userInfo = data
    },
    vuex_set_skin_obj(state, data) {
      state.vuex_skin_obj = data
    },
  },
  actions: {},
  modules: {},
  computed:{
    IsDark(){
      return this.isDarkTheme
    }
  }
});