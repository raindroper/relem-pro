// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView } from '@/layouts'

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
            meta: {
              title: 'menu.dashboard-analysis',
              keepAlive: false,
              icon: 'el-icon-platform-eleme',
              permission: ['dashboard']
            }
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
        path: '/table',
        name: 'Table',
        redirect: '/table/search',
        component: RouteView,
        meta: { title: 'menu.table', keepAlive: false, icon: 'fa-rocket', permission: ['table'] },
        children: [
          {
            path: '/table/search',
            name: 'SearchTable',
            component: () => import('@/views/table/SearchTable'),
            meta: { title: 'menu.table-search', keepAlive: false, icon: 'fa-rocket', permission: ['table'] }
          }
        ]
      },
      {
        path: '/form',
        name: 'Table',
        redirect: '/form/standard',
        component: RouteView,
        meta: { title: 'menu.form', keepAlive: false, icon: 'fa-rocket', permission: ['form'] },
        children: [
          {
            path: '/form/standard',
            name: 'StandardForm',
            component: () => import('@/views/form/StandardForm'),
            meta: { title: 'menu.form-standard', keepAlive: false, icon: 'fa-rocket', permission: ['form'] }
          }
        ]
      },
      {
        path: '/test',
        name: 'Test',
        redirect: '/test/analysis',
        component: RouteView,
        meta: {
          title: 'menu.dashboard-monitor',
          keepAlive: true,
          icon: 'el-icon-platform-eleme',
          permission: ['dashboard']
        },
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
