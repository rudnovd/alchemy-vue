import Vue from 'vue'

import Router from 'vue-router'

import Home from '@/views/Home.vue'

import Game from '@/views/Game.vue'

const adminDashboard = () => import(/* webpackChunkName: "adminDashboard" */ '@/views/AdminDashboard.vue')

const adminEditor = () => import(/* webpackChunkName: "adminEditor" */ '@/views/AdminEditor.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: `/`,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/game',
      name: 'game',
      component: Game
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
    }
  ]
})
