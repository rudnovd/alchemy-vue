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
      name: 'Home',
      component: () => import(/* webpackPrefetch: true, webpackChunkName: 'Home' */ '@/routes/pages/Home'),
      meta: {
        title: 'Alchemy'
      }
    },
    {
      path: '/game',
      name: 'Game',
      component: () => import(/* webpackChunkName: 'Game' */ '@/routes/pages/Game'),
      meta: {
        title: 'Game | Alchemy'
      }
    },

    // Admin routes
    {
      path: '/admin/dashboard/',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: 'Dashboard' */ '@/routes/pages/admin/Dashboard'),
      meta: {
        title: 'Dashboard | Alchemy',
        adminRoleRequired: true
      }
    },
    {
      path: '/admin/elements',
      name: 'Elements',
      component: () => import(/* webpackChunkName: 'Elements' */ '@/routes/pages/admin/Elements'),
      meta: {
        title: 'Elements | Alchemy',
        adminRoleRequired: true
      }
    },
    {
      path: '/admin/recipes',
      name: 'Recipes',
      component: () => import(/* webpackChunkName: 'Recipes' */ '@/routes/pages/admin/Recipes'),
      meta: {
        title: 'Recipes | Alchemy',
        adminRoleRequired: true
      }
    },
    {
      path: '/admin/users',
      name: 'Users',
      component: () => import(/* webpackChunkName: 'Users' */ '@/routes/pages/admin/Users'),
      meta: {
        title: 'Users | Alchemy',
        adminRoleRequired: true
      }
    },

    // Errors page
    {
      name: 'Error',
      path: '*',
      component: () => import(/* webpackChunkName: 'Errors' */ '@/routes/pages/Errors.vue'),
      meta: {
        title: 'Error | Alchemy'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(record => record.meta.authRequired)
  const adminRoleRequired = to.matched.some(record => record.meta.adminRoleRequired)

  store.dispatch('user/getUserData').then(() => {
    if (authRequired || adminRoleRequired) {
      const isAuth = store.getters['user/user'].isLoggedIn
      const userRole = store.getters['user/user'].role

      if (!isAuth) {
        next({ path: '/' })
      }

      if (adminRoleRequired) {
        if (userRole !== 'Admin') {
          next({ path: '*' })
        }
      }

      next()
    } else {
      next()
    }
  })
})

router.afterEach((to, from) => {
  document.title = to.meta.title

  if (to.path === '/game') {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
  } else {
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'
  }
})

export default router
