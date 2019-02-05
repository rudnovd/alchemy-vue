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

export async function getRecipes () {
  try {
    const response = await axios.get('/api/recipes')
    return response
  } catch (error) {
    return error
  }
}
