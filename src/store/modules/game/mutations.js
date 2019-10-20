export default {
  SET_GAME_FIELD_SIZE (state, gameField) {
    state.gameFieldSize.x = gameField.x
    state.gameFieldSize.y = gameField.y
  },
  ADD_HISTORY (state, history) {
    state.history.last = history
    state.history.past.push(history)
  }
}
