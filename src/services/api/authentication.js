import { http } from '@/services/http'

export const Authentication = {
  async getUserData() {
    try {
      const response = await http({
        method: 'get',
        url: '/login'
      })
      return response
    } catch {
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
    } catch {
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
    } catch {
      throw error.response
    }
  }
}

export default Authentication
