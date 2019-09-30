export default {
  setGameFieldSize ({ commit }, { x, y }) {
    commit('SET_GAME_FIELD_SIZE', { x, y })
  },
  addHistory ({ commit }, action) {
    commit('ADD_HISTORY', action)
  }
}
