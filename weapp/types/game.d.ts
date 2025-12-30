// 关卡类型
export interface Level {
  id: number;
  name: string;
  description: string;
  difficulty: Difficulty;
  puzzles: Puzzle[];
  story?: string;
  unlocked: boolean;
  completed: boolean;
  best_time?: number;
  stars: number;
}

export enum Difficulty {
  Easy = 1,
  Medium = 2,
  Hard = 3,
  Expert = 4,
}

// 谜题类型
export interface Puzzle {
  id: string;
  type: PuzzleType;
  title: string;
  description: string;
  data: PuzzleData;
  solution: any;
  hints: string[];
  solved: boolean;
  progress: number;
}

export enum PuzzleType {
  Jigsaw = 'jigsaw',
  Logic = 'logic',
  Password = 'password',
  Collaboration = 'collaboration',
  Sequence = 'sequence',
  Pattern = 'pattern',
}

export interface PuzzleData {
  [key: string]: any;
}

// 拼图谜题数据
export interface JigsawPuzzleData extends PuzzleData {
  image: string;
  pieces: number;
  grid: { rows: number; cols: number };
}

// 逻辑推理谜题数据
export interface LogicPuzzleData extends PuzzleData {
  rules: string[];
  clues: string[];
  variables: string[];
}

// 密码破解谜题数据
export interface PasswordPuzzleData extends PuzzleData {
  hints: string[];
  length: number;
  attempts: number;
}

// 协作机关谜题数据
export interface CollaborationPuzzleData extends PuzzleData {
  player1_task: string;
  player2_task: string;
  sync_points: number[];
}

// 游戏进度
export interface GameProgress {
  level_id: number;
  current_puzzle: number;
  puzzles_completed: number[];
  time_spent: number;
  hints_used: number;
  score: number;
}

// 成就类型
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlocked_at?: string;
  progress: number;
  target: number;
}

export enum AchievementType {
  FirstWin = 'first_win',
  SpeedRun = 'speed_run',
  PerfectScore = 'perfect_score',
  NoHints = 'no_hints',
  Collaboration = 'collaboration',
  LevelMaster = 'level_master',
}

