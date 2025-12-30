// WebSocket 服务
import { API_CONFIG } from '../config/api';
import { GAME_CONSTANTS } from '../utils/constants';
import { getStorage } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';
import type { WSMessage, WSMessageType } from '../types/api';

export type WSMessageHandler = (message: WSMessage) => void;

export class WebSocketService {
  private socket: WechatMiniprogram.SocketTask | null = null;
  private url: string = '';
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = GAME_CONSTANTS.MAX_RECONNECT_ATTEMPTS;
  private reconnectTimer: number | null = null;
  private heartbeatTimer: number | null = null;
  private messageHandlers: Map<WSMessageType, WSMessageHandler[]> = new Map();
  private isConnecting: boolean = false;
  private isConnected: boolean = false;

  /**
   * 连接 WebSocket
   */
  connect(userId: number, roomId?: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnecting || this.isConnected) {
        resolve();
        return;
      }

      this.isConnecting = true;
      const token = getStorage<string>(STORAGE_KEYS.TOKEN);
      
      // 构建 WebSocket URL
      let wsUrl = API_CONFIG.wsURL;
      if (wsUrl.includes('ws://') || wsUrl.includes('wss://')) {
        // URL 已包含协议
      } else {
        // 根据 baseURL 判断协议
        const protocol = API_CONFIG.baseURL.startsWith('https') ? 'wss' : 'ws';
        const host = API_CONFIG.baseURL.replace(/^https?:\/\//, '');
        wsUrl = `${protocol}://${host}/ws`;
      }

      // 添加查询参数
      const params = new URLSearchParams();
      params.append('user_id', userId.toString());
      if (token) {
        params.append('token', token);
      }
      if (roomId) {
        params.append('room_id', roomId.toString());
      }
      this.url = `${wsUrl}?${params.toString()}`;

      this.socket = wx.connectSocket({
        url: this.url,
        header: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        success: () => {
          console.log('WebSocket 连接成功');
        },
        fail: (error) => {
          this.isConnecting = false;
          reject(error);
        },
      });

      this.socket.onOpen(() => {
        console.log('WebSocket 已连接');
        this.isConnecting = false;
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.startHeartbeat();
        resolve();
      });

      this.socket.onError((error) => {
        console.error('WebSocket 错误:', error);
        this.isConnecting = false;
        this.isConnected = false;
        this.stopHeartbeat();
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.scheduleReconnect(userId, roomId);
        }
        reject(error);
      });

      this.socket.onClose(() => {
        console.log('WebSocket 已关闭');
        this.isConnecting = false;
        this.isConnected = false;
        this.stopHeartbeat();
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.scheduleReconnect(userId, roomId);
        }
      });

      this.socket.onMessage((res) => {
        try {
          const message: WSMessage = JSON.parse(res.data as string);
          this.handleMessage(message);
        } catch (error) {
          console.error('解析 WebSocket 消息失败:', error);
        }
      });
    });
  }

  /**
   * 断开连接
   */
  disconnect(): void {
    this.stopHeartbeat();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer as any);
      this.reconnectTimer = null;
    }
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.isConnected = false;
    this.reconnectAttempts = 0;
  }

  /**
   * 发送消息
   */
  send(type: WSMessageType, data: any): void {
    if (!this.isConnected || !this.socket) {
      console.warn('WebSocket 未连接，无法发送消息');
      return;
    }

    const message: WSMessage = {
      type,
      data,
      timestamp: Date.now(),
    };

    this.socket.send({
      data: JSON.stringify(message),
      success: () => {
        console.log('消息发送成功:', type);
      },
      fail: (error) => {
        console.error('消息发送失败:', error);
      },
    });
  }

  /**
   * 注册消息处理器
   */
  on(type: WSMessageType, handler: WSMessageHandler): void {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, []);
    }
    this.messageHandlers.get(type)!.push(handler);
  }

  /**
   * 取消注册消息处理器
   */
  off(type: WSMessageType, handler?: WSMessageHandler): void {
    if (!handler) {
      this.messageHandlers.delete(type);
    } else {
      const handlers = this.messageHandlers.get(type);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    }
  }

  /**
   * 处理消息
   */
  private handleMessage(message: WSMessage): void {
    const handlers = this.messageHandlers.get(message.type);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(message);
        } catch (error) {
          console.error('消息处理器执行失败:', error);
        }
      });
    }
  }

  /**
   * 启动心跳
   */
  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      if (this.isConnected) {
        this.send(WSMessageType.Heartbeat, {});
      }
    }, GAME_CONSTANTS.HEARTBEAT_INTERVAL) as unknown as number;
  }

  /**
   * 停止心跳
   */
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer as any);
      this.heartbeatTimer = null;
    }
  }

  /**
   * 安排重连
   */
  private scheduleReconnect(userId: number, roomId?: number): void {
    if (this.reconnectTimer) {
      return;
    }

    this.reconnectAttempts++;
    const delay = GAME_CONSTANTS.RECONNECT_DELAY * this.reconnectAttempts;

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      console.log(`尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      this.connect(userId, roomId).catch((error) => {
        console.error('重连失败:', error);
      });
    }, delay) as unknown as number;
  }

  /**
   * 检查连接状态
   */
  isWSConnected(): boolean {
    return this.isConnected;
  }
}

// 导出单例
export const wsService = new WebSocketService();

