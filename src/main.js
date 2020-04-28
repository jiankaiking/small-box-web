import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import mixins from './filters/global'
import * as globalFilter from './filters/filters'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.scss'
Vue.config.productionTip = false
Object.keys(globalFilter).forEach(key => {
  Vue.filter(key, globalFilter[key])
})
Vue.use(ElementUI)
Vue.mixin(mixins)
// 路由守卫
router.beforeEach((to, from, next) => {
  if (!store.state.UserToken) { // 未登录
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    if (store.state.permission.sidebarMenu.length === 0) { // 已登录未配置路由
      store.dispatch('permission/FETCH_PERMISSION').then(() => {
        next(
          to.fullPath
        )
      })
    } else { // 已配置路由的刷新事件
      if (to.path !== '/login') {
        next()
      } else {
        next(from.fullPath)
      }
    }
  }
})
router.afterEach((to, from, next) => {
  var routerList = to.matched
  store.commit('setCrumbList', routerList)
  if(to.meta.isTitle){
    store.commit('permission/SET_CURRENT_MENU', to.name)
  }
  
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
