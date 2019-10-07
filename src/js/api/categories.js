import axios from 'axios'

export async function getCategories () {
  try {
    const response = await axios.get('/api/categories')
    return response
  } catch (error) {
    throw error.response
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
    throw error.response
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
    throw error.response
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
    throw error.response
  }
}
