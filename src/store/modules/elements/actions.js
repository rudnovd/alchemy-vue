export default {
  setOpenedElements ({ commit }, elements) {
    commit('SET_OPENED_ELEMENTS', elements)
  },
  deleteOpenedElements ({ commit }) {
    commit('DELETE_OPENED_ELEMENTS')
  },
  addOpenedElement ({ commit }, element) {
    commit('ADD_OPENED_ELEMENT', element)
  },
  deleteOpenedElement ({ commit, state }, element) {
    for (let i = 0; i < state.openedElements.length; i++) {
      if (state.openedElements[i]._id === element._id) {
        commit('DELETE_OPENED_ELEMENT', i)
        break
      }
    }
  },
  setActiveElements ({ commit }, elements) {
    commit('SET_ACTIVE_ELEMENTS', elements)
  },
  addActiveElement ({ commit }, element) {
    commit('ADD_ACTIVE_ELEMENT', element)
  },
  deleteActiveElement ({ commit, state }, element) {
    for (let i = 0; i < state.activeElements.length; i++) {
      if (state.activeElements[i].gameId === element.gameId) {
        commit('DELETE_ACTIVE_ELEMENT', i)
        break
      }
    }
  },
  deleteActiveElements ({ commit }) {
    commit('DELETE_ACTIVE_ELEMENTS')
  },
  setSelectedElement ({ commit }, element) {
    commit('SET_SELECTED_ELEMENT', element)
  },
  setSelectedElementCoordinates ({ commit }, { x, y, z }) {
    commit('SET_SELECTED_ELEMENT_COORDINATES', { x, y, z })
  },
  deleteSelectedElement ({ commit }) {
    commit('DELETE_SELECTED_ELEMENT')
  },

  updateOpenedElementsPositions ({ commit, rootState }) {
    commit('UPDATE_OPENED_ELEMENTS_POSITIONS', rootState.game.gameFieldSize)
  },
  updateOpenedElementsByCategory ({ commit }, category) {
    commit('UPDATE_OPENED_ELEMENTS_BY_CATEGORY', category)
  }
}
