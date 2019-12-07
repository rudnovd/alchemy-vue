import axios from 'axios'

export async function getLogin() {
  try {
    const response = await axios({
      method: 'get',
      url: '/api/login'
    })
    return response
  } catch (error) {
    throw error.response
  }
}

export async function postLogin(email, password, remember) {
  try {
    const response = await axios({
      method: 'post',
      url: '/api/login',
      data: {
        email,
        password,
        remember
      }
    })
    return response
  } catch (error) {
    throw error.response
  }
}

export async function getLogout() {
  try {
    const response = await axios({
      method: 'get',
      url: '/api/logout'
    })
    return response
  } catch (error) {
    throw error.response
  }
}
