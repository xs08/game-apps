// 网络请求工具
import { API_CONFIG, API_PATHS } from '../config/api';
import { STORAGE_KEYS } from './constants';
import { getStorage, setStorage } from './storage';

export interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: Record<string, string>;
  showLoading?: boolean;
  loadingText?: string;
}

/**
 * 请求封装
 */
export function request<T = any>(options: RequestOptions): Promise<T> {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'GET',
      data,
      header = {},
      showLoading = true,
      loadingText = '加载中...',
    } = options;

    // 显示加载提示
    if (showLoading) {
      wx.showLoading({
        title: loadingText,
        mask: true,
      });
    }

    // 获取 token
    const token = getStorage<string>(STORAGE_KEYS.TOKEN);
    if (token) {
      header['Authorization'] = `Bearer ${token}`;
    }

    // 设置默认 header
    header['Content-Type'] = 'application/json';

    // 发起请求
    wx.request({
      url: `${API_CONFIG.baseURL}${url}`,
      method,
      data,
      header,
      timeout: API_CONFIG.timeout,
      success: (res) => {
        if (showLoading) {
          wx.hideLoading();
        }

        const statusCode = res.statusCode || 0;
        const response = res.data as any;

        // HTTP 状态码检查
        if (statusCode >= 200 && statusCode < 300) {
          // 业务状态码检查
          if (response.code === 0 || response.code === 200) {
            resolve(response.data || response);
          } else {
            // Token 过期，尝试刷新
            if (response.code === 401 || statusCode === 401) {
              handleTokenExpired()
                .then(() => {
                  // 重新发起请求
                  return request<T>(options);
                })
                .then(resolve)
                .catch(reject);
            } else {
              wx.showToast({
                title: response.message || '请求失败',
                icon: 'none',
              });
              reject(new Error(response.message || '请求失败'));
            }
          }
        } else {
          if (showLoading) {
            wx.hideLoading();
          }
          wx.showToast({
            title: `请求失败: ${statusCode}`,
            icon: 'none',
          });
          reject(new Error(`请求失败: ${statusCode}`));
        }
      },
      fail: (error) => {
        if (showLoading) {
          wx.hideLoading();
        }
        wx.showToast({
          title: '网络错误，请检查网络连接',
          icon: 'none',
        });
        reject(error);
      },
    });
  });
}

/**
 * 处理 Token 过期
 */
function handleTokenExpired(): Promise<void> {
  return new Promise((resolve, reject) => {
    const refreshToken = getStorage<string>(STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      // 跳转到登录页
      wx.reLaunch({
        url: '/pages/login/login',
      });
      reject(new Error('未登录'));
      return;
    }

    // 刷新 token
    request({
      url: API_PATHS.USER_REFRESH_TOKEN,
      method: 'POST',
      data: { refresh_token: refreshToken },
      showLoading: false,
    })
      .then((res: any) => {
        if (res.token) {
          setStorage(STORAGE_KEYS.TOKEN, res.token);
          if (res.refresh_token) {
            setStorage(STORAGE_KEYS.REFRESH_TOKEN, res.refresh_token);
          }
          resolve();
        } else {
          reject(new Error('刷新 token 失败'));
        }
      })
      .catch((error) => {
        // 刷新失败，跳转到登录页
        wx.reLaunch({
          url: '/pages/login/login',
        });
        reject(error);
      });
  });
}

/**
 * GET 请求
 */
export function get<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
  return request<T>({
    url,
    method: 'GET',
    data,
    ...options,
  });
}

/**
 * POST 请求
 */
export function post<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
  return request<T>({
    url,
    method: 'POST',
    data,
    ...options,
  });
}

/**
 * PUT 请求
 */
export function put<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
  return request<T>({
    url,
    method: 'PUT',
    data,
    ...options,
  });
}

/**
 * DELETE 请求
 */
export function del<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
  return request<T>({
    url,
    method: 'DELETE',
    data,
    ...options,
  });
}

