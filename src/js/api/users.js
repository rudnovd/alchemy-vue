import axios from 'axios'

export async function getUsers () {
  try {
    const response = await axios({
      method: 'get',
      url: '/api/users'
    })
    return response
  } catch (error) {
    throw error.response
  }
}
