// API 服务封装
import { request, get, post, put, del } from '../utils/request';
import { API_PATHS } from '../config/api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserInfo,
  UserProfile,
  UserStats,
  CreateRoomRequest,
  Room,
  JoinRoomRequest,
  GameState,
} from '../types/api';

// 用户相关 API
export const userApi = {
  // 登录
  login(data: LoginRequest): Promise<LoginResponse> {
    return post<LoginResponse>(API_PATHS.USER_LOGIN, data);
  },

  // 注册
  register(data: RegisterRequest): Promise<LoginResponse> {
    return post<LoginResponse>(API_PATHS.USER_REGISTER, data);
  },

  // 刷新 Token
  refreshToken(refreshToken: string): Promise<LoginResponse> {
    return post<LoginResponse>(API_PATHS.USER_REFRESH_TOKEN, {
      refresh_token: refreshToken,
    });
  },

  // 登出
  logout(): Promise<void> {
    return post<void>(API_PATHS.USER_LOGOUT);
  },

  // 获取用户资料
  getProfile(): Promise<UserProfile> {
    return get<UserProfile>(API_PATHS.USER_PROFILE);
  },

  // 更新用户资料
  updateProfile(data: Partial<UserProfile>): Promise<void> {
    return put<void>(API_PATHS.USER_UPDATE_PROFILE, data);
  },

  // 获取用户统计
  getStats(): Promise<UserStats> {
    return get<UserStats>(API_PATHS.USER_STATS);
  },
};

// 游戏相关 API
export const gameApi = {
  // 创建房间
  createRoom(data: CreateRoomRequest): Promise<Room> {
    return post<Room>(API_PATHS.GAME_CREATE_ROOM, data);
  },

  // 加入房间
  joinRoom(data: JoinRoomRequest): Promise<Room> {
    return post<Room>(API_PATHS.GAME_JOIN_ROOM, data);
  },

  // 离开房间
  leaveRoom(roomId: number): Promise<void> {
    return del<void>(`${API_PATHS.GAME_LEAVE_ROOM}/${roomId}`);
  },

  // 获取房间信息
  getRoom(roomId: number): Promise<Room> {
    return get<Room>(`${API_PATHS.GAME_GET_ROOM}/${roomId}`);
  },

  // 获取房间列表
  listRooms(params?: {
    status?: number;
    limit?: number;
    offset?: number;
  }): Promise<Room[]> {
    return get<Room[]>(API_PATHS.GAME_LIST_ROOMS, params);
  },

  // 开始游戏
  startGame(roomId: number): Promise<void> {
    return post<void>(`${API_PATHS.GAME_START}/${roomId}/start`);
  },

  // 获取游戏状态
  getGameState(roomId: number): Promise<GameState> {
    return get<GameState>(`${API_PATHS.GAME_STATE}/${roomId}/state`);
  },
};

