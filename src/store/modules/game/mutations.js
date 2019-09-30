export default {
  SET_GAME_FIELD_SIZE (state, { x, y }) {
    state.gameFieldSize.x = x
    state.gameFieldSize.y = y
  },
  ADD_HISTORY (state, action) {
    state.history.last.firstElement = action.firstElement
    state.history.last.secondElement = action.secondElement
    state.history.last.result = action.result
    state.history.past.push(action)
  }
}
