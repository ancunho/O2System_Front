// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/dashboard/workplace',
    meta: { title: 'menu.index' },
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        component: RouteView,
        redirect: '/dashboard/workplace',
        hideChildrenInMenu: true,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard-workplace', keepAlive: true, hideHeader: true }
          }
        ]
      },

      // member
      {
        path: '/member',
        name: 'member',
        component: PageView,
        redirect: '/member/list',
        hideChildrenInMenu: true,
        meta: { title: 'menu.member', icon: 'user', permission: [ 'ROLE_ADMIN' ] },
        children: [
          {
            path: '/member/list',
            name: 'memberList',
            component: () => import('@/views/member/List'),
            meta: { title: 'menu.member-list', permission: [ 'ROLE_ADMIN' ] }
          }
        ]
      },

      // customer
      {
        path: '/customer',
        name: 'customer',
        component: PageView,
        redirect: '/customer/list',
        hideChildrenInMenu: true,
        meta: { title: 'menu.customer', icon: 'solution', permission: [ 'ROLE_ADMIN', 'ROLE_USER' ] },
        children: [
          {
            path: '/customer/list',
            name: 'customerList',
            component: () => import('@/views/customer/List'),
            meta: { title: 'menu.customer-list', permission: [ 'ROLE_ADMIN', 'ROLE_USER' ] }
          }
        ]
      },

      // project
      {
        path: '/project',
        name: 'project',
        component: RouteView,
        redirect: '/project/list',
        hideChildrenInMenu: true,
        meta: { title: 'menu.project', icon: 'project', permission: [ 'ROLE_ADMIN', 'ROLE_USER' ] },
        children: [
          {
            path: '/project/list',
            name: 'projectList',
            component: () => import('@/views/project/List'),
            meta: { title: 'menu.project-list', permission: [ 'ROLE_ADMIN', 'ROLE_USER' ] }
          },
          {
            path: '/project/view',
            name: 'projectView',
            component: () => import('@/views/project/View'),
            meta: { title: 'menu.project-view', permission: [ 'ROLE_ADMIN', 'ROLE_USER' ] }
          },
          {
            path: '/project/edit',
            name: 'projectEdit',
            component: () => import('@/views/project/Edit'),
            meta: { title: 'menu.project-edit', permission: [ 'ROLE_ADMIN', 'ROLE_USER' ] }
          }
        ]
      },

      // account
      {
        path: '/account',
        name: 'account',
        component: RouteView,
        redirect: '/account/settings',
        hidden: true,
        meta: { title: 'menu.account', keepAlive: true, icon: 'user' },
        children: [
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            meta: { title: 'menu.account-settings', hideHeader: true },
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: 'menu.account-settings-base' }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: 'menu.account-settings-security' }
              }
            ]
          }
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
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'recover',
        name: 'recover',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Recover')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
