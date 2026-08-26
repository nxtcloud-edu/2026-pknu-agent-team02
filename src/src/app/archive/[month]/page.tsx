'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMoodStore } from '@/store/useMoodStore';
import { useHydration } from '@/store/useHydration';
import { EMOTIONS } from '@/constants/emotions';
import { DiaryEntry } from '@/store/types';

export default function ArchiveMonthPage() {
  const hydrated = useHydration();
  const router = useRouter();
  const { month } = useParams<{ month: string }>(); // "2026-08" 형태
  const { entries } = useMoodStore();
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  const [year, mon] = (month || '').split('-');

  // 해당 월 기록 필터링
  const monthEntries = entries
    .filter((e) => {
      const [y, m] = e.date.split('-');
      return y === year && m === mon;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#FBF9F4] flex items-center justify-center">
        <div className="text-4xl animate-pulse">📋</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] px-5 py-6">
      <div className="max-w-[430px] mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/archive')}
            className="text-[#8B7355] text-lg"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold text-[#4A3728]">
            {parseInt(year)}년 {parseInt(mon)}월
          </h1>
          <div className="w-6" />
        </div>

        <p className="text-sm text-[#8B7355] mb-3">
          {monthEntries.length}건의 기록
        </p>

        {monthEntries.length === 0 ? (
          <p className="text-sm text-[#B8A080] text-center py-8">
            이 달에는 기록이 없어요.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {monthEntries.map((entry) => {
              const emotionData = EMOTIONS.find((e) => e.id === entry.emotion);
              return (
                <button
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className="bg-white rounded-xl p-4 flex items-center gap-3 w-full text-left hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl">
                    {emotionData?.emoji ?? '😐'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#4A3728]">
                      {entry.date}
                    </p>
                    <p className="text-xs text-[#8B7355] truncate">
                      {entry.moment}
                    </p>
                  </div>
                  <span className="text-[#B8A080] text-sm">›</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 상세 모달 */}
      {selectedEntry && (
        <EntryDetailModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </div>
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
