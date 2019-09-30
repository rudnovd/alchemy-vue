import { getRecipes } from '@/js/api/recipes'

export default {
  async getRecipes ({ state, commit }) {
    if (state.recipes.length === 0) {
      commit('LOADING_START')
      await getRecipes().then(response => {
        commit('LOADING_END')
        if (response.status === 200) {
          commit('SET_RECIPES', response.data.response)
        } else {
          commit('SET_ERROR', response.data)
        }
      })
    }
  },
  setOpenedRecipes ({ commit }, recipes) {
    commit('SET_OPENED_RECIPES', recipes)
  },
  addOpenedRecipe ({ commit }, recipe) {
    commit('ADD_OPENED_RECIPE', recipe)
  },
  setSelectedRecipe ({ commit }, recipe) {
    commit('SET_SELECTED_RECIPE', recipe)
  },
  deleteSelectedRecipe ({ commit }) {
    commit('DELETE_SELECTED_RECIPE')
  }
}
