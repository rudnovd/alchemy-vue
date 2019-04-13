import Vue from 'vue'

import App from '@/App.vue'

import router from '@/routes/router.js'

import store from '@/store'

import VueCookies from 'vue-cookies'

import BootstrapVue from 'bootstrap-vue'

import '@/css/main.scss'

import '@/components/globals.js'

Vue.use(BootstrapVue)

Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
