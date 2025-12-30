import { ServiceType, SystemConfigCategory } from '../config/constants'

export interface SystemBasicConfig {
  timezone: string
  language: string
  theme: 'light' | 'dark'
  site_name: string
  site_description: string
  site_logo: string
}

export interface SystemSecurityConfig {
  password_policy: {
    min_length: number
    require_uppercase: boolean
    require_lowercase: boolean
    require_numbers: boolean
    require_special_chars: boolean
    expiration_days: number
  }
  ip_whitelist: string[]
  jwt: {
    secret: string
    expiration_hours: number
    refresh_expiration_hours: number
  }
  session: {
    timeout_minutes: number
    max_concurrent_sessions: number
  }
}

export interface SystemNotificationConfig {
  email: {
    enabled: boolean
    smtp_host: string
    smtp_port: number
    smtp_user: string
    smtp_password: string
    from_email: string
    from_name: string
  }
  sms: {
    enabled: boolean
    provider: string
    api_key: string
    api_secret: string
  }
  push: {
    enabled: boolean
    provider: string
    api_key: string
  }
}

export interface SystemConfig {
  basic: SystemBasicConfig
  security: SystemSecurityConfig
  notification: SystemNotificationConfig
}

