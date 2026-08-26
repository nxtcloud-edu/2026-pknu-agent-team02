'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { useMoodStore } from '@/store/useMoodStore';
import { TREE_MAP } from '@/constants/trees';
import { EMOTIONS } from '@/constants/emotions';
import { DiaryEntry } from '@/store/types';
import { useHydration } from '@/store/useHydration';

export default function CycleDetailPage() {
  const hydrated = useHydration();
  const router = useRouter();
  const { treeType, cycleId } = useParams<{ treeType: string; cycleId: string }>();
  const { cycles, getEntriesForCycle } = useMoodStore();
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  const tree = TREE_MAP[treeType];
  const cycle = cycles.find((c) => c.id === cycleId);
  const entries = getEntriesForCycle(cycleId).sort((a, b) => a.date.localeCompare(b.date));

  if (!hydrated) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-4xl animate-pulse">🌳</div>
        </div>
      </Layout>
    );
  }

  if (!tree || !cycle) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-[#8B7355]">기록을 찾을 수 없습니다.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-4">
        {/* 뒤로가기 */}
        <button
          onClick={() => router.push(`/collection/${treeType}`)}
          className="text-sm text-[#8B7355] mb-4"
        >
          ← {tree.name} 목록
        </button>

        {/* 나무 정보 */}
        <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 mb-6">
          <Image src={tree.image} alt={tree.name} width={80} height={80} className="object-contain" />
          <h1 className="text-lg font-bold text-[#4A3728]">{tree.name}</h1>
          <p className="text-xs text-[#B8A080]">수확일: {cycle.startDate}</p>
        </div>

        {/* 주간 감정 총평 */}
        {cycle.aiWeeklyResult && (
          <div className="bg-[#E6EDE3] rounded-2xl p-5 mb-6">
            <h2 className="text-sm font-semibold text-[#6E7F67] mb-2">
              주간 감정 총평
            </h2>
            <p className="text-[#4A3728] text-sm leading-relaxed">
              {cycle.aiWeeklyResult.weeklySummary}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {cycle.aiWeeklyResult.weeklyKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-[#E6EDE3] text-[#6E7F67] rounded-full text-xs"
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
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className="bg-white rounded-xl p-4 flex items-center gap-3 w-full text-left hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{emotionData?.emoji ?? '😐'}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#4A3728]">
                    Day {i + 1} · {entry.date}
                  </p>
                  <p className="text-xs text-[#8B7355]">
                    {emotionData?.label} · 강도 {entry.emotionIntensity}
                  </p>
                </div>
                <span className="text-[#B8A080] text-sm">›</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 상세 모달 */}
      {selectedEntry && (
        <EntryDetailModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </Layout>
  );
}

function EntryDetailModal({
  entry,
  onClose,
}: {
  entry: DiaryEntry;
  onClose: () => void;
}) {
  const emotionData = EMOTIONS.find((e) => e.id === entry.emotion);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
      <div className="bg-[#FBF9F4] rounded-t-3xl w-full max-w-[430px] max-h-[85vh] overflow-y-auto p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#4A3728]">
            {entry.date}의 기록
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-[#8B7355] hover:text-[#4A3728]"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-4xl">{emotionData?.emoji ?? '😐'}</span>
          <div>
            <p className="font-semibold text-[#4A3728]">
              {emotionData?.label ?? entry.emotion}
            </p>
            <p className="text-sm text-[#8B7355]">
              강도 {entry.emotionIntensity}/5
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-[#B8A080] mb-1">Moment</p>
          <p className="text-sm text-[#4A3728] bg-white rounded-xl p-3">
            {entry.moment}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-[#B8A080] mb-1">Reason</p>
          <p className="text-sm text-[#4A3728] bg-white rounded-xl p-3">
            {entry.reason}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-[#B8A080] mb-1">Insight</p>
          <p className="text-sm text-[#4A3728] bg-white rounded-xl p-3">
            {entry.insight}
          </p>
        </div>

        {entry.aiAnalysis && (
          <div className="bg-[#E6EDE3] rounded-2xl p-4 mb-4">
            <p className="text-xs font-medium text-[#6E7F67] mb-2">
              AI 분석 결과
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {entry.aiAnalysis.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-[#E6EDE3] text-[#6E7F67] rounded-full text-xs"
                >
                  #{kw}
                </span>
              ))}
            </div>
            <p className="text-sm text-[#4A3728]">
              {entry.aiAnalysis.dailyMessage}
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#6E7F67] text-white rounded-2xl font-semibold mt-2"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
