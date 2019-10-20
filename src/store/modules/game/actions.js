export default {
  setGameFieldSize ({ commit }, gameField) {
    commit('SET_GAME_FIELD_SIZE', {
      x: gameField[0].clientWidth,
      y: gameField[0].clientHeight
    })
  },
  addHistory ({ commit }, history) {
    commit('ADD_HISTORY', {
      firstElement: history.firstElement,
      secondElement: history.secondElement,
      result: history.result
    })
  }
}
