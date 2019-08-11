export default {
  SET_OPENED_ELEMENTS (state, elements) {
    state.openedElements = elements
  },
  DELETE_OPENED_ELEMENTS (state) {
    state.openedElements = []
  },
  ADD_OPENED_ELEMENT (state, element) {
    state.openedElements.push(element)
  },
  REMOVE_OPENED_ELEMENT (state, element) {
    state.openedElements.splice(element, 1)
  },
  SET_ACTIVE_ELEMENTS (state, elements) {
    state.activeElements = elements
  },
  ADD_ACTIVE_ELEMENT (state, element) {
    state.activeElements.push(element)
  },
  DELETE_ACTIVE_ELEMENT (state, element) {
    state.activeElements.splice(element, 1)
  },
  DELETE_ACTIVE_ELEMENTS (state) {
    state.activeElements = []
  },
  SET_SELECTED_ELEMENT (state, element) {
    state.selectedElement = element
  },
  SET_SELECTED_ELEMENT_COORDINATES (state, { x, y, z }) {
    state.selectedElement.x = x
    state.selectedElement.y = y
    state.selectedElement.z = z
  },
  DELETE_SELECTED_ELEMENT (state) {
    state.selectedElement = null
  },
  UPDATE_OPENED_ELEMENTS_POSITIONS (state) {
    let j = 0
    for (let i = 0; i < state.openedElements.length; i++) {
      state.openedElements[i].x = state.settings.gameFieldSize.x - (state.settings.gameFieldSize.x * 0.15)
      if (state.openedElements[i].show) {
        state.openedElements[i].y = j * 45
        j++
      } else {
        state.openedElements[i].y = 0
      }
    }
  },
  UPDATE_OPENED_ELEMENTS_BY_CATEGORY (state, category) {
    for (let i = 0; i < state.openedElements.length; i++) {
      state.openedElements[i].show = false
      if (category === state.openedElements[i].category) {
        state.openedElements[i].show = true
      }
    }
  }
}
