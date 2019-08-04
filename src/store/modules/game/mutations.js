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
      if (state.activeElements[i].gameId === element) {
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
  SET_SELECTED_ELEMENT_COORDINATES (state, { x, y, z }) {
    state.selectedElement.x = x
    state.selectedElement.y = y
    state.selectedElement.z = z
  },
  REMOVE_SELECTED_ELEMENT (state) {
    state.selectedElement = null
  },

  SET_OPENED_CATEGORIES (state, categories) {
    state.openedCategories = categories
  },
  ADD_OPENED_CATEGORIES (state, category) {
    state.openedCategories.push(category)
  },

  UPDATE_OPENED_ELEMENTS_POSITIONS (state) {
    let j = 0
    for (let i = 0; i < state.openedElements.length; i++) {
      state.openedElements[i].x = state.settings.gameFieldSize.x - (state.settings.gameFieldSize.x * 0.2)
      if (state.openedElements[i].show) {
        state.openedElements[i].y = j * 55
        j++
      } else {
        state.openedElements[i].y = 0
      }
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

  SET_OPENED_RECIPES (state, recipes) {
    state.openedRecipes = recipes
  },
  ADD_OPENED_RECIPE (state, recipe) {
    state.openedRecipes.push(recipe)
  },
  SET_RECIPES (state, recipes) {
    state.recipes = recipes
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
