import { http } from '@/services/http'

export const Account = {
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
    } catch {
      throw error.response
    }
  },
  async changeRole(_id, role) {
    try {
      const response = await http({
        method: 'put',
        url: '/account/role/update',
        data: {
          _id,
          role
        }
      })
      return response
    } catch {
      throw error.response
    }
  },
  async disable(_id) {
    try {
      const response = await http({
        method: 'put',
        url: '/account/disable',
        data: {
          _id
        }
      })
      return response
    } catch {
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
    } catch {
      throw error.response
    }
  },
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
    } catch {
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
    } catch {
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
    } catch {
      throw error.response
    }
  },
  async updateInformation(_id, password, username, role) {
    try {
      const response = await http({
        method: 'put',
        url: '/account/update',
        data: {
          _id,
          password,
          username,
          role
        }
      })
      return response
    } catch {
      throw error.response
    }
  }
}

export default Account
