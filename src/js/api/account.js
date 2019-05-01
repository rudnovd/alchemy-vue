import axios from 'axios'

export async function postAccount (email, username, password) {
  try {
    const response = await axios({
      method: 'post',
      url: '/api/account/add',
      data: {
        email,
        username,
        password
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function updateAccount (_id, password, username, role) {
  try {
    const response = await axios({
      method: 'put',
      url: '/api/account/add',
      data: {
        _id,
        password,
        username,
        role
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function putResetPassword (email) {
  try {
    const response = await axios({
      method: 'put',
      url: '/api/account/password/reset',
      data: {
        email
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function getAccountElements () {
  try {
    const response = await axios({
      method: 'get',
      url: '/api/account/elements'
    })
    return response
  } catch (error) {
    return error.response
  }
}
