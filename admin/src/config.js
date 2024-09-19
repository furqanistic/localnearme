import axios from 'axios'

export const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8800/api/',
  baseURL: 'http://localhost:8800/api/',
})
