import axios from 'axios'

export async function getElements () {
  try {
    const response = await axios.get('/api/elements')
    return response
  } catch (error) {
    throw error.response
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
    throw error.response
  }
}

export async function putElement (elementId, name, description, category) {
  try {
    const response = await axios({
      method: 'put',
      url: '/api/element/update',
      data: {
        elementId,
        name,
        description,
        category
      }
    })
    return response
  } catch (error) {
    throw error.response
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
    throw error.response
  }
}
