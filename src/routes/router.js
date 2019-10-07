import Vue from 'vue'

import Router from 'vue-router'

import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: 'Home' */ '@/routes/pages/Home'),
      meta: {
        title: 'Alchemy',
        authRequired: false,
        adminRoleRequired: false
      }
    },
    {
      path: '/game',
      component: () => import(/* webpackChunkName: 'Game' */ '@/routes/pages/Game'),
      meta: {
        title: 'Game | Alchemy',
        authRequired: false,
        adminRoleRequired: false
      }
    },

    // Admin routes
    {
      path: '/admin/dashboard/',
      component: () => import(/* webpackChunkName: 'Dashboard' */ '@/routes/pages/admin/Dashboard'),
      meta: {
        title: 'Dashboard | Alchemy',
        authRequired: true,
        adminRoleRequired: true
      }
    },
    {
      path: '/admin/elements',
      component: () => import(/* webpackChunkName: 'Elements' */ '@/routes/pages/admin/Elements'),
      meta: {
        title: 'Elements | Alchemy',
        authRequired: true,
        adminRoleRequired: true
      }
    },
    {
      path: '/admin/recipes',
      component: () => import(/* webpackChunkName: 'Recipes' */ '@/routes/pages/admin/Recipes'),
      meta: {
        title: 'Recipes | Alchemy',
        authRequired: true,
        adminRoleRequired: true
      }
    },
    {
      path: '/admin/users',
      component: () => import(/* webpackChunkName: 'Users' */ '@/routes/pages/admin/Users'),
      meta: {
        title: 'Users | Alchemy',
        authRequired: true,
        adminRoleRequired: true
      }
    },

    // Errors page
    {
      path: '*',
      component: () => import(/* webpackChunkName: 'Errors' */ '@/routes/pages/Errors.vue'),
      meta: {
        title: 'Error | Alchemy',
        authRequired: false,
        adminRoleRequired: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('user/getLogin').then(() => {
    const isAuth = store.getters['user/user'].isLoggedIn
    if (to.matched.some(record => record.meta.authRequired)) {
      if (!isAuth) {
        next({ path: '/' })
      }
    }

    const userRole = store.getters['user/user'].role
    if (to.matched.some(record => record.meta.adminRoleRequired)) {
      if (userRole !== 'Admin') {
        next({ path: '/' })
      }
    }

    document.title = to.meta.title

    next()
  })
})

export default router
