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

    // Admin dashboard routes
    {
      path: '/admin/dashboard',
      component: () => import(/* webpackChunkName: 'Dashboard' */ '@/routes/pages/admin/Dashboard'),
      meta: {
        title: 'Dashboard',
        public: false
      }
    },
    {
      path: '/admin/dashboard/elements',
      component: () => import(/* webpackChunkName: 'ElementsDashboard' */ '@/routes/pages/admin/ElementsDashboard'),
      meta: {
        title: 'Elements dashboard',
        public: false
      }
    },
    {
      path: '/admin/dashboard/categories',
      component: () => import(/* webpackChunkName: 'CategoriesDashboard' */ '@/routes/pages/admin/CategoriesDashboard'),
      meta: {
        title: 'Categories dashboard',
        public: false
      }
    },
    {
      path: '/admin/dashboard/recipes',
      component: () => import(/* webpackChunkName: 'RecipesDashboard' */ '@/routes/pages/admin/RecipesDashboard'),
      meta: {
        title: 'Recipes dashboard',
        public: false
      }
    },
    {
      path: '/admin/dashboard/users',
      component: () => import(/* webpackChunkName: 'UsersDashboard' */ '@/routes/pages/admin/UsersDashboard'),
      meta: {
        title: 'Users dashboard',
        public: false
      }
    },

    // Admin control routes
    {
      path: '/admin/control/users',
      component: () => import(/* webpackChunkName: 'UsersControl' */ '@/routes/pages/admin/UsersControl'),
      meta: {
        title: 'Users control',
        public: false
      }
    },
    {
      path: '/admin/control/feedback',
      component: () => import(/* webpackChunkName: 'FeedbackControl' */ '@/routes/pages/admin/FeedbackControl'),
      meta: {
        title: 'Feedback control',
        public: false
      }
    },

    // Admin editor routes
    {
      path: '/admin/editor/elements',
      component: () => import(/* webpackChunkName: 'ElementsEditor' */ '@/routes/pages/admin/ElementsEditor'),
      meta: {
        title: 'Elements editor',
        public: false
      }
    },
    {
      path: '/admin/editor/categories',
      component: () => import(/* webpackChunkName: 'CategoriesEditor' */ '@/routes/pages/admin/CategoriesEditor'),
      meta: {
        title: 'Categories editor',
        public: false
      }
    },
    {
      path: '/admin/recipes',
      component: () => import(/* webpackChunkName: 'RecipesEditor' */ '@/routes/pages/admin/RecipesEditor.vue'),
      meta: {
        title: 'Recipes editor',
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
