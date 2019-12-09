import { http } from '@/services/http'

export const Elements = {
  async getInitialElements() {
    try {
      const response = await http({
        method: 'get',
        url: '/initialElements'
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async get() {
    try {
      const response = await http({
        method: 'get',
        url: '/elements'
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async add(name, category) {
    try {
      const response = await http({
        method: 'post',
        url: '/element/add',
        data: {
          name,
          category
        }
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async update(elementId, name, description, category) {
    try {
      const response = await http({
        method: 'put',
        url: '/element/update',
        data: {
          elementId,
          name,
          description,
          category
        }
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  async delete(elementId) {
    try {
      const response = await http({
        method: 'delete',
        url: '/element/delete',
        data: {
          elementId
        }
      })
      return response
    } catch (error) {
      throw error.response
    }
  }
}

export default Elements
