import Vue from 'vue'

import App from '@/App.vue'
import router from '@/routes/router.js'
import store from '@/store'

import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VueTour from 'vue-tour'

import './css/main.scss'
import 'vue-tour/dist/vue-tour.css'

import '@/components/globals.js'

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueTour)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('body')
