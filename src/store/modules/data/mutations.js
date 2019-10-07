export default {
  LOADING_START (state, object) {
    if (object === 'elements') {
      state.elements.state.isLoading = true
    } else if (object === 'categories') {
      state.categories.state.isLoading = true
    } else if (object === 'recipes') {
      state.recipes.state.isLoading = true
    }
  },
  LOADING_END (state, object) {
    if (object === 'elements') {
      state.elements.state.isLoading = false
    } else if (object === 'categories') {
      state.categories.state.isLoading = false
    } else if (object === 'recipes') {
      state.recipes.state.isLoading = false
    }
  },
  SET_METHOD (state, { object, method }) {
    if (object === 'elements') {
      state.elements.state.method = method
    } else if (object === 'categories') {
      state.categories.state.method = method
    } else if (object === 'recipes') {
      state.recipes.state.method = method
    }
  },
  SET_ERROR (state, { object, error }) {
    if (object === 'elements') {
      state.elements.state.error = error
    } else if (object === 'categories') {
      state.categories.state.error = error
    } else if (object === 'recipes') {
      state.recipes.state.error = error
    }
  },

  SET_ELEMENTS (state, elements) {
    state.elements.data = elements
  },
  ADD_ELEMENT (state, element) {
    state.elements.data.push(element)
  },
  EDIT_ELEMENT (state, element) {
    state.elements.data.forEach(singleElement => {
      if (singleElement._id === element._id) {
        singleElement = element
      }
    })
  },
  DELETE_ELEMENT (state, element) {
    state.elements.data.forEach((singleElement, index) => {
      if (singleElement._id === element._id) {
        state.elements.data.splice(index, 1)
      }
    })
  },

  SET_CATEGORIES (state, categories) {
    state.categories.data = categories
  },
  SET_RECIPES (state, recipes) {
    state.recipes.data = recipes
  }
}
