// 常量定义

// 存储键名
export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refresh_token',
  USER_INFO: 'user_info',
  GAME_PROGRESS: 'game_progress',
  SETTINGS: 'settings',
};

// 游戏常量
export const GAME_CONSTANTS = {
  MAX_PLAYERS_PER_ROOM: 2,
  MIN_PLAYERS_TO_START: 2,
  HEARTBEAT_INTERVAL: 30000, // 30秒
  RECONNECT_DELAY: 3000, // 3秒
  MAX_RECONNECT_ATTEMPTS: 5,
  PUZZLE_TIMEOUT: 600000, // 10分钟
};

// 错误码
export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  ROOM_FULL: 'ROOM_FULL',
  ROOM_NOT_FOUND: 'ROOM_NOT_FOUND',
  GAME_ALREADY_STARTED: 'GAME_ALREADY_STARTED',
  INVALID_INPUT: 'INVALID_INPUT',
  AI_SERVICE_ERROR: 'AI_SERVICE_ERROR',
};

// 消息提示
export const MESSAGES = {
  CONNECTING: '连接中...',
  CONNECTED: '已连接',
  DISCONNECTED: '连接断开',
  RECONNECTING: '重新连接中...',
  ROOM_CREATED: '房间创建成功',
  ROOM_JOINED: '加入房间成功',
  ROOM_LEFT: '已离开房间',
  GAME_STARTED: '游戏开始',
  GAME_COMPLETED: '关卡完成',
  PUZZLE_SOLVED: '谜题已解决',
  HINT_USED: '提示已使用',
  NETWORK_ERROR: '网络错误，请检查网络连接',
  UNAUTHORIZED: '未授权，请重新登录',
};

