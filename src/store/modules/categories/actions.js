import { getCategories } from '@/js/api/categories'

export default {
  async getOpenedCategories ({ state, dispatch, commit }) {
    if (state.openedCategories.length === 0) {
      commit('LOADING_START')
      await getCategories().then(response => {
        commit('LOADING_END')
        if (response.status === 200) {
          commit('SET_OPENED_CATEGORIES', response.data.response)
        } else {
          commit('SET_ERROR', response)
        }
      })
    }
  },
  deleteOpenedCategories ({ commit }) {
    commit('DELETE_OPENED_CATEGORIES')
  },
  addOpenedCategory ({ commit }, category) {
    commit('ADD_OPENED_CATEGORY', category)
  },
  deleteOpenedCategory ({ state, commit }, category) {
    for (let i = 0; i < state.openedCategories.length; i++) {
      if (state.openedCategories[i]._id === category._id) {
        commit('DELETE_OPENED_CATEGORY', i)
        break
      }
    }
  },
  setSelectedCategory ({ commit }, category) {
    commit('SET_SELECTED_CATEGORY', category)
  },
  deleteSelectedCategory ({ commit }) {
    commit('DELETE_SELECTED_CATEGORY')
  },
  updateOpenedElementsPositions ({ commit }) {
    commit('UPDATE_OPENED_ELEMENTS_POSITIONS')
  }
}
