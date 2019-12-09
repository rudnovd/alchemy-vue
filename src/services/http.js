import axios from 'axios'

// Axios config
export const http = axios.create({
  baseURL: '/api'
})
