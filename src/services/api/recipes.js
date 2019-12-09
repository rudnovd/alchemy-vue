import { http } from '@/services/http'

export const Recipes = {
  async check(recipe) {
    try {
      const response = await http({
        method: 'get',
        url: '/recipe/check',
        params: {
          recipe
        }
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async get() {
    try {
      const response = await http({
        method: 'get',
        url: '/recipes'
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async add(recipe, result) {
    try {
      const response = await http({
        method: 'post',
        url: '/recipe/add',
        data: {
          recipe,
          result
        }
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async update(newRecipe, newResult, recipeId) {
    try {
      const response = await http({
        method: 'put',
        url: '/recipe/update',
        data: {
          newRecipe,
          newResult,
          recipeId
        }
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async delete(recipeId) {
    try {
      const response = await http({
        method: 'delete',
        url: '/recipe/delete',
        data: {
          recipeId
        }
      })
      return response
    } catch (error) {
      throw error.response
    }
  }
}

export default Recipes
