import request from '../utils/request'
import { API_PATHS } from '../config/api'
import type {
  LoginRequest,
  LoginResponse,
  UserListResponse,
  UserListParams,
  UpdateUserRequest,
  UserInfo,
  ConfigResponse,
  ValidateConfigRequest,
  ValidateConfigResponse,
} from '../types/api'
import type { SystemConfig } from '../types/config'

export const api = {
  // 认证
  login(data: LoginRequest): Promise<LoginResponse> {
    return request.post(API_PATHS.AUTH_LOGIN, data)
  },

  logout(): Promise<void> {
    return request.post(API_PATHS.AUTH_LOGOUT)
  },

  refreshToken(refreshToken: string): Promise<LoginResponse> {
    return request.post(API_PATHS.AUTH_REFRESH, { refresh_token: refreshToken })
  },

  // 配置管理
  getConfig(service: string): Promise<ConfigResponse> {
    return request.get(API_PATHS.CONFIG_GET(service))
  },

  updateConfig(service: string, content: string): Promise<void> {
    return request.put(API_PATHS.CONFIG_UPDATE(service), { content })
  },

  validateConfig(
    service: string,
    data: ValidateConfigRequest
  ): Promise<ValidateConfigResponse> {
    return request.post(API_PATHS.CONFIG_VALIDATE(service), data)
  },

  reloadConfig(service: string): Promise<void> {
    return request.post(API_PATHS.CONFIG_RELOAD(service))
  },

  // 用户管理
  getUserList(params?: UserListParams): Promise<UserListResponse> {
    return request.get(API_PATHS.USER_LIST, { params })
  },

  getUserDetail(id: string | number): Promise<UserInfo> {
    return request.get(API_PATHS.USER_DETAIL(id))
  },

  updateUser(id: string | number, data: UpdateUserRequest): Promise<void> {
    return request.put(API_PATHS.USER_UPDATE(id), data)
  },

  updateUserStatus(
    id: string | number,
    status: 'active' | 'inactive'
  ): Promise<void> {
    return request.put(API_PATHS.USER_UPDATE_STATUS(id), { status })
  },

  // 系统配置
  getSystemConfig(): Promise<SystemConfig> {
    return request.get(API_PATHS.SYSTEM_CONFIG)
  },

  updateSystemConfig(data: Partial<SystemConfig>): Promise<void> {
    return request.put(API_PATHS.SYSTEM_CONFIG, data)
  },

  getSystemConfigCategory(category: string): Promise<any> {
    return request.get(API_PATHS.SYSTEM_CONFIG_CATEGORY(category))
  },

  updateSystemConfigCategory(category: string, data: any): Promise<void> {
    return request.put(API_PATHS.SYSTEM_CONFIG_CATEGORY(category), data)
  },
}

