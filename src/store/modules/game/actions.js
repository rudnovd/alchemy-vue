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
    commit('SET_ACTIVE_ELEMENTS', elements)
  },
  addActiveElement ({ commit, state }, element) {
    element.x = state.selectedElement.x
    element.y = state.selectedElement.y
    element.z = 100

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
  setSelectedElementCoordinates ({ commit }, { x, y, z }) {
    commit('SET_SELECTED_ELEMENT_COORDINATES', { x, y, z })
  },
  removeSelectedElement ({ commit }) {
    commit('REMOVE_SELECTED_ELEMENT')
  },

  setOpenedCategories ({ commit }, categories) {
    commit('SET_OPENED_CATEGORIES', categories)
  },
  addOpenedCategory ({ commit }, category) {
    commit('ADD_OPENED_CATEGORY', category)
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

  setOpenedRecipes ({ commit }, recipes) {
    commit('SET_OPENED_RECIPES', recipes)
  },
  addOpenedRecipe ({ commit }, recipe) {
    commit('ADD_OPENED_RECIPE', recipe)
  },
  setRecipes ({ commit }, recipes) {
    commit('SET_RECIPES', recipes)
  },
  updateOpenedElementsByCategory ({ commit }, category) {
    commit('UPDATE_OPENED_ELEMENTS_BY_CATEGORY', category)

    commit('UPDATE_OPENED_ELEMENTS_POSITIONS')
  }
}
