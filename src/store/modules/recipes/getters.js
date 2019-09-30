export default {
  recipes: state => {
    return state.recipes
  },
  openedRecipes: state => {
    return state.openedRecipes
  },
  selectedRecipe: state => {
    return state.selectedRecipe
  },
  state: state => {
    return state.state
  }
}
