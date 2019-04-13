import axios from 'axios'

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
