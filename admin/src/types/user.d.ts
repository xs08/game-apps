export interface User {
  id: number
  username: string
  email: string
  nickname: string
  avatar?: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  last_login_at?: string
}

export interface UserProfile extends User {
  stats?: {
    total_games: number
    total_wins: number
    total_losses: number
    win_rate: number
  }
}

export interface UserStats {
  total_users: number
  active_users: number
  inactive_users: number
  new_users_today: number
  new_users_this_week: number
  new_users_this_month: number
}

