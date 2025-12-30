// 本地存储工具

/**
 * 设置存储
 */
export function setStorage(key: string, value: any): void {
  try {
    wx.setStorageSync(key, value);
  } catch (error) {
    console.error('设置存储失败:', error);
  }
}

/**
 * 获取存储
 */
export function getStorage<T = any>(key: string): T | null {
  try {
    return wx.getStorageSync(key) as T;
  } catch (error) {
    console.error('获取存储失败:', error);
    return null;
  }
}

/**
 * 删除存储
 */
export function removeStorage(key: string): void {
  try {
    wx.removeStorageSync(key);
  } catch (error) {
    console.error('删除存储失败:', error);
  }
}

/**
 * 清空存储
 */
export function clearStorage(): void {
  try {
    wx.clearStorageSync();
  } catch (error) {
    console.error('清空存储失败:', error);
  }
}

/**
 * 获取所有存储键
 */
export function getAllStorageKeys(): string[] {
  try {
    const info = wx.getStorageInfoSync();
    return info.keys;
  } catch (error) {
    console.error('获取存储键失败:', error);
    return [];
  }
}

