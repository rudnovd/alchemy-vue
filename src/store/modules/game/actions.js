export default {
  setOpenedElements ({ commit }, elements) {
    commit('SET_OPENED_ELEMENTS', elements)
  },

  setActiveElements ({ commit }, elements) {
    commit('SET_ACTIVE_ELEMENTS', elements)
  },
  addActiveElement ({ commit }, element) {
    commit('ADD_ACTIVE_ELEMENT', element)
  },
  removeActiveElement ({ commit }, elements) {
    commit('REMOVE_ACTIVE_ELEMENT', elements)
  },

  setSelectedElement ({ commit }, element) {
    commit('SET_SELECTED_ELEMENT', element)
  },
  setSelectedElementCoordinates ({ commit }, { x, y }) {
    commit('SET_SELECTED_ELEMENT_COORDINATES', { x, y })
  },

  setGameFieldSize ({ commit }, { x, y }) {
    commit('SET_GAME_FIELD_SIZE', { x, y })
  }
}
