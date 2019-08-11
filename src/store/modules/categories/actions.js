export default {
  setOpenedCategories ({ commit }, categories) {
    commit('SET_OPENED_CATEGORIES', categories)
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
