import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faEdit, faTrash, faPlus, faClipboard, faTimes } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import LoadingSpinner from '@/components/LoadingSpinner.vue'

import vSelect from 'vue-select'

import VueDragResize from 'vue-drag-resize'

// register components:

library.add(faEdit, faTrash, faPlus, faClipboard, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('loading-spinner', LoadingSpinner)

Vue.component('v-select', vSelect)

Vue.component('vue-drag-resize', VueDragResize)
