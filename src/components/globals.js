import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faEdit, faTrash, faPlus, faClipboard, faTimes, faUser, faSmile, faUserSlash, faFire, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import LoadingSpinner from '@/components/LoadingSpinner.vue'

import vSelect from 'vue-select'

import VueDraggableResizable from 'vue-draggable-resizable'

import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

library.add(faEdit, faTrash, faPlus, faClipboard, faTimes, faUser, faSmile, faUserSlash, faFire, faEyeSlash)

// register components:
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('loading-spinner', LoadingSpinner)
Vue.component('v-select', vSelect)
Vue.component('vue-draggable-resizable', VueDraggableResizable)
