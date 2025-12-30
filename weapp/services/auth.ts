// 认证服务
import { userApi } from './api';
import { STORAGE_KEYS } from '../utils/constants';
import { setStorage, getStorage, removeStorage } from '../utils/storage';
import type { LoginRequest, RegisterRequest, UserInfo } from '../types/api';

export class AuthService {
  private token: string | null = null;
  private refreshToken: string | null = null;
  private userInfo: UserInfo | null = null;

  constructor() {
    this.loadFromStorage();
  }

  /**
   * 从存储中加载认证信息
   */
  private loadFromStorage(): void {
    this.token = getStorage<string>(STORAGE_KEYS.TOKEN);
    this.refreshToken = getStorage<string>(STORAGE_KEYS.REFRESH_TOKEN);
    this.userInfo = getStorage<UserInfo>(STORAGE_KEYS.USER_INFO);
  }

  /**
   * 微信登录
   */
  async wechatLogin(): Promise<void> {
    return new Promise((resolve, reject) => {
      wx.login({
        success: async (res) => {
          if (res.code) {
            try {
              // 将 code 发送到后端进行登录
              // 这里需要后端支持微信登录接口
              const loginRes = await userApi.login({
                username: '', // 微信登录可能不需要用户名
                password: res.code, // 使用 code 作为临时密码
              });
              this.setAuthInfo(loginRes);
              resolve();
            } catch (error) {
              reject(error);
            }
          } else {
            reject(new Error('获取微信登录 code 失败'));
          }
        },
        fail: (error) => {
          reject(error);
        },
      });
    });
  }

  /**
   * 用户名密码登录
   */
  async login(username: string, password: string): Promise<void> {
    const loginRes = await userApi.login({ username, password });
    this.setAuthInfo(loginRes);
  }

  /**
   * 注册
   */
  async register(data: RegisterRequest): Promise<void> {
    const loginRes = await userApi.register(data);
    this.setAuthInfo(loginRes);
  }

  /**
   * 设置认证信息
   */
  private setAuthInfo(loginRes: any): void {
    this.token = loginRes.token;
    this.refreshToken = loginRes.refresh_token;
    this.userInfo = loginRes.user;

    // 保存到本地存储
    if (this.token) {
      setStorage(STORAGE_KEYS.TOKEN, this.token);
    }
    if (this.refreshToken) {
      setStorage(STORAGE_KEYS.REFRESH_TOKEN, this.refreshToken);
    }
    if (this.userInfo) {
      setStorage(STORAGE_KEYS.USER_INFO, this.userInfo);
    }
  }

  /**
   * 登出
   */
  async logout(): Promise<void> {
    try {
      await userApi.logout();
    } catch (error) {
      console.error('登出请求失败:', error);
    } finally {
      this.clearAuthInfo();
    }
  }

  /**
   * 清除认证信息
   */
  private clearAuthInfo(): void {
    this.token = null;
    this.refreshToken = null;
    this.userInfo = null;

    removeStorage(STORAGE_KEYS.TOKEN);
    removeStorage(STORAGE_KEYS.REFRESH_TOKEN);
    removeStorage(STORAGE_KEYS.USER_INFO);
  }

  /**
   * 刷新 Token
   */
  async refreshToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('没有 refresh token');
    }

    const loginRes = await userApi.refreshToken(this.refreshToken);
    this.setAuthInfo(loginRes);
  }

  /**
   * 获取 Token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * 设置 Token（用于从外部设置）
   */
  setToken(token: string): void {
    this.token = token;
    setStorage(STORAGE_KEYS.TOKEN, token);
  }

  /**
   * 获取用户信息
   */
  getUserInfo(): UserInfo | null {
    return this.userInfo;
  }

  /**
   * 更新用户信息
   */
  updateUserInfo(userInfo: UserInfo): void {
    this.userInfo = userInfo;
    setStorage(STORAGE_KEYS.USER_INFO, userInfo);
  }

  /**
   * 检查是否已登录
   */
  isAuthenticated(): boolean {
    return !!this.token;
  }
}

// 导出单例
export const authService = new AuthService();

