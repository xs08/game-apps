import { UserStore } from './store/user';

App<IAppOption>({
  globalData: {
    userStore: new UserStore(),
  },
  onLaunch() {
    console.log('小程序启动');
    // 检查登录状态
    this.checkLogin();
  },
  onShow() {
    console.log('小程序显示');
  },
  onHide() {
    console.log('小程序隐藏');
  },
  checkLogin() {
    // 检查本地存储的 token
    const token = wx.getStorageSync('token');
    if (token) {
      // 验证 token 有效性
      this.globalData.userStore.setToken(token);
    }
  },
});

