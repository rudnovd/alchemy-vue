import Vue from 'vue'

import Router from 'vue-router'

import store from '@/store'

import { getLogin } from '@/js/api/authentication'

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

// Do before load router
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title

  // If not logged in, check login
  if (!store.getters['user/isLoggedIn']) {
    getLogin().then(response => {
      // If find session, move user data in store
      if (response.data.user) {
        store.dispatch('user/setUser', response.data.user)
      }
      next()
    })
  } else {
    next()
  }
})

router.beforeResolve((to, from, next) => {
  if (requireAuthPassed(to) === true) {
    next()
  } else {
    next({ path: '/' })
  }

  if (requireAdminRolePassed(to) === true) {
    next()
  } else {
    next({ path: '/' })
  }
})

function requireAuthPassed (to) {
  // If route need auth, check logged in
  if (to.matched.some(record => record.meta.authRequired)) {
    if (store.getters['user/isLoggedIn']) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

function requireAdminRolePassed (to) {
  // If route need admin role, check role
  if (to.matched.some(record => record.meta.adminRoleRequired)) {
    if (store.getters['user/isAdmin']) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

export default router
