// 房间状态管理
import { roomService } from '../services/room';
import type { Room } from '../types/api';

export class RoomStore {
  private currentRoom: Room | null = null;
  private roomList: Room[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.currentRoom = roomService.getCurrentRoom();
  }

  /**
   * 设置当前房间
   */
  setCurrentRoom(room: Room | null): void {
    this.currentRoom = room;
    roomService.setCurrentRoom(room);
    this.notifyListeners();
  }

  /**
   * 获取当前房间
   */
  getCurrentRoom(): Room | null {
    return this.currentRoom;
  }

  /**
   * 设置房间列表
   */
  setRoomList(rooms: Room[]): void {
    this.roomList = rooms;
    this.notifyListeners();
  }

  /**
   * 获取房间列表
   */
  getRoomList(): Room[] {
    return this.roomList;
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

