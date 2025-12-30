// 游戏状态管理
import { gameService } from '../services/game';
import type { GameState } from '../types/api';
import type { Level, GameProgress } from '../types/game';

export class GameStore {
  private gameState: GameState | null = null;
  private currentLevel: Level | null = null;
  private progress: GameProgress | null = null;
  private listeners: Array<() => void> = [];

  constructor() {
    this.gameState = gameService.getCurrentGameState();
  }

  /**
   * 设置游戏状态
   */
  setGameState(state: GameState | null): void {
    this.gameState = state;
    gameService.setGameState(state);
    this.notifyListeners();
  }

  /**
   * 获取游戏状态
   */
  getGameState(): GameState | null {
    return this.gameState;
  }

  /**
   * 设置当前关卡
   */
  setCurrentLevel(level: Level | null): void {
    this.currentLevel = level;
    this.notifyListeners();
  }

  /**
   * 获取当前关卡
   */
  getCurrentLevel(): Level | null {
    return this.currentLevel;
  }

  /**
   * 设置游戏进度
   */
  setProgress(progress: GameProgress | null): void {
    this.progress = progress;
    this.notifyListeners();
  }

  /**
   * 获取游戏进度
   */
  getProgress(): GameProgress | null {
    return this.progress;
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

