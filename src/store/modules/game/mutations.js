export default {
  SET_GAME_FIELD_SIZE (state, gameField) {
    state.gameFieldSize.x = gameField.x
    state.gameFieldSize.y = gameField.y
  },
  ADD_HISTORY (state, history) {
    state.history.last = history

    if (state.history.past.length === 5) {
      state.history.past.shift()
    }
    state.history.past.push(history)
  },
  SET_LAST_OPENED_ELEMENT (state, element) {
    state.lastOpenedElement = element
  }
}
