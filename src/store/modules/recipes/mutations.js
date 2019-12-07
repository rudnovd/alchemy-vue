export default {
  LOADING_START(state) {
    state.state.isLoading = true
  },
  LOADING_END(state) {
    state.state.isLoading = false
  },
  SET_ERROR(state, error) {
    state.state.error = error
  },

  SET_RECIPES(state, recipes) {
    state.recipes = recipes
  },
  SET_OPENED_RECIPES(state, recipes) {
    state.openedRecipes = recipes
  },
  ADD_OPENED_RECIPE(state, recipe) {
    state.openedRecipes.push(recipe)
  },
  SET_SELECTED_RECIPE(state, recipe) {
    state.selectedRecipe = recipe
  },
  DELETE_SELECTED_RECIPE(state) {
    state.selectedRecipe = {}
  }
}
