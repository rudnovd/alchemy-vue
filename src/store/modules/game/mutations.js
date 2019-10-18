export default {
  SET_GAME_FIELD_SIZE (state, gameField) {
    state.gameFieldSize.x = gameField.x
    state.gameFieldSize.y = gameField.y
  },
  ADD_HISTORY (state, action) {
    state.history.last.firstElement = action.firstElement
    state.history.last.secondElement = action.secondElement
    state.history.last.result = action.result
    state.history.past.push(action)
  }
}
