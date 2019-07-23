import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faEdit, faTrash, faPlus, faClipboard, faTimes,
  faUser, faSmile, faUserSlash, faFire, faEyeSlash, faArrowUp,
  faArrowDown, faKey } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import LoadingSpinner from '@/components/LoadingSpinner.vue'

import Multiselect from 'vue-multiselect'

import VueDraggableResizable from 'vue-draggable-resizable'

import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import 'vue-multiselect/dist/vue-multiselect.min.css'

library.add(faEdit, faTrash, faPlus, faClipboard,
  faTimes, faUser, faSmile, faUserSlash, faFire, faEyeSlash, faArrowUp, faArrowDown, faKey)

// register components:
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('loading-spinner', LoadingSpinner)
Vue.component('multiselect', Multiselect)
Vue.component('vue-draggable-resizable', VueDraggableResizable)
