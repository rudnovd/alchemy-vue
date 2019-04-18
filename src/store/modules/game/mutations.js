export default {
  SET_OPENED_ELEMENTS (state, elements) {
    state.openedElements = elements
  },

  SET_ACTIVE_ELEMENTS (state, elements) {
    state.activeElements = elements
  },
  ADD_ACTIVE_ELEMENT (state, element) {
    element.x = state.selectedElement.x
    element.y = state.selectedElement.y

    state.activeElements.push(element)
  },
  REMOVE_ACTIVE_ELEMENT (state, elements) {
    for (let i = 0; i < elements.length; i++) {
      state.activeElements.splice(state.activeElements.indexOf(elements[i]), 1)
    }
  },

  SET_SELECTED_ELEMENT (state, element) {
    state.selectedElement = element
  },
  SET_SELECTED_ELEMENT_COORDINATES (state, { x, y }) {
    state.selectedElement.x = x
    state.selectedElement.y = y
  },

  SET_GAME_FIELD_SIZE (state, { x, y }) {
    state.settings.gameFieldSize.x = x
    state.settings.gameFieldSize.y = y
  }
}
