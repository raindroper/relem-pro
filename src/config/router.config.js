// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: 'el-icon-platform-eleme', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析盘', keepAlive: false, icon: 'el-icon-platform-eleme', permission: ['dashboard'] }
          },
          {
            path: '/dashboard/analysis2',
            name: 'Analysis2',
            component: () => import('@/views/dashboard/Analysis2'),
            meta: { title: '分析盘1', keepAlive: false, icon: 'el-icon-platform-eleme', permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/test',
        name: 'Test',
        redirect: '/test/analysis',
        component: RouteView,
        meta: { title: 'menu.dashboard.monitor', keepAlive: true, icon: 'el-icon-platform-eleme', permission: ['dashboard'] },
        children: [
          // {
          //   path: '/test/analysis',
          //   name: 'TAnalysis',
          //   component: () => import('@/views/dashboard/Analysis'),
          //   meta: { title: '分析盘T', keepAlive: false, icon: 'el-icon-platform-eleme', permission: ['dashboard'] }
          // }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
