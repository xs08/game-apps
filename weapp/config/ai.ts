// AI 配置
export const AI_CONFIG = {
  // 大模型 API 配置（需要根据实际情况修改）
  provider: 'openai', // 'openai' | 'wenxin' | 'custom'
  apiKey: '', // 需要在配置文件中设置
  baseURL: 'https://api.openai.com/v1',
  model: 'gpt-3.5-turbo',
  timeout: 30000,
  // 文心一言配置
  wenxin: {
    apiKey: '',
    secretKey: '',
    baseURL: 'https://aip.baidubce.com',
  },
  // 自定义配置
  custom: {
    apiKey: '',
    baseURL: '',
  },
};

// AI 功能配置
export const AI_FEATURES = {
  // AI 助手配置
  assistant: {
    enabled: true,
    maxHints: 3, // 每个关卡最多提示次数
    contextWindow: 5, // 上下文窗口大小
  },
  // 剧情生成配置
  storyGeneration: {
    enabled: true,
    style: 'romantic', // 'romantic' | 'adventure' | 'mystery'
  },
  // 谜题生成配置
  puzzleGeneration: {
    enabled: true,
    difficultyRange: [1, 4],
  },
  // NPC 对话配置
  npcChat: {
    enabled: true,
    personality: 'friendly', // 'friendly' | 'mysterious' | 'humorous'
  },
};

