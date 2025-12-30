// 游戏服务
import { gameApi } from './api';
import type { GameState } from '../types/api';

export class GameService {
  private gameState: GameState | null = null;

  /**
   * 获取游戏状态
   */
  async getGameState(roomId: number): Promise<GameState> {
    const state = await gameApi.getGameState(roomId);
    this.gameState = state;
    return state;
  }

  /**
   * 获取当前游戏状态
   */
  getCurrentGameState(): GameState | null {
    return this.gameState;
  }

  /**
   * 设置游戏状态
   */
  setGameState(state: GameState | null): void {
    this.gameState = state;
  }

  /**
   * 清除游戏状态
   */
  clearGameState(): void {
    this.gameState = null;
  }
}

// 导出单例
export const gameService = new GameService();

