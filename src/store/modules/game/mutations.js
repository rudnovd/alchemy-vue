export default {
  SET_OPENED_ELEMENTS (state, elements) {
    state.openedElements = elements
  },
  ADD_OPENED_ELEMENT (state, element) {
    state.openedElements.push(element)
  },
  REMOVE_OPENED_ELEMENT (state, element) {
    for (let i = 0; i < state.openedElements.length; i++) {
      if (state.openedElements[i]._id === element._id) {
        state.openedElements.splice(i, 1)
      }
    }
  },

  SET_ACTIVE_ELEMENTS (state, elements) {
    state.activeElements = elements
  },
  ADD_ACTIVE_ELEMENT (state, element) {
    state.activeElements.push(element)
  },
  REMOVE_ACTIVE_ELEMENT (state, element) {
    for (let i = 0; i < state.activeElements.length; i++) {
      if (state.activeElements[i].gameId === element.gameId) {
        state.activeElements.splice(i, 1)
      }
    }
  },
  REMOVE_ALL_ACTIVE_ELEMENTS (state) {
    state.activeElements = []
  },

  SET_SELECTED_ELEMENT (state, element) {
    state.selectedElement = element
  },
  SET_SELECTED_ELEMENT_COORDINATES (state, { x, y }) {
    state.selectedElement.x = x
    state.selectedElement.y = y
  },
  REMOVE_SELECTED_ELEMENT (state) {
    state.selectedElement = null
  },

  SET_OPENED_CATEGORIES (state, categories) {
    state.openedCategories = categories
  },
  UPDATE_OPENED_ELEMENTS_POSITIONS (state) {
    for (let i = 0; i < state.openedElements.length; i++) {
      state.openedElements[i].x = state.settings.gameFieldSize.x - (state.settings.gameFieldSize.x * 0.2)
      state.openedElements[i].y = i * 55
    }
  },

  SET_SELECTED_CATEGORY (state, category) {
    state.selectedCategory = category
  },

  SET_GAME_FIELD_SIZE (state, { x, y }) {
    state.settings.gameFieldSize.x = x
    state.settings.gameFieldSize.y = y
  },
  SET_ELEMENTS_LIST_FIELD_SIZE (state, { x, y }) {
    state.settings.elementListFieldSize.x = x
    state.settings.elementListFieldSize.y = y
  },

  SEND_ERROR (state, error) {
    state.error = error
  }
}
