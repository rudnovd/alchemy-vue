import { getRecipes } from '@/js/api/recipes'

export default {
  async getRecipes ({ state, rootState, commit }) {
    if (state.recipes.length === 0) {
      commit('LOADING_START')
      await getRecipes().then(response => {
        commit('LOADING_END')
        if (response.status === 200) {
          for (let i = 0; i < response.data.response.length; i++) {
            for (let j = 0; j < rootState.elements.openedElements.length; j++) {
              if (response.data.response[i].result._id === rootState.elements.openedElements[j]._id) {
                response.data.response[i].result.category = rootState.elements.openedElements[j].category
              }
            }
          }
          commit('SET_RECIPES', response.data.response)
        }
      })
    }
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
