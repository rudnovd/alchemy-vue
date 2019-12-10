import { http } from '@/services/http'

export const Users = {
  async get() {
    try {
      const response = await http({
        method: 'get',
        url: '/users'
      })
      return response
    } catch {
      throw error.response
    }
  }
}

export default Users
