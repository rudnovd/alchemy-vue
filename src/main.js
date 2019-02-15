import Vue from 'vue'

import App from '@/App.vue'

import router from '@/routes/router.js'

import store from '@/states/store.js'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.min.css'

import 'bootstrap-vue/dist/bootstrap-vue.min.css'

import '@/components/globals.js'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
