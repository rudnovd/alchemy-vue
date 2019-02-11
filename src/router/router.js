import Vue from 'vue'

import Router from 'vue-router'

const home = () => import(/* webpackChunkName: "home" */ '@/router/routes/Home.vue')

const game = () => import(/* webpackChunkName: "game" */ '@/router/routes/Game.vue')

const adminDashboard = () => import(/* webpackChunkName: "adminDashboard" */ '@/router/routes/AdminDashboard.vue')

const adminEditor = () => import(/* webpackChunkName: "adminEditor" */ '@/router/routes/AdminEditor.vue')

const notFound = () => import(/* webpackChunkName: "notFound" */ '@/router/routes/404.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: `/`,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/game',
      name: 'game',
      component: game
    },
    {
      path: '/admin/dashboard',
      name: 'adminDashboard',
      component: adminDashboard
    },
    {
      path: '/admin/editor',
      name: 'adminEditor',
      component: adminEditor
    },
    {
      path: '*',
      name: '404',
      component: notFound
    }
  ]
})
