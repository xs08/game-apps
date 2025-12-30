// 登录页
import { authService } from '../../services/auth';
import { userApi } from '../../services/api';
import { validateUsername, validatePassword } from '../../utils/validator';
import { getApp } from '../../utils/app';

Page({
  data: {
    loginType: 'password', // 'password' | 'wechat'
    username: '',
    password: '',
    loading: false,
  },

  onLoad() {
    // 检查是否已登录
    if (authService.isAuthenticated()) {
      wx.switchTab({
        url: '/pages/index/index',
      });
    }
  },

  // 切换登录方式
  switchLoginType(e: any) {
    this.setData({
      loginType: e.currentTarget.dataset.type,
    });
  },

  // 输入用户名
  onUsernameInput(e: any) {
    this.setData({
      username: e.detail.value,
    });
  },

  // 输入密码
  onPasswordInput(e: any) {
    this.setData({
      password: e.detail.value,
    });
  },

  // 登录
  async handleLogin() {
    const { loginType, username, password } = this.data;

    if (loginType === 'wechat') {
      await this.wechatLogin();
    } else {
      if (!validateUsername(username)) {
        wx.showToast({
          title: '用户名格式不正确',
          icon: 'none',
        });
        return;
      }

      if (!validatePassword(password)) {
        wx.showToast({
          title: '密码至少6位',
          icon: 'none',
        });
        return;
      }

      await this.passwordLogin(username, password);
    }
  },

  // 微信登录
  async wechatLogin() {
    this.setData({ loading: true });
    try {
      await authService.wechatLogin();
      const app = getApp();
      if (app.globalData.userStore) {
        const userInfo = authService.getUserInfo();
        if (userInfo) {
          app.globalData.userStore.setUserInfo(userInfo);
        }
      }
      wx.showToast({
        title: '登录成功',
        icon: 'success',
      });
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index',
        });
      }, 1500);
    } catch (error: any) {
      wx.showToast({
        title: error.message || '登录失败',
        icon: 'none',
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  // 密码登录
  async passwordLogin(username: string, password: string) {
    this.setData({ loading: true });
    try {
      await authService.login(username, password);
      const app = getApp();
      if (app.globalData.userStore) {
        const userInfo = authService.getUserInfo();
        if (userInfo) {
          app.globalData.userStore.setUserInfo(userInfo);
        }
      }
      wx.showToast({
        title: '登录成功',
        icon: 'success',
      });
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index',
        });
      }, 1500);
    } catch (error: any) {
      wx.showToast({
        title: error.message || '登录失败',
        icon: 'none',
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  // 跳转到注册页
  goToRegister() {
    wx.navigateTo({
      url: '/pages/register/register',
    });
  },
});

