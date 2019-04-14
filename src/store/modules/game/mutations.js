export default {
  SET_OPENED_ELEMENTS (state, elements) {
    state.openedElements = elements
  },
  SET_ACTIVE_ELEMENTS (state, elements) {
    state.activeElements = elements
  },
  SET_SELECTED_ELEMENT (state, element) {
    state.selectedElement = element
  },

  SET_GAME_FIELD_SIZE (state, { x, y }) {
    console.log(x, y)
    state.settings.gameFieldSize.x = x
    state.settings.gameFieldSize.y = y
  }
}
