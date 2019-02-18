import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: 'Home' */ '@/routes/pages/Home'),
      meta: {
        title: 'Alchemy game',
        public: true
      }
    },
    {
      path: '/game',
      component: () => import(/* webpackChunkName: 'Game' */ '@/routes/pages/Game'),
      meta: {
        title: 'Alchemy game',
        public: true
      }
    },

    // Admin routes
    {
      path: '/admin/dashboard/',
      component: () => import(/* webpackChunkName: 'Dashboard' */ '@/routes/pages/admin/Dashboard'),
      meta: {
        title: 'Dashboard',
        public: false
      }
    },
    {
      path: '/admin/elements',
      component: () => import(/* webpackChunkName: 'Elements' */ '@/routes/pages/admin/Elements'),
      meta: {
        title: 'Elements',
        public: false
      }
    },
    {
      path: '/admin/recipes',
      component: () => import(/* webpackChunkName: 'Recipes' */ '@/routes/pages/admin/Recipes'),
      meta: {
        title: 'Recipes',
        public: false
      }
    },
    {
      path: '/admin/users',
      component: () => import(/* webpackChunkName: 'Users' */ '@/routes/pages/admin/Users'),
      meta: {
        title: 'Users',
        public: false
      }
    },

    // Errors page
    {
      path: '*',
      component: () => import(/* webpackChunkName: 'Errors' */ '@/routes/pages/Errors.vue'),
      meta: {
        title: 'Error page',
        public: true
      }
    }
  ]
})

// Do before load router
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title

  next()
})

export default router
