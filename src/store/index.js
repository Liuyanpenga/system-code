import { createStore } from 'vuex'
export default createStore({
  state: {
    isCollapse: true,
    currentMenu: null,
    tagsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ]
  },
  mutations: {
    updateIsCollapse(state, payload) {
      // console.log(payload);
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      // 判断
      // val.name == 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
      if (val.name == 'home') {
        state.currentMenu = null
      } else {
        state.currentMenu = val
        let result = state.tagsList.findIndex(item => item.name === val.name)
        result == -1 ? state.tagsList.push(val) : ''
      }
    },
    closeTag(state, val) {
      let res = state.tagsList.findIndex(item => item.name === val.name)
      state.tagsList.splice(res, 1)
    }
  }
})