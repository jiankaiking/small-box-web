import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const RouterMap = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component (resolve) {
      require.ensure(['../pages/login/login'], () => {
        resolve(require('../pages/login/login'))
      })
    },
    meta: {
      title: '登录',
      icon: 'el-icon-menu',
      isTitle: false
    }
  },
  {
    path: '/',
    redirect: '/contentManage',
    component (resolve) {
      require.ensure(['../pages/home/home'], () => {
        resolve(require('../pages/home/home'))
      })
    },
    children: [
      // 内容管理
      {
        path: '/contentManage',
        name: 'contentManage',
        component (resolve) {
          require.ensure(['../pages/content/content'], () => {
            resolve(require('../pages/content/content'))
          })
        },
        meta: {
          title: '内容管理',
          icon: 'el-icon-s-management',
          isTitle: true
        },
        children: [
          // 影院详情
          {
            path: '/cinemaDetail',
            name: 'cinemaDetail',
            component (resolve) {
              require.ensure(['../pages/content/components/cinemaDetail'], () => {
                resolve(require('../pages/content/components/cinemaDetail'))
              })
            },
            meta: {
              title: '影院详情',
              parentPath: '/content',
              requireAuth: false
            }
          }
        ]
      },
      // 商品管理
      {
        path: '/commodityManage',
        name: 'commodityManage',
        component (resolve) {
          require.ensure(['../pages/commodityManage/commodity'], () => {
            resolve(require('../pages/commodityManage/commodity'))
          })
        },
        meta: {
          title: '商品管理',
          icon: 'el-icon-s-shop',
          isTitle: true
        },
        children: [
          // 会员详情
          {
            path: '/commodityDetail',
            name: 'commodityDetail',
            component (resolve) {
              require.ensure(['../pages/commodityManage/commodityDetail'], () => {
                resolve(require('../pages/commodityManage/commodityDetail'))
              })
            },
            meta: {
              title: '会员详情',
              parentPath: '/commodityManage',
              requireAuth: false
            }
          }
        ]
      },
      // 订单管理
      {
        path: '/orderManage',
        name: 'orderManage',
        component (resolve) {
          require.ensure(['../pages/orderManage/order'], () => {
            resolve(require('../pages/orderManage/order'))
          })
        },
        meta: {
          title: '订单管理',
          icon: 'el-icon-s-order',
          isTitle: true
        },
        children: [
          // 订单详情
          {
            path: '/orderDetail',
            name: 'orderDetail',
            component (resolve) {
              require.ensure(['../pages/orderManage/orderDetail'], () => {
                resolve(require('../pages/orderManage/orderDetail'))
              })
            },
            meta: {
              title: '订单详情',
              parentPath: '/orderManage',
              requireAuth: false
            }
          }
        ]
      },
      // 用户管理
      {
        path: '/userManage',
        name: 'userManage',
        component (resolve) {
          require.ensure(['../pages/userManage/userManage'], () => {
            resolve(require('../pages/userManage/userManage'))
          })
        },
        meta: {
          title: '用户管理',
          icon: 'el-icon-s-custom',
          isTitle: true
        },
        children: [
          // 用户详情
          {
            path: '/userManageDetail',
            name: 'userManageDetail',
            component (resolve) {
              require.ensure(['../pages/userManage/userManageDetail'], () => {
                resolve(require('../pages/userManage/userManageDetail'))
              })
            },
            meta: {
              title: '用户详情',
              parentPath: '/userManage',
              requireAuth: false
            }
          }
        ]
      },
      // 意见管理
      {
        path: '/opinionManage',
        name: 'opinionManage',
        component (resolve) {
          require.ensure(['../pages/opinionManage/opinionManage'], () => {
            resolve(require('../pages/opinionManage/opinionManage'))
          })
        },
        meta: {
          title: '意见管理',
          icon: 'el-icon-message-solid',
          isTitle: true
        }
      },
      // 常见问题
      {
        path: '/question',
        name: 'question',
        component (resolve) {
          require.ensure(['../pages/question/question'], () => {
            resolve(require('../pages/question/question'))
          })
        },
        meta: {
          title: '常见问题',
          icon: 'el-icon-question',
          isTitle: true
        },
        children: [
          // 添加问题
          {
            path: '/questionDetail',
            name: 'questionDetail',
            component (resolve) {
              require.ensure(['../pages/question/questionDetail'], () => {
                resolve(require('../pages/question/questionDetail'))
              })
            },
            meta: {
              title: '添加问题',
              parentPath: '/question',
              requireAuth: false
            }
          }
        ]
      },
      // 基础设置
      {
        path: '/baseManage',
        name: 'baseManage',
        component (resolve) {
          require.ensure(['../pages/baseManage/baseManage'], () => {
            resolve(require('../pages/baseManage/baseManage'))
          })
        },
        meta: {
          title: '基础设置',
          icon: 'el-icon-s-tools',
          isTitle: true
        }
      }
    ]
  }
]
export default new Router({
  routes: RouterMap
})
