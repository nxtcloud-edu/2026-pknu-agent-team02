'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMoodStore } from '@/store/useMoodStore';
import { EMOTIONS } from '@/constants/emotions';
import { getTreeStage } from '@/constants/tree-stages';
import { AiDailyResult } from '@/store/types';

export default function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const entryId = searchParams.get('entryId');
  const { entries, updateEntryAiAnalysis, getActiveCycle } = useMoodStore();
  const [analysis, setAnalysis] = useState<AiDailyResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const entry = entries.find((e) => e.id === entryId);
  const activeCycle = getActiveCycle();

  useEffect(() => {
    if (!entry) return;

    // 이미 분석 결과가 있으면 그것을 사용
    if (entry.aiAnalysis) {
      setAnalysis(entry.aiAnalysis);
      setIsLoading(false);
      return;
    }

    // AI 분석 요청
    const analyze = async () => {
      try {
        const emotionLabel = EMOTIONS.find((e) => e.id === entry.emotion)?.label ?? entry.emotion;

        const res = await fetch('/api/analyze-daily', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moment: entry.moment,
            emotion: emotionLabel,
            emotionIntensity: entry.emotionIntensity,
            reason: entry.reason,
            insight: entry.insight,
          }),
        });

        if (res.ok) {
          const result: AiDailyResult = await res.json();
          setAnalysis(result);
          updateEntryAiAnalysis(entry.id, result);
        } else {
          const fallback = createFallback(entry);
          setAnalysis(fallback);
          updateEntryAiAnalysis(entry.id, fallback);
        }
      } catch {
        const fallback = createFallback(entry);
        setAnalysis(fallback);
        updateEntryAiAnalysis(entry.id, fallback);
      } finally {
        setIsLoading(false);
      }
    };

    analyze();
  }, [entry, updateEntryAiAnalysis]);

  if (!entry) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <p className="text-[#8B7355]">기록을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const emotionData = EMOTIONS.find((e) => e.id === entry.emotion);
  const currentDay = activeCycle?.currentDay ?? 0;
  const prevDay = Math.max(0, currentDay - 1);
  const stage = getTreeStage(currentDay);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center gap-4">
        <div className="text-6xl animate-pulse">🌿</div>
        <p className="text-[#8B7355]">AI가 오늘의 마음을 분석하고 있어요...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] px-5 py-8">
      <div className="max-w-[430px] mx-auto flex flex-col items-center gap-6">
        <h1 className="text-lg font-semibold text-[#4A3728]">오늘의 정원</h1>

        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl">{emotionData?.emoji}</span>
          <p className="text-xl font-semibold text-[#4A3728]">
            {analysis?.mainEmotion}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {analysis?.keywords.map((kw, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
            >
              #{kw}
            </span>
          ))}
        </div>

        <div className="w-full bg-white rounded-2xl p-5">
          <p className="text-xs text-[#B8A080] mb-2">AI 마음 거울</p>
          <p className="text-[#4A3728] leading-relaxed">
            {analysis?.dailyMessage}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 bg-green-50 rounded-2xl p-5 w-full">
          <span className="text-6xl">{stage.emoji}</span>
          <p className="text-green-700 font-medium">나무가 한 단계 자랐어요!</p>
          <p className="text-sm text-green-600">
            Day {prevDay} → Day {currentDay}
          </p>
        </div>

        <button
          onClick={() => router.push('/')}
          className="w-full py-4 bg-green-500 text-white rounded-2xl font-semibold text-lg"
        >
          홈으로
        </button>
      </div>
    </div>
  );
}

function createFallback(entry: { emotion: string; reason: string; insight: string }): AiDailyResult {
  const emotionLabel = EMOTIONS.find((e) => e.id === entry.emotion)?.label ?? entry.emotion;
  return {
    mainEmotion: emotionLabel,
    keywords: ['오늘', '기록'],
    reasonSummary: entry.reason.slice(0, 50),
    insightSummary: entry.insight.slice(0, 50),
    dailyMessage: '오늘도 마음을 돌아보는 시간을 가졌어요.',
  };
}
