import Vue from 'vue'

import Vuex from 'vuex'

import user from './modules/user'

import game from './modules/game'

import elements from './modules/elements'

import categories from './modules/categories'

import recipes from './modules/recipes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    game,
    elements,
    categories,
    recipes
  },
  strict: true
})
