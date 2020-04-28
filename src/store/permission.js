import {
  RouterMap
} from '../router'

export default {
  namespaced: true,
  state: {
    permissionList: null /** 所有路由 */,
    sidebarMenu: [] /** 导航菜单 */,
    currentMenu: '' /** 当前active导航菜单 */
  },
  getters: {},
  mutations: {
    SET_PERMISSION (state, routes) {
      state.permissionList = routes
    },
    CLEAR_PERMISSION (state) {
      state.permissionList = null
    },
    SET_MENU (state, menu) {
      state.sidebarMenu = menu
    },
    CLEAR_MENU (state) {
      state.sidebarMenu = []
    },
    SET_CURRENT_MENU (state, currentMenu) {
      state.currentMenu = currentMenu
    }
  },
  actions: {
    async FETCH_PERMISSION ({
      commit,
      state
    }) {
      commit('SET_MENU', RouterMap[1].children)
    }
  }
}
