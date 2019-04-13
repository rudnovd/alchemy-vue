import axios from 'axios'

export async function getLogin () {
  try {
    const response = await axios({
      method: 'get',
      url: '/api/login'
    })
    return response
  } catch (error) {
    return error
  }
}

export async function postLogin (usernameOrEmail, password) {
  try {
    const response = await axios({
      method: 'post',
      url: '/api/login',
      data: {
        email: usernameOrEmail,
        password
      }
    })
    return response
  } catch (error) {
    return error
  }
}
