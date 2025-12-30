// 用户相关类型已在 api.d.ts 中定义，这里可以扩展
export interface UserPreferences {
  sound_enabled: boolean;
  music_enabled: boolean;
  vibration_enabled: boolean;
  language: string;
  theme: 'light' | 'dark';
}

