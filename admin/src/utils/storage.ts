const TOKEN_KEY = 'admin_token'
const REFRESH_TOKEN_KEY = 'admin_refresh_token'
const USER_INFO_KEY = 'admin_user_info'

export const storage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY)
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
  },

  removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },

  getUserInfo(): any | null {
    const info = localStorage.getItem(USER_INFO_KEY)
    return info ? JSON.parse(info) : null
  },

  setUserInfo(info: any): void {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(info))
  },

  removeUserInfo(): void {
    localStorage.removeItem(USER_INFO_KEY)
  },

  clear(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_INFO_KEY)
  },
}

