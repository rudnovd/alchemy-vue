export default {
  setOpenedElements ({ commit }, elements) {
    commit('SET_OPENED_ELEMENTS', elements)
  },
  setActiveElements ({ commit }, elements) {
    commit('SET_ACTIVE_ELEMENTS', elements)
  },
  setSelectedElement ({ commit }, element) {
    commit('SET_SELECTED_ELEMENT', element)
  },

  setGameFieldSize ({ commit }, { x, y }) {
    commit('SET_GAME_FIELD_SIZE', { x, y })
  }
}
