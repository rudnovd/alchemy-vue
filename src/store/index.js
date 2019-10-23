import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'
import game from './modules/game'
import elements from './modules/elements'
import categories from './modules/categories'
import recipes from './modules/recipes'
import data from './modules/data'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    game,
    elements,
    categories,
    recipes,
    data
  },
  plugins: [
    createPersistedState({
      key: 'game',
      paths: ['elements.activeElements', 'elements.openedElements', 'categories.openedCategories', 'categories.selectedCategory']
    })
  ],
  strict: process.env.NODE_ENV === 'development'
})
