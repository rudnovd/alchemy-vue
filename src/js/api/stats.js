import axios from 'axios'

export async function getStats () {
  try {
    const response = await axios({
      method: 'get',
      url: '/api/stats'
    })
    return response
  } catch (error) {
    throw error.response
  }
}
