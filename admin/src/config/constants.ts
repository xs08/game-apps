export const SERVICE_TYPES = {
  BACKEND: 'backend',
  GATEWAY: 'gateway',
  AGENT: 'agent',
} as const

export type ServiceType = typeof SERVICE_TYPES[keyof typeof SERVICE_TYPES]

export const SERVICE_NAMES = {
  [SERVICE_TYPES.BACKEND]: '后端服务',
  [SERVICE_TYPES.GATEWAY]: '网关服务',
  [SERVICE_TYPES.AGENT]: 'Agent 服务',
} as const

export const CONFIG_FILE_TYPES = {
  [SERVICE_TYPES.BACKEND]: 'yaml',
  [SERVICE_TYPES.GATEWAY]: 'toml',
  [SERVICE_TYPES.AGENT]: 'yaml',
} as const

export const SYSTEM_CONFIG_CATEGORIES = {
  BASIC: 'basic',
  SECURITY: 'security',
  NOTIFICATION: 'notification',
} as const

export type SystemConfigCategory =
  typeof SYSTEM_CONFIG_CATEGORIES[keyof typeof SYSTEM_CONFIG_CATEGORIES]

export const SYSTEM_CONFIG_CATEGORY_NAMES = {
  [SYSTEM_CONFIG_CATEGORIES.BASIC]: '基础配置',
  [SYSTEM_CONFIG_CATEGORIES.SECURITY]: '安全配置',
  [SYSTEM_CONFIG_CATEGORIES.NOTIFICATION]: '通知配置',
} as const

