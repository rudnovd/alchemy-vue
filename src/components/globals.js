import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faEdit, faTrash, faPlus, faClipboard } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import LoadingSpinner from '@/components/LoadingSpinner.vue'

// register components:

library.add(faEdit, faTrash, faPlus, faClipboard)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('loading-spinner', LoadingSpinner)
