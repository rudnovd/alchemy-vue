import * as shortid from 'shortid'

function ifGameIdUniq (gameId, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].gameId === gameId) {
      return false
    }
  }
  return true
}

export default {
  setOpenedElements ({ commit }, elements) {
    commit('SET_OPENED_ELEMENTS', elements)

    commit('UPDATE_OPENED_ELEMENTS_POSITIONS')
  },
  addOpenedElement ({ commit, state }, element) {
    commit('ADD_OPENED_ELEMENT', element)

    commit('UPDATE_OPENED_ELEMENTS_POSITIONS')
  },
  removeOpenedElement ({ commit }, element) {
    commit('REMOVE_OPENED_ELEMENT', element)
  },

  setActiveElements ({ commit }, elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].gameId = shortid.generate()
    }

    commit('SET_ACTIVE_ELEMENTS', elements)
  },
  addActiveElement ({ commit, state }, element) {
    element.gameId = shortid.generate()
    element.x = state.selectedElement.x
    element.y = state.selectedElement.y

    while (ifGameIdUniq(element.gameId, state.activeElements) === false) {
      element.gameId = shortid.generate()
    }

    commit('ADD_ACTIVE_ELEMENT', element)
  },
  removeActiveElement ({ commit }, element) {
    commit('REMOVE_ACTIVE_ELEMENT', element)
  },
  removeAllActiveElements ({ commit }) {
    commit('REMOVE_ALL_ACTIVE_ELEMENTS')
  },

  setSelectedElement ({ commit }, element) {
    commit('SET_SELECTED_ELEMENT', element)
  },
  setSelectedElementCoordinates ({ commit }, { x, y }) {
    commit('SET_SELECTED_ELEMENT_COORDINATES', { x, y })
  },
  removeSelectedElement ({ commit }) {
    commit('REMOVE_SELECTED_ELEMENT')
  },

  setOpenedCategories ({ commit }, elements) {
    let openedCategories = []
    for (let i = 0; i < elements.length; i++) {
      if (openedCategories.indexOf(elements[i].category) === -1) {
        openedCategories.push(elements[i].category)
      }
    }
    commit('SET_OPENED_CATEGORIES', openedCategories)
  },
  updateOpenedElementsPositions ({ commit }) {
    commit('UPDATE_OPENED_ELEMENTS_POSITIONS')
  },

  setSelectedCategory ({ commit }, category) {
    commit('SET_SELECTED_CATEGORY', category)
  },

  setGameFieldSize ({ commit }, { x, y }) {
    commit('SET_GAME_FIELD_SIZE', { x, y })

    commit('SET_ELEMENTS_LIST_FIELD_SIZE', { x: x * 0.2, y: y * 0.2 })
  },
  setElementListFieldSize ({ commit, state }) {
    let x = state.options.gameFieldSize.x * 0.2
    let y = state.options.gameFieldSize.y * 0.2
    commit('SET_ELEMENTS_LIST_FIELD_SIZE', { x, y })
  },

  sendError ({ commit }, error) {
    commit('SEND_ERROR', error)
  }
}
