export default {
  setGameFieldSize ({ commit }, { x, y }) {
    commit('SET_GAME_FIELD_SIZE', { x, y })
    commit('SET_ELEMENTS_LIST_FIELD_SIZE', { x: x * 0.15, y: y })
  },
  setElementListFieldSize ({ commit, state }) {
    let x = state.gameFieldSize.x * 0.15
    let y = state.gameFieldSize.y
    commit('SET_ELEMENTS_LIST_FIELD_SIZE', { x, y })
  },
  setOpenedElementsFieldSize ({ commit }, { width, height }) {
    commit('SET_OPENED_ELEMENTS_FIELD_SIZE', { width, height })
  },
  addHistory ({ commit }, action) {
    commit('ADD_HISTORY', action)
  }
}
