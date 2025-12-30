import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { message } from 'antd'
import { API_CONFIG } from '../config/api'
import { storage } from './storage'

const request: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data } = response
    // 如果后端返回的数据格式是 { code, data, message }
    if (data.code !== undefined) {
      if (data.code === 0 || data.code === 200) {
        return data.data !== undefined ? data.data : data
      } else {
        message.error(data.message || '请求失败')
        return Promise.reject(new Error(data.message || '请求失败'))
      }
    }
    return data
  },
  (error: AxiosError<{ message?: string }>) => {
    if (error.response) {
      const { status, data } = error.response
      if (status === 401) {
        storage.removeToken()
        window.location.href = '/login'
        message.error('登录已过期，请重新登录')
      } else {
        message.error(data?.message || `请求失败: ${status}`)
      }
    } else if (error.request) {
      message.error('网络错误，请检查网络连接')
    } else {
      message.error('请求配置错误')
    }
    return Promise.reject(error)
  }
)

export default request

