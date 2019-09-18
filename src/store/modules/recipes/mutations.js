export default {
  LOADING_START (state) {
    state.state.isLoading = true
  },
  LOADING_END (state) {
    state.state.isLoading = false
  },

  SET_RECIPES (state, recipes) {
    state.recipes = recipes
  },
  DELETE_RECIPES (state) {
    state.recipes = []
  },
  SET_OPENED_RECIPES (state, recipes) {
    state.openedRecipes = recipes
  },
  ADD_OPENED_RECIPE (state, recipe) {
    state.openedRecipes.push(recipe)
  },
  DELETE_OPENED_RECIPE (state, recipe) {
    state.openedRecipes.splice(recipe, 1)
  },
  DELETE_OPENED_RECIPES (state) {
    state.openedRecipes = []
  },
  SET_SELECTED_RECIPE (state, recipe) {
    state.selectedRecipe = recipe
  },
  DELETE_SELECTED_RECIPE (state) {
    state.selectedRecipe = null
  }
}
