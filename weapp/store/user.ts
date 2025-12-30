// 用户状态管理
import { authService } from '../services/auth';
import type { UserInfo, UserProfile, UserStats } from '../types/api';

export class UserStore {
  private userInfo: UserInfo | null = null;
  private profile: UserProfile | null = null;
  private stats: UserStats | null = null;
  private listeners: Array<() => void> = [];

  constructor() {
    this.loadUserInfo();
  }

  /**
   * 从服务加载用户信息
   */
  private loadUserInfo(): void {
    this.userInfo = authService.getUserInfo();
  }

  /**
   * 设置用户信息
   */
  setUserInfo(userInfo: UserInfo | null): void {
    this.userInfo = userInfo;
    if (userInfo) {
      authService.updateUserInfo(userInfo);
    }
    this.notifyListeners();
  }

  /**
   * 获取用户信息
   */
  getUserInfo(): UserInfo | null {
    return this.userInfo;
  }

  /**
   * 设置用户资料
   */
  setProfile(profile: UserProfile | null): void {
    this.profile = profile;
    this.notifyListeners();
  }

  /**
   * 获取用户资料
   */
  getProfile(): UserProfile | null {
    return this.profile;
  }

  /**
   * 设置用户统计
   */
  setStats(stats: UserStats | null): void {
    this.stats = stats;
    this.notifyListeners();
  }

  /**
   * 获取用户统计
   */
  getStats(): UserStats | null {
    return this.stats;
  }

  /**
   * 设置 Token
   */
  setToken(token: string): void {
    authService.setToken(token);
  }

  /**
   * 检查是否已登录
   */
  isAuthenticated(): boolean {
    return authService.isAuthenticated();
  }

  /**
   * 订阅状态变化
   */
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * 通知监听器
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}

