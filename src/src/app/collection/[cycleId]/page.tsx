'use client';

import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { useMoodStore } from '@/store/useMoodStore';
import { TREE_MAP } from '@/constants/trees';
import { EMOTIONS } from '@/constants/emotions';

export default function CollectionDetailPage() {
  const { cycleId } = useParams<{ cycleId: string }>();
  const router = useRouter();
  const { cycles, getEntriesForCycle } = useMoodStore();

  const cycle = cycles.find((c) => c.id === cycleId);
  const entries = getEntriesForCycle(cycleId);

  if (!cycle || !cycle.treeType) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-[#8B7355]">나무를 찾을 수 없습니다.</p>
        </div>
      </Layout>
    );
  }

  const tree = TREE_MAP[cycle.treeType];

  return (
    <Layout>
      <div className="py-4">
        {/* 뒤로가기 */}
        <button
          onClick={() => router.push('/collection')}
          className="text-sm text-[#8B7355] mb-4"
        >
          ← 도감으로
        </button>

        {/* 나무 정보 */}
        <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 mb-6">
          <span className="text-6xl">{tree?.emoji ?? '🌳'}</span>
          <h1 className="text-xl font-bold text-[#4A3728]">{tree?.name}</h1>
          <p className="text-sm text-[#8B7355]">{tree?.nameEn}</p>
          <p className="text-xs text-[#B8A080]">수확일: {cycle.startDate}</p>
        </div>

        {/* 주간 감정 총평 */}
        {cycle.aiWeeklyResult && (
          <div className="bg-green-50 rounded-2xl p-5 mb-6">
            <h2 className="text-sm font-semibold text-green-700 mb-2">
              주간 감정 총평
            </h2>
            <p className="text-[#4A3728] text-sm leading-relaxed">
              {cycle.aiWeeklyResult.weeklySummary}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {cycle.aiWeeklyResult.weeklyKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 7일간의 감정 기록 */}
        <h2 className="text-sm font-semibold text-[#4A3728] mb-3">
          7일간의 감정 기록
        </h2>
        <div className="flex flex-col gap-3">
          {entries.map((entry, i) => {
            const emotionData = EMOTIONS.find((e) => e.id === entry.emotion);
            return (
              <div
                key={entry.id}
                className="bg-white rounded-xl p-4 flex items-center gap-3"
              >
                <span className="text-2xl">{emotionData?.emoji ?? '😐'}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#4A3728]">
                    Day {i + 1} · {entry.date}
                  </p>
                  <p className="text-xs text-[#8B7355]">
                    {emotionData?.label} · 강도 {entry.emotionIntensity}
                  </p>
                  {entry.aiAnalysis && (
                    <p className="text-xs text-[#B8A080] mt-1">
                      {entry.aiAnalysis.dailyMessage}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
