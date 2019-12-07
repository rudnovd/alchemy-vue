export default {
  LOADING_START(state, object) {
    if (object === 'elements') {
      state.elements.state.isLoading = true
    } else if (object === 'categories') {
      state.categories.state.isLoading = true
    } else if (object === 'recipes') {
      state.recipes.state.isLoading = true
    } else if (object === 'users') {
      state.users.state.isLoading = true
    } else if (object === 'stats') {
      state.stats.state.isLoading = true
    }
  },
  LOADING_END(state, object) {
    if (object === 'elements') {
      state.elements.state.isLoading = false
    } else if (object === 'categories') {
      state.categories.state.isLoading = false
    } else if (object === 'recipes') {
      state.recipes.state.isLoading = false
    } else if (object === 'users') {
      state.users.state.isLoading = false
    } else if (object === 'stats') {
      state.stats.state.isLoading = false
    }
  },
  SET_METHOD(state, { object, method }) {
    if (object === 'elements') {
      state.elements.state.method = method
    } else if (object === 'categories') {
      state.categories.state.method = method
    } else if (object === 'recipes') {
      state.recipes.state.method = method
    } else if (object === 'users') {
      state.users.state.method = method
    } else if (object === 'stats') {
      state.stats.state.method = method
    }
  },
  SET_ERROR(state, { object, error }) {
    if (object === 'elements') {
      state.elements.state.error = error
    } else if (object === 'categories') {
      state.categories.state.error = error
    } else if (object === 'recipes') {
      state.recipes.state.error = error
    } else if (object === 'users') {
      state.recipes.state.error = error
    } else if (object === 'stats') {
      state.stats.state.error = error
    }
  },

  SET_ELEMENTS(state, elements) {
    state.elements.data = elements
  },
  ADD_ELEMENT(state, element) {
    state.elements.data.push(element)
  },
  EDIT_ELEMENT(state, element) {
    const elementIndex = state.elements.data.findIndex(singleElement => singleElement._id === element._id)
    state.elements.data.splice(elementIndex, 1, element)
  },
  DELETE_ELEMENT(state, element) {
    const elementIndex = state.elements.data.findIndex(singleElement => singleElement._id === element._id)
    state.elements.data.splice(elementIndex, 1)
  },

  SET_CATEGORIES(state, categories) {
    state.categories.data = categories
  },
  ADD_CATEGORY(state, category) {
    state.categories.data.push(category)
  },
  EDIT_CATEGORY(state, category) {
    const categoryIndex = state.categories.data.findIndex(singleCategory => singleCategory._id === category._id)
    state.elements.data.splice(categoryIndex, 1, category)
  },
  DELETE_CATEGORY(state, category) {
    const categoryIndex = state.categories.data.findIndex(singleCategory => singleCategory._id === category._id)
    state.categories.data.splice(categoryIndex, 1)
  },

  SET_RECIPES(state, recipes) {
    state.recipes.data = recipes
  },
  ADD_RECIPE(state, recipe) {
    state.recipes.data.push(recipe)
  },
  EDIT_RECIPE(state, recipe) {
    const recipeIndex = state.recipes.data.findIndex(singleRecipe => singleRecipe._id === recipe._id)
    state.recipes.data.splice(recipeIndex, 1, recipe)
  },
  DELETE_RECIPE(state, recipe) {
    const recipeIndex = state.recipes.data.findIndex(singleRecipe => singleRecipe._id === recipe._id)
    state.recipes.data.splice(recipeIndex, 1)
  },

  SET_USERS(state, users) {
    state.users.data = users
  },
  EDIT_USER(state, user) {
    const userIndex = state.users.data.findIndex(singleUser => singleUser._id === user._id)
    state.users.data.splice(userIndex, 1, user)
  },

  SET_STATS(state, stats) {
    state.stats.data = stats
  }
}
