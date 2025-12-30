import { useEffect } from 'react'
import { useAuthStore } from '../store/auth'

export function useAuth() {
  const { init, isAuthenticated, user, login, logout } = useAuthStore()

  useEffect(() => {
    init()
  }, [init])

  return {
    isAuthenticated,
    user,
    login,
    logout,
  }
}

