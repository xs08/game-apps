// 房间服务
import { gameApi } from './api';
import type { Room, CreateRoomRequest, JoinRoomRequest } from '../types/api';

export class RoomService {
  private currentRoom: Room | null = null;

  /**
   * 创建房间
   */
  async createRoom(data?: CreateRoomRequest): Promise<Room> {
    const room = await gameApi.createRoom({
      max_players: 2,
      game_type: 'puzzle',
      ...data,
    });
    this.currentRoom = room;
    return room;
  }

  /**
   * 加入房间
   */
  async joinRoom(roomCode: string): Promise<Room> {
    const room = await gameApi.joinRoom({ room_code: roomCode });
    this.currentRoom = room;
    return room;
  }

  /**
   * 离开房间
   */
  async leaveRoom(roomId: number): Promise<void> {
    await gameApi.leaveRoom(roomId);
    if (this.currentRoom?.id === roomId) {
      this.currentRoom = null;
    }
  }

  /**
   * 获取房间信息
   */
  async getRoom(roomId: number): Promise<Room> {
    const room = await gameApi.getRoom(roomId);
    if (room.id === this.currentRoom?.id) {
      this.currentRoom = room;
    }
    return room;
  }

  /**
   * 获取房间列表
   */
  async listRooms(params?: {
    status?: number;
    limit?: number;
    offset?: number;
  }): Promise<Room[]> {
    return gameApi.listRooms(params);
  }

  /**
   * 开始游戏
   */
  async startGame(roomId: number): Promise<void> {
    await gameApi.startGame(roomId);
    // 更新房间状态
    if (this.currentRoom?.id === roomId) {
      const room = await this.getRoom(roomId);
      this.currentRoom = room;
    }
  }

  /**
   * 获取当前房间
   */
  getCurrentRoom(): Room | null {
    return this.currentRoom;
  }

  /**
   * 设置当前房间
   */
  setCurrentRoom(room: Room | null): void {
    this.currentRoom = room;
  }
}

// 导出单例
export const roomService = new RoomService();

