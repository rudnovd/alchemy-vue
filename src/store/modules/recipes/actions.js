export default {
  setRecipes ({ commit }, recipes) {
    commit('SET_RECIPES', recipes)
  },
  deleteRecipes ({ commit }) {
    commit('DELETE_RECIPES')
  },
  setOpenedRecipes ({ commit }, recipes) {
    commit('SET_OPENED_RECIPES', recipes)
  },
  addOpenedRecipe ({ commit }, recipe) {
    commit('ADD_OPENED_RECIPE', recipe)
  },
  deleteOpenedRecipe ({ commit, state }, recipe) {
    for (let i = 0; i < state.openedRecipes.length; i++) {
      if (state.openedRecipes[i]._id === recipe._id) {
        commit('DELETE_OPENED_RECIPE', recipe)
        break
      }
    }
  },
  deleteOpenedRecipes ({ commit }) {
    commit('DELETE_OPENED_RECIPES')
  },
  setSelectedRecipe ({ commit }, recipe) {
    commit('SET_SELECTED_RECIPE', recipe)
  },
  deleteSelectedRecipe ({ commit }) {
    commit('DELETE_SELECTED_RECIPE')
  }
}
