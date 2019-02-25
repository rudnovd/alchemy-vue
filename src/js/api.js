import axios from 'axios'

export async function getElements () {
  try {
    const response = await axios.get('/api/elements')
    return response
  } catch (error) {
    return error.response
  }
}

export async function postElement (name, category) {
  try {
    const response = await axios({
      method: 'post',
      url: '/api/element/add',
      data: {
        name,
        category
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function putElement (elementId, newName, newCategory) {
  try {
    const response = await axios({
      method: 'put',
      url: '/api/element/update',
      data: {
        elementId,
        newName,
        newCategory
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function deleteElement (elementId) {
  try {
    const response = await axios({
      method: 'delete',
      url: '/api/element/delete',
      data: {
        elementId
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function getCategories () {
  try {
    const response = await axios.get('/api/categories')
    return response
  } catch (error) {
    return error.response
  }
}

export async function postCategory (name) {
  try {
    const response = await axios({
      method: 'post',
      url: '/api/category/add',
      data: {
        name
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export async function putCategory (name, categoryId) {
  try {
    const response = await axios({
      method: 'put',
      url: '/api/category/update',
      data: {
        name,
        categoryId
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export async function deleteCategory (categoryId) {
  try {
    const response = await axios({
      method: 'detele',
      url: '/api/category/delete',
      data: {
        categoryId
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export async function getRecipes () {
  try {
    const response = await axios({
      method: 'get',
      url: '/api/recipes'
    })
    return response
  } catch (error) {
    return error
  }
}

export async function postRecipe (recipe, result) {
  try {
    const response = await axios({
      method: 'post',
      url: '/api/recipe/add',
      data: {
        recipe,
        result
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export async function putRecipe (newRecipe, newResult, recipeId) {
  try {
    const response = await axios({
      method: 'put',
      url: '/api/recipe/update',
      data: {
        newRecipe,
        newResult,
        recipeId
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export async function deleteRecipe (recipeId) {
  try {
    const response = await axios({
      method: 'delete',
      url: '/api/recipe/delete',
      data: {
        recipeId
      }
    })
    return response
  } catch (error) {
    return error
  }
}
