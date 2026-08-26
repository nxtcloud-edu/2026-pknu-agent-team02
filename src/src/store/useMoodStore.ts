import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { DiaryEntry, TreeCycle, TreeCollection, AiDailyResult, AiWeeklyResult } from './types';
import { EmotionId } from '@/constants/emotions';
import { TREES } from '@/constants/trees';

interface MoodState {
  entries: DiaryEntry[];
  cycles: TreeCycle[];
  collection: TreeCollection[];
  activeCycleId: string | null;
  dayOffset: number; // 개발 모드용: 날짜 오프셋

  // Computed
  getActiveCycle: () => TreeCycle | null;
  getTodayEntry: () => DiaryEntry | null;
  getEntriesForCycle: (cycleId: string) => DiaryEntry[];
  getEntriesForMonth: (year: number, month: number) => DiaryEntry[];

  // Actions
  startNewCycle: () => void;
  addEntry: (data: {
    moment: string;
    emotion: EmotionId;
    emotionIntensity: number;
    reason: string;
    insight: string;
  }) => DiaryEntry;
  updateEntryAiAnalysis: (entryId: string, analysis: AiDailyResult) => void;
  completeCycle: (aiResult: AiWeeklyResult) => void;
  harvestTree: () => void;

  // Dev tools
  advanceDay: () => void;
  generateTestData: () => void;
  unlockAllTrees: () => void;
  resetAll: () => void;
}

function getToday(offset: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
}

function initializeCollection(): TreeCollection[] {
  return TREES.map((tree) => ({
    treeType: tree.id,
    unlocked: false,
    unlockedAt: null,
    count: 0,
    cycleIds: [],
  }));
}

export const useMoodStore = create<MoodState>()(
  persist(
    (set, get) => ({
      entries: [],
      cycles: [],
      collection: initializeCollection(),
      activeCycleId: null,
      dayOffset: 0,

      getActiveCycle: () => {
        const { cycles, activeCycleId } = get();
        if (!activeCycleId) return null;
        return cycles.find((c) => c.id === activeCycleId) || null;
      },

      getTodayEntry: () => {
        const { entries, dayOffset } = get();
        const today = getToday(dayOffset);
        return entries.find((e) => e.date === today) || null;
      },

      getEntriesForCycle: (cycleId: string) => {
        return get().entries.filter((e) => e.treeCycleId === cycleId);
      },

      getEntriesForMonth: (year: number, month: number) => {
        return get().entries.filter((e) => {
          const [y, m] = e.date.split('-').map(Number);
          return y === year && m === month;
        });
      },

      startNewCycle: () => {
        const newCycle: TreeCycle = {
          id: uuidv4(),
          startDate: getToday(get().dayOffset),
          currentDay: 0,
          completed: false,
          harvested: false,
          treeType: null,
          aiWeeklyResult: null,
        };
        set((state) => ({
          cycles: [...state.cycles, newCycle],
          activeCycleId: newCycle.id,
        }));
      },

      addEntry: (data) => {
        const state = get();
        let activeCycle = state.getActiveCycle();

        // 사이클이 없으면 자동 생성
        if (!activeCycle) {
          state.startNewCycle();
          activeCycle = get().getActiveCycle()!;
        }

        const newEntry: DiaryEntry = {
          id: uuidv4(),
          date: getToday(get().dayOffset),
          moment: data.moment,
          emotion: data.emotion,
          emotionIntensity: data.emotionIntensity,
          reason: data.reason,
          insight: data.insight,
          aiAnalysis: null,
          treeCycleId: activeCycle.id,
        };

        const newDay = Math.min(activeCycle.currentDay + 1, 7);

        set((state) => ({
          entries: [...state.entries, newEntry],
          cycles: state.cycles.map((c) =>
            c.id === activeCycle!.id
              ? { ...c, currentDay: newDay, completed: newDay >= 7 }
              : c
          ),
        }));

        return newEntry;
      },

      updateEntryAiAnalysis: (entryId: string, analysis: AiDailyResult) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === entryId ? { ...e, aiAnalysis: analysis } : e
          ),
        }));
      },

      completeCycle: (aiResult: AiWeeklyResult) => {
        const { activeCycleId } = get();
        if (!activeCycleId) return;

        set((state) => ({
          cycles: state.cycles.map((c) =>
            c.id === activeCycleId
              ? {
                  ...c,
                  completed: true,
                  treeType: aiResult.treeType,
                  aiWeeklyResult: aiResult,
                }
              : c
          ),
        }));
      },

      harvestTree: () => {
        const { activeCycleId, cycles } = get();
        if (!activeCycleId) return;

        const cycle = cycles.find((c) => c.id === activeCycleId);
        if (!cycle || !cycle.treeType) return;

        set((state) => ({
          cycles: state.cycles.map((c) =>
            c.id === activeCycleId ? { ...c, harvested: true } : c
          ),
          collection: state.collection.map((col) =>
            col.treeType === cycle.treeType
              ? {
                  ...col,
                  unlocked: true,
                  unlockedAt: col.unlockedAt || getToday(get().dayOffset),
                  count: col.count + 1,
                  cycleIds: [...col.cycleIds, activeCycleId],
                }
              : col
          ),
          // activeCycleId 유지 — 오늘은 수확한 나무를 계속 보여줌
        }));
      },

      // Dev tools
      advanceDay: () => {
        set((state) => ({ dayOffset: state.dayOffset + 1 }));
      },

      generateTestData: () => {
        const state = get();
        let activeCycle = state.getActiveCycle();
        if (!activeCycle) {
          state.startNewCycle();
          activeCycle = get().getActiveCycle()!;
        }

        const emotions: EmotionId[] = ['joy', 'calm', 'proud', 'sad', 'anxious', 'angry', 'regret', 'neutral'];
        const testEntries: DiaryEntry[] = [];

        for (let i = 0; i < 6; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          testEntries.push({
            id: uuidv4(),
            date: date.toISOString().split('T')[0],
            moment: `테스트 기록 Day ${i + 1}`,
            emotion: emotions[i % emotions.length],
            emotionIntensity: Math.floor(Math.random() * 5) + 1,
            reason: `테스트 이유 Day ${i + 1}`,
            insight: `테스트 인사이트 Day ${i + 1}`,
            aiAnalysis: {
              mainEmotion: emotions[i % emotions.length],
              keywords: ['테스트', '키워드'],
              reasonSummary: '테스트 이유 요약',
              insightSummary: '테스트 인사이트 요약',
              dailyMessage: '테스트 메시지입니다.',
            },
            treeCycleId: activeCycle.id,
          });
        }

        set((state) => ({
          entries: [...state.entries, ...testEntries],
          cycles: state.cycles.map((c) =>
            c.id === activeCycle!.id ? { ...c, currentDay: 6 } : c
          ),
        }));
      },

      unlockAllTrees: () => {
        const today = getToday(get().dayOffset);
        set((state) => ({
          collection: state.collection.map((col) => ({
            ...col,
            unlocked: true,
            unlockedAt: col.unlockedAt || today,
            count: col.count || 1,
          })),
        }));
      },

      resetAll: () => {
        set({
          entries: [],
          cycles: [],
          collection: initializeCollection(),
          activeCycleId: null,
          dayOffset: 0,
        });
      },
    }),
    {
      name: 'moodtree_storage',
    }
  )
);
