export default {
  SET_OPENED_CATEGORIES (state, categories) {
    state.openedCategories = categories
  },
  DELETE_OPENED_CATEGORIES (state) {
    state.openedCategories = []
  },
  ADD_OPENED_CATEGORY (state, category) {
    state.openedCategories.push(category)
  },
  DELETE_OPENED_CATEGORY (state, category) {
    state.openedCategories.splice(category, 1)
  },
  SET_SELECTED_CATEGORY (state, category) {
    state.selectedCategory = category
  },
  DELETE_SELECTED_CATEGORY (state) {
    state.selectedCategory = null
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
  }
}
