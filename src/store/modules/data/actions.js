import { getElements, postElement, putElement, deleteElement } from '@/js/api/elements'
import { getCategories, postCategory, putCategory, deleteCategory } from '@/js/api/categories'
import { getRecipes, postRecipe, putRecipe, deleteRecipe } from '@/js/api/recipes'

export default {
  async getElements ({ commit }) {
    commit('LOADING_START', 'elements')
    commit('SET_METHOD', { object: 'elements', method: 'GET' })
    await getElements()
      .then(response => {
        commit('SET_ELEMENTS', response.data.response)
        this.totalRows = response.data.response.length // Total rows for pagination
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'elemenets', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'elements', method: '' })
        commit('LOADING_END', 'elements')
      })
  },
  async postElement ({ commit }, element) {
    commit('LOADING_START', 'elements')
    commit('SET_METHOD', { object: 'elements', method: 'POST' })
    console.log(element)
    await postElement(element.name, element.category)
      .then(() => {
        commit('ADD_ELEMENT', element)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'elemenets', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'elements', method: '' })
        commit('LOADING_END', 'elements')
      })
  },
  async putElement ({ commit }, element) {
    commit('LOADING_START', 'elements')
    commit('SET_METHOD', { object: 'elements', method: 'PUT' })
    await putElement(element._id, element.name, element.description, element.category)
      .then(() => {
        commit('EDIT_ELEMENT', element)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'elemenets', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'elements', method: '' })
        commit('LOADING_END', 'elements')
      })
  },
  async deleteElement ({ commit }, element) {
    commit('LOADING_START', 'elements')
    commit('SET_METHOD', { object: 'elements', method: 'DELETE' })
    await deleteElement(element._id)
      .then(() => {
        commit('DELETE_ELEMENT', element)
      })
      .catch(error => {
        console.log('error', error)
        commit('SET_ERROR', { object: 'elements', error: error })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'elements', method: '' })
        commit('LOADING_END', 'elements')
      })
  },

  async getCategories ({ commit }) {
    commit('LOADING_START', 'categories')
    commit('SET_METHOD', { object: 'categories', method: 'GET' })
    await getCategories()
      .then(response => {
        commit('SET_CATEGORIES', response.data.response)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'categories', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'categories', method: '' })
        commit('LOADING_END', 'categories')
      })
  },
  async postCategory ({ commit }, category) {
    commit('LOADING_START', 'categories')
    commit('SET_METHOD', { object: 'categories', method: 'POST' })
    await postCategory(category)
      .then(() => {
        commit('ADD_CATEGORY', category)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'categories', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'categories', method: '' })
        commit('LOADING_END', 'categories')
      })
  },
  async putCategory ({ commit }, category) {
    commit('LOADING_START', 'categories')
    commit('SET_METHOD', { object: 'categories', method: 'PUT' })
    await putCategory(category.name, category._id)
      .then(() => {
        commit('EDIT_CATEGORY', category)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'categories', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'categories', method: '' })
        commit('LOADING_END', 'categories')
      })
  },
  async deleteCategory ({ commit }, category) {
    commit('LOADING_START', 'categories')
    commit('SET_METHOD', { object: 'categories', method: 'DELETE' })
    await deleteCategory(category)
      .then(() => {
        commit('DELETE_CATEGORY', category)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'categories', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'categories', method: '' })
        commit('LOADING_END', 'categories')
      })
  },

  async getRecipes ({ commit }) {
    commit('LOADING_START', 'recipes')
    commit('SET_METHOD', { object: 'recipes', method: 'GET' })
    await getRecipes()
      .then(response => {
        commit('SET_RECIPES', response.data.response)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'recipes', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'recipes', method: '' })
        commit('LOADING_END', 'recipes')
      })
  },
  async postRecipe ({ commit }, recipe) {
    commit('LOADING_START', 'recipes')
    commit('SET_METHOD', { object: 'recipes', method: 'POST' })
    await postRecipe(recipe.recipe, recipe.result)
      .then(() => {
        commit('ADD_RECIPE', recipe)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'recipes', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'recipes', method: '' })
        commit('LOADING_END', 'recipes')
      })
  },
  async putRecipe ({ commit }, recipe) {
    commit('LOADING_START', 'recipes')
    commit('SET_METHOD', { object: 'recipes', method: 'PUT' })
    await putRecipe(recipe.newRecipe, recipe.newResult, recipe._id)
      .then(() => {
        commit('EDIT_RECIPE', recipe)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'recipes', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'recipes', method: '' })
        commit('LOADING_END', 'recipes')
      })
  },
  async deleteRecipe ({ commit }, recipe) {
    commit('LOADING_START', 'recipes')
    commit('SET_METHOD', { object: 'recipes', method: 'DELETE' })
    await deleteRecipe(recipe._id)
      .then(() => {
        commit('DELETE_RECIPE', recipe)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'recipes', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'recipes', method: '' })
        commit('LOADING_END', 'recipes')
      })
  }
}
