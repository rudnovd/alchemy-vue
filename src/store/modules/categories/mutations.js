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

  SET_OPENED_CATEGORIES (state, categories) {
    state.openedCategories = categories
  },
  ADD_OPENED_CATEGORY (state, category) {
    state.openedCategories.push(category)
  },
  SET_SELECTED_CATEGORY (state, category) {
    state.selectedCategory = category
  },
  DELETE_SELECTED_CATEGORY (state) {
    state.selectedCategory = {}
  }
}
