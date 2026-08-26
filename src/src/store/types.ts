import { EmotionId } from '@/constants/emotions';

export interface AiDailyResult {
  mainEmotion: string;
  keywords: string[];
  reasonSummary: string;
  insightSummary: string;
  dailyMessage: string;
}

export interface AiWeeklyResult {
  treeType: string;
  weeklyKeywords: string[];
  weeklySummary: string;
  treeMessage: string;
}

export interface DiaryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  moment: string;
  emotion: EmotionId;
  emotionIntensity: number;
  reason: string;
  insight: string;
  aiAnalysis: AiDailyResult | null;
  treeCycleId: string;
}

export interface TreeCycle {
  id: string;
  startDate: string;
  currentDay: number;
  completed: boolean;
  harvested: boolean;
  treeType: string | null;
  aiWeeklyResult: AiWeeklyResult | null;
}

export interface TreeCollection {
  treeType: string;
  unlocked: boolean;
  unlockedAt: string | null;
  count: number;
  cycleIds: string[];
}
