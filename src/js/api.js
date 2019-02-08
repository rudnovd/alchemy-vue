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
    let form = new FormData()
    form.set('name', name)
    form.set('category', category)

    const response = await axios({
      method: 'post',
      url: '/api/element/add',
      data: form
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function putElement (elementId, name) {
  try {
    let form = new FormData()
    form.set('elementId', elementId)
    form.set('name', name)

    const response = await axios({
      method: 'put',
      url: '/api/element/update',
      data: form
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function deleteElement (elementId) {
  try {
    let form = new FormData()
    form.set('elementId', elementId)

    const response = await axios({
      method: 'delete',
      url: '/api/element/delete',
      data: form
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
    let form = new FormData()
    form.set('name', name)

    const response = await axios({
      method: 'post',
      url: '/api/category/add',
      data: form
    })
    return response
  } catch (error) {
    return error
  }
}

export async function putCategory (name, categoryId) {
  try {
    let form = new FormData()
    form.set('name', name)
    form.set('categoryId', categoryId)

    const response = await axios({
      method: 'put',
      url: '/api/category/update',
      data: form
    })
    return response
  } catch (error) {
    return error
  }
}

export async function deleteCategory (categoryId) {
  try {
    let form = new FormData()
    form.set('categoryId', categoryId)

    const response = await axios({
      method: 'detele',
      url: '/api/category/delete',
      data: form
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

export async function postRecipes (recipe, result) {
  try {
    let form = new FormData()
    form.set('recipe', recipe)
    form.set('result', result)

    const response = await axios({
      method: 'post',
      url: '/api/recipes/add',
      data: form
    })
    return response
  } catch (error) {
    return error
  }
}

export async function putRecipes (newRecipe, newResult, recipeId) {
  try {
    let form = new FormData()
    form.set('newRecipe', newRecipe)
    form.set('newResult', newResult)
    form.set('recipeId', recipeId)

    const response = await axios({
      method: 'put',
      url: '/api/recipes/update',
      data: form
    })
    return response
  } catch (error) {
    return error
  }
}

export async function deleteRecipe (recipeId) {
  try {
    let form = new FormData()
    form.set('recipeId', recipeId)

    const response = await axios({
      method: 'delete',
      url: '/api/recipes/delete',
      data: form
    })
    return response
  } catch (error) {
    return error
  }
}
