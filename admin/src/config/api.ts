export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 30000,
}

export const API_PATHS = {
  // 认证相关
  AUTH_LOGIN: '/admin/auth/login',
  AUTH_LOGOUT: '/admin/auth/logout',
  AUTH_REFRESH: '/admin/auth/refresh',

  // 配置管理
  CONFIG_GET: (service: string) => `/admin/config/${service}`,
  CONFIG_UPDATE: (service: string) => `/admin/config/${service}`,
  CONFIG_VALIDATE: (service: string) => `/admin/config/${service}/validate`,
  CONFIG_RELOAD: (service: string) => `/admin/config/${service}/reload`,

  // 用户管理
  USER_LIST: '/admin/users',
  USER_DETAIL: (id: string | number) => `/admin/users/${id}`,
  USER_UPDATE: (id: string | number) => `/admin/users/${id}`,
  USER_UPDATE_STATUS: (id: string | number) => `/admin/users/${id}/status`,

  // 系统配置
  SYSTEM_CONFIG: '/admin/system/config',
  SYSTEM_CONFIG_CATEGORY: (category: string) =>
    `/admin/system/config/${category}`,
}

