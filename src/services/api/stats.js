import { http } from '@/services/http'

export const Stats = {
  async get() {
    try {
      const response = await http({
        method: 'get',
        url: '/stats'
      })
      return response
    } catch {
      throw error.response
    }
  }
}

export default Stats
