import Vue from 'vue'
import Vuex from 'vuex'
import permission from './permission'
const state = {
  /* 设置token */
  set UserToken (value) {
    localStorage.setItem('token', value)
  },
  /* 获取token */
  get UserToken () {
    return localStorage.getItem('token')
  },
  /* 导航菜单是否折叠 */
  isSidebarNavCollapse: false,
  /* 面包屑导航列表 */
  crumbList: [],
  crumbIndex: 0,
  getParam: null
}
const getters = {
  // 状态栏切换
  getCollapse (state) {
    return state.isSidebarNavCollapse
  }
}
const mutations = {
  // 登入
  LOGIN_IN (state, token) {
    state.UserToken = token
  },
  // 登出
  LOGIN_OUT (state) {
    state.UserToken = ''
    state.getParam = null
    state.permission.sidebarMenu = []
    localStorage.clear()
  },
  // 切换侧边栏
  toggleNavCollapse (state) {
    state.isSidebarNavCollapse = !state.isSidebarNavCollapse
  },
  onlyCollapse (state, isSidebarNavCollapse) {
    state.isSidebarNavCollapse = isSidebarNavCollapse
  },
  // 暂存搜索数据
  setParam (state, getParam) {
    state.getParam = getParam
  },
  // 删除搜索数据
  clearParam (state) {
    state.getParam = null
  },
  // 顶部栏Tab
  setCrumbList (state, list) {
    if (list.length === 3) {
      list.splice(1, 1)
    }
    state.crumbList = list
  },
  // 顶部栏Tab事件
  setCrumbIndex (state, crumbIndex) {
    state.crumbIndex = crumbIndex
  }
}
const actions = {}

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    permission: permission
  }
})
