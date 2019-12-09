import { http } from '@/services/http'

export const User = {
  async register(email, username, password) {
    try {
      const response = await http({
        method: 'post',
        url: '/account/add',
        data: {
          email,
          username,
          password
        }
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async update(_id, password, username, role) {
    try {
      const response = await http({
        method: 'put',
        url: '/account/add',
        data: {
          _id,
          password,
          username,
          role
        }
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async login(email, password, remember) {
    try {
      const response = await http({
        method: 'post',
        url: '/login',
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
  },
  async getData() {
    try {
      const response = await http({
        method: 'get',
        url: '/login'
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async resetPassword(email) {
    try {
      const response = await http({
        method: 'put',
        url: '/account/password/reset',
        data: {
          email
        }
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async getElements() {
    try {
      const response = await http({
        method: 'get',
        url: '/account/elements'
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async addOpenedElement(elementId) {
    try {
      const response = await http({
        method: 'put',
        url: '/account/element/add',
        data: {
          elementId
        }
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async logout() {
    try {
      const response = await http({
        method: 'get',
        url: '/logout'
      })
      return response
    } catch (error) {
      throw error.response
    }
  }
}

export default User
