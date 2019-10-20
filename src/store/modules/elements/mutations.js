export default {
  LOADING_START (state) {
    state.state.isLoading = true
  },
  LOADING_END (state) {
    state.state.isLoading = false
  },
  SET_ERROR (state, error) {
    state.state.error = error
  },

  SET_OPENED_ELEMENTS (state, elements) {
    state.openedElements = elements
  },
  ADD_OPENED_ELEMENT (state, element) {
    state.openedElements.push(element)
  },

  SET_ACTIVE_ELEMENTS (state, elements) {
    state.activeElements = elements
  },
  ADD_ACTIVE_ELEMENT (state, element) {
    state.activeElements.push(element)
  },
  DELETE_ACTIVE_ELEMENT (state, element) {
    const elementIndex = state.activeElements.findIndex(activeElement => activeElement.gameId === element.gameId)
    state.activeElements.splice(elementIndex, 1)
  },
  DELETE_ACTIVE_ELEMENTS (state) {
    state.activeElements = []
  },

  SET_SELECTED_ELEMENT (state, element) {
    state.selectedElement = element
  },
  SET_SELECTED_ELEMENT_COORDINATES (state, coordinates) {
    state.selectedElement.x = coordinates.x
    state.selectedElement.y = coordinates.y
    state.selectedElement.z = coordinates.z
  },
  DELETE_SELECTED_ELEMENT (state) {
    state.selectedElement = {}
  },

  UPDATE_OPENED_ELEMENTS_POSITIONS (state) {
    let j = 0
    state.openedElements.forEach(openedElement => {
      openedElement.x = 0
      if (openedElement.show) {
        openedElement.y = j * 70
        j++
      } else {
        openedElement.y = 0
      }
    })
  },
  UPDATE_OPENED_ELEMENTS_BY_CATEGORY (state, category) {
    state.openedElements.forEach(element => {
      element.show = false
      if (category._id === element.category) {
        element.show = true
      }
    })
  },
  UPDATE_ACTIVE_ELEMENTS_POSITIONS (state, gameField) {
    state.activeElements.forEach(activeElement => {
      if (activeElement.x + 25 > gameField.x) {
        activeElement.x = gameField.x - 100
      }
    })
  }
}
