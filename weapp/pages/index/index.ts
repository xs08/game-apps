// 首页
import { authService } from '../../services/auth';
import { getApp } from '../../utils/app';

Page({
  data: {
    userInfo: null as any,
    isAuthenticated: false,
  },

  onLoad() {
    this.checkAuth();
  },

  onShow() {
    this.checkAuth();
  },

  checkAuth() {
    const isAuthenticated = authService.isAuthenticated();
    const userInfo = authService.getUserInfo();
    this.setData({
      isAuthenticated,
      userInfo,
    });
  },

  // 开始游戏
  startGame() {
    if (!this.data.isAuthenticated) {
      wx.navigateTo({
        url: '/pages/login/login',
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/lobby/lobby',
    });
  },

  // 查看关卡
  viewLevels() {
    if (!this.data.isAuthenticated) {
      wx.navigateTo({
        url: '/pages/login/login',
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/levels/levels',
    });
  },

  // 个人中心
  goToProfile() {
    if (!this.data.isAuthenticated) {
      wx.navigateTo({
        url: '/pages/login/login',
      });
      return;
    }
    wx.switchTab({
      url: '/pages/profile/profile',
    });
  },
});

