import { create } from 'zustand'
import { authService } from '../services/auth'
import type { UserInfo } from '../types/api'

interface AuthState {
  isAuthenticated: boolean
  user: UserInfo | null
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  init: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  init: () => {
    const isAuth = authService.isAuthenticated()
    const user = authService.getUserInfo()
    set({
      isAuthenticated: isAuth,
      user,
    })
  },

  login: async (username: string, password: string) => {
    const response = await authService.login({ username, password })
    set({
      isAuthenticated: true,
      user: response.user,
    })
  },

  logout: async () => {
    await authService.logout()
    set({
      isAuthenticated: false,
      user: null,
    })
  },
}))

