import { api } from './api'
import { storage } from '../utils/storage'
import type { LoginRequest } from '../types/api'

export const authService = {
  async login(data: LoginRequest) {
    const response = await api.login(data)
    storage.setToken(response.token)
    storage.setRefreshToken(response.refresh_token)
    storage.setUserInfo(response.user)
    return response
  },

  async logout() {
    try {
      await api.logout()
    } catch (error) {
      // 即使请求失败也清除本地存储
      console.error('Logout error:', error)
    } finally {
      storage.clear()
    }
  },

  async refreshToken() {
    const refreshToken = storage.getRefreshToken()
    if (!refreshToken) {
      throw new Error('No refresh token')
    }
    const response = await api.refreshToken(refreshToken)
    storage.setToken(response.token)
    storage.setRefreshToken(response.refresh_token)
    if (response.user) {
      storage.setUserInfo(response.user)
    }
    return response
  },

  isAuthenticated(): boolean {
    return !!storage.getToken()
  },

  getUserInfo() {
    return storage.getUserInfo()
  },
}

