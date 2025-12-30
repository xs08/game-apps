export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  refresh_token: string
  user: UserInfo
}

export interface UserInfo {
  id: number
  username: string
  email: string
  nickname: string
  role: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface UserListResponse {
  list: UserInfo[]
  total: number
  page: number
  page_size: number
}

export interface UserListParams {
  page?: number
  page_size?: number
  keyword?: string
  status?: 'active' | 'inactive'
}

export interface UpdateUserRequest {
  nickname?: string
  email?: string
  status?: 'active' | 'inactive'
}

export interface ConfigResponse {
  content: string
  service: string
  file_type: 'yaml' | 'toml'
}

export interface ValidateConfigRequest {
  content: string
}

export interface ValidateConfigResponse {
  valid: boolean
  errors?: string[]
}

