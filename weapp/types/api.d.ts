// API 响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 用户相关类型
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  user: UserInfo;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email?: string;
}

export interface UserInfo {
  id: number;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
}

export interface UserProfile {
  id: number;
  user_id: number;
  gender: number;
  birthday?: string;
  bio?: string;
  location?: string;
}

export interface UserStats {
  id: number;
  user_id: number;
  games_played: number;
  games_won: number;
  games_lost: number;
  win_rate: number;
  total_score: number;
  level: number;
  experience: number;
  last_played_at?: string;
}

// 房间相关类型
export interface CreateRoomRequest {
  name?: string;
  max_players?: number;
  game_type?: string;
  settings?: string;
}

export interface Room {
  id: number;
  room_code: string;
  name?: string;
  owner_id: number;
  status: RoomStatus;
  max_players: number;
  current_players: number;
  game_type?: string;
  settings?: string;
  started_at?: string;
  ended_at?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export enum RoomStatus {
  Waiting = 1,
  Playing = 2,
  Finished = 3,
  Cancelled = 4,
}

export interface JoinRoomRequest {
  room_code: string;
}

export interface RoomPlayer {
  id: number;
  room_id: number;
  user_id: number;
  is_ready: boolean;
  position: number;
  joined_at: string;
  left_at?: string;
}

// 游戏相关类型
export interface GameState {
  room_id: number;
  level: number;
  status: GameStatus;
  players: GamePlayer[];
  puzzle_state: PuzzleState;
  progress: number;
  started_at: string;
  updated_at: string;
}

export enum GameStatus {
  Waiting = 'waiting',
  Playing = 'playing',
  Paused = 'paused',
  Completed = 'completed',
  Failed = 'failed',
}

export interface GamePlayer {
  user_id: number;
  username: string;
  position: { x: number; y: number };
  action?: string;
  ready: boolean;
}

export interface PuzzleState {
  type: PuzzleType;
  data: any;
  solved: boolean;
  progress: number;
}

export enum PuzzleType {
  Jigsaw = 'jigsaw',
  Logic = 'logic',
  Password = 'password',
  Collaboration = 'collaboration',
}

// WebSocket 消息类型
export interface WSMessage {
  type: WSMessageType;
  data: any;
  timestamp: number;
}

export enum WSMessageType {
  // 连接相关
  Connect = 'connect',
  Disconnect = 'disconnect',
  Heartbeat = 'heartbeat',
  // 房间相关
  RoomUpdate = 'room_update',
  PlayerJoin = 'player_join',
  PlayerLeave = 'player_leave',
  PlayerReady = 'player_ready',
  // 游戏相关
  GameStart = 'game_start',
  GameState = 'game_state',
  GameAction = 'game_action',
  PuzzleUpdate = 'puzzle_update',
  GameComplete = 'game_complete',
  // 聊天相关
  Chat = 'chat',
}

