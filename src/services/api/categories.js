import { http } from '@/services/http'

export const Categories = {
  async add(name) {
    try {
      const response = await http({
        method: 'post',
        url: '/category/add',
        data: {
          name
        }
      })
      return response
    } catch {
      throw error.response
    }
  },
  async delete(categoryId) {
    try {
      const response = await http({
        method: 'detele',
        url: '/category/delete',
        data: {
          categoryId
        }
      })
      return response
    } catch {
      throw error.response
    }
  },
  async get() {
    try {
      const response = await http({
        method: 'get',
        url: '/categories'
      })
      return response
    } catch {
      throw error.response
    }
  },
  async update(name, categoryId) {
    try {
      const response = await http({
        method: 'put',
        url: '/category/update',
        data: {
          name,
          categoryId
        }
      })
      return response
    } catch {
      throw error.response
    }
  }
}

export default Categories
