// API 配置
export const API_CONFIG = {
  // 开发环境
  // baseURL: 'http://localhost:8080',
  // 生产环境（需要根据实际情况修改）
  baseURL: 'https://your-api-domain.com',
  timeout: 10000,
  // WebSocket 地址
  wsURL: 'ws://localhost:8080/ws',
  // wsURL: 'wss://your-api-domain.com/ws',
};

// API 路径
export const API_PATHS = {
  // 用户相关
  USER_LOGIN: '/api/v1/user/login',
  USER_REGISTER: '/api/v1/user/register',
  USER_REFRESH_TOKEN: '/api/v1/user/refresh',
  USER_LOGOUT: '/api/v1/user/logout',
  USER_PROFILE: '/api/v1/user/profile',
  USER_UPDATE_PROFILE: '/api/v1/user/profile',
  USER_STATS: '/api/v1/user/stats',
  // 游戏相关
  GAME_CREATE_ROOM: '/api/v1/game/rooms',
  GAME_JOIN_ROOM: '/api/v1/game/rooms/join',
  GAME_LEAVE_ROOM: '/api/v1/game/rooms',
  GAME_GET_ROOM: '/api/v1/game/rooms',
  GAME_LIST_ROOMS: '/api/v1/game/rooms',
  GAME_START: '/api/v1/game/rooms',
  GAME_STATE: '/api/v1/game/rooms',
};

