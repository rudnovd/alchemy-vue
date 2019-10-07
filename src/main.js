import Vue from 'vue'

import App from '@/App.vue'
import router from '@/routes/router.js'
import store from '@/store'

import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import './css/main.scss'

import '@/components/globals.js'

Vue.use(BootstrapVue)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('body')
