import axios from 'axios'
import useAuthStore from '@/store/authStore'

const request = axios.create({
  baseURL: '/',
  timeout: 15000,
})

request.interceptors.request.use(
  (config) => {
    const userInfo = useAuthStore.getState().userInfo
    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default request
