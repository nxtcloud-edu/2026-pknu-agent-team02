'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMoodStore } from '@/store/useMoodStore';
import { TREE_MAP } from '@/constants/trees';
import { AiWeeklyResult } from '@/store/types';

export default function CompleteContent() {
  const router = useRouter();
  const { getActiveCycle, getEntriesForCycle, completeCycle, harvestTree } =
    useMoodStore();
  const [weeklyResult, setWeeklyResult] = useState<AiWeeklyResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [harvested, setHarvested] = useState(false);
  const analyzedRef = useRef(false);

  const activeCycle = getActiveCycle();

  useEffect(() => {
    // 수확 완료 후엔 리다이렉트하지 않음
    if (harvested) return;

    // 사이클이 없거나 미완료면 홈으로
    if (!activeCycle || !activeCycle.completed) {
      router.push('/');
      return;
    }

    // 이미 주간 분석 결과가 있으면 사용
    if (activeCycle.aiWeeklyResult) {
      setWeeklyResult(activeCycle.aiWeeklyResult);
      setIsLoading(false);
      return;
    }

    // 중복 호출 방지
    if (analyzedRef.current) return;
    analyzedRef.current = true;

    const analyze = async () => {
      try {
        const entries = getEntriesForCycle(activeCycle.id);

        const res = await fetch('/api/analyze-weekly', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entries }),
        });

        if (res.ok) {
          const result: AiWeeklyResult = await res.json();
          setWeeklyResult(result);
          completeCycle(result);
        } else {
          const fallback = createFallback();
          setWeeklyResult(fallback);
          completeCycle(fallback);
        }
      } catch {
        const fallback = createFallback();
        setWeeklyResult(fallback);
        completeCycle(fallback);
      } finally {
        setIsLoading(false);
      }
    };

    analyze();
  }, [activeCycle, completeCycle, getEntriesForCycle, router, harvested]);

  const handleHarvest = () => {
    harvestTree();
    setHarvested(true);
    // 수확 후 도감으로 이동
    setTimeout(() => {
      router.push('/collection');
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center gap-4">
        <div className="text-6xl animate-pulse">🌳</div>
        <p className="text-[#8B7355]">AI가 한 주의 마음을 분석하고 있어요...</p>
      </div>
    );
  }

  if (!weeklyResult) return null;

  const tree = TREE_MAP[weeklyResult.treeType];

  return (
    <div className="min-h-screen bg-[#FFF8F0] px-5 py-8">
      <div className="max-w-[430px] mx-auto flex flex-col items-center gap-6">
        <p className="text-sm font-medium text-green-600 tracking-wide">
          7 DAYS JOURNAL COMPLETED
        </p>

        <h1 className="text-xl font-bold text-[#4A3728] text-center">
          🎉 마음나무가 모두 자랐어요!
        </h1>

        <p className="text-[#8B7355] text-center">이번 주 당신의 나무는</p>

        {/* 나무 공개 */}
        <div className="flex flex-col items-center gap-3 bg-white rounded-2xl p-8 w-full shadow-sm">
          <span className="text-7xl">{tree?.emoji ?? '🌳'}</span>
          <h2 className="text-2xl font-bold text-[#4A3728]">
            {tree?.name ?? weeklyResult.treeType}
          </h2>
          <p className="text-sm text-[#8B7355]">{tree?.nameEn}</p>
        </div>

        {/* 주간 메시지 */}
        <div className="w-full bg-white rounded-2xl p-5">
          <p className="text-[#4A3728] leading-relaxed text-center">
            {weeklyResult.weeklySummary}
          </p>
        </div>

        {/* 주간 키워드 */}
        <div className="flex flex-wrap gap-2 justify-center">
          {weeklyResult.weeklyKeywords.map((kw, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
            >
              #{kw}
            </span>
          ))}
        </div>

        {/* 수확 버튼 */}
        {!harvested ? (
          <button
            onClick={handleHarvest}
            className="w-full py-4 bg-green-500 text-white rounded-2xl font-semibold text-lg hover:bg-green-600 transition-colors"
          >
            🌳 나무 수확하기
          </button>
        ) : (
          <div className="w-full py-4 bg-green-100 text-green-700 rounded-2xl font-medium text-center">
            도감에 등록되었어요! 🎉
          </div>
        )}
      </div>
    </div>
  );
}

function createFallback(): AiWeeklyResult {
  return {
    treeType: 'PINE',
    weeklyKeywords: ['성장', '기록', '마음'],
    weeklySummary: '한 주 동안 꾸준히 마음을 돌아보며 성장한 한 주였습니다.',
    treeMessage: '이번 주 당신의 마음은 소나무로 자랐어요.',
  };
}
