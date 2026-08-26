'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { useMoodStore } from '@/store/useMoodStore';
import { EMOTIONS } from '@/constants/emotions';
import { TREE_MAP } from '@/constants/trees';
import { DiaryEntry } from '@/store/types';
import { useHydration } from '@/store/useHydration';

function getStageImage(dayInCycle: number): string {
  if (dayInCycle <= 2) return '/trees/씨앗.png';
  if (dayInCycle <= 4) return '/trees/새싹.png';
  if (dayInCycle <= 6) return '/trees/묘목.png';
  return '/trees/묘목.png';
}

export default function DiaryPage() {
  const hydrated = useHydration();
  const { entries, cycles } = useMoodStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [selectedCycleId, setSelectedCycleId] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // 해당 월의 기록 필터링
  const monthEntries = entries.filter((e) => {
    const [y, m] = e.date.split('-').map(Number);
    return y === year && m === month;
  });

  // 각 entry의 사이클 내 일차 계산
  const entryDayMap = useMemo(() => {
    const map: Record<string, { dayInCycle: number; treeType: string | null }> = {};
    monthEntries.forEach((entry) => {
      const cycle = cycles.find((c) => c.id === entry.treeCycleId);
      // 같은 사이클의 모든 entry를 날짜순 정렬해서 인덱스 찾기
      const cycleEntries = entries
        .filter((e) => e.treeCycleId === entry.treeCycleId)
        .sort((a, b) => a.date.localeCompare(b.date));
      const idx = cycleEntries.findIndex((e) => e.id === entry.id);
      map[entry.date] = {
        dayInCycle: idx + 1,
        treeType: cycle?.harvested ? cycle.treeType : null,
      };
    });
    return map;
  }, [monthEntries, cycles, entries]);

  // 기록된 날짜 Set
  const recordedDates = new Set(monthEntries.map((e) => parseInt(e.date.split('-')[2])));

  // 달력 데이터 계산
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 2, 1));
    setSelectedCycleId(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month, 1));
    setSelectedCycleId(null);
  };

  if (!hydrated) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-4xl animate-pulse">📅</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-4">
        {/* 월 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="text-[#8B7355] text-lg px-2">
            ←
          </button>
          <h1 className="text-lg font-semibold text-[#4A3728]">
            {year}년 {month}월 · 일기
          </h1>
          <button onClick={nextMonth} className="text-[#8B7355] text-lg px-2">
            →
          </button>
        </div>

        {/* 달력 */}
        <div className="bg-white rounded-2xl p-4 mb-6">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div
                key={day}
                className="text-center text-xs text-[#B8A080] font-medium py-1"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} className="h-12" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const hasRecord = recordedDates.has(day);
              const isToday =
                day === new Date().getDate() &&
                month === new Date().getMonth() + 1 &&
                year === new Date().getFullYear();

              const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayInfo = entryDayMap[dateStr];

              // 이미지 결정
              let stageImage: string | null = null;
              if (dayInfo) {
                if (dayInfo.treeType) {
                  // 수확 완료된 사이클 → 나무 이미지
                  const tree = TREE_MAP[dayInfo.treeType];
                  stageImage = tree?.image ?? null;
                } else {
                  // 성장 중 → 단계 이미지
                  stageImage = getStageImage(dayInfo.dayInCycle);
                }
              }

              return (
                <button
                  key={day}
                  onClick={() => {
                    const dateStr2 = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const entry = monthEntries.find((e) => e.date === dateStr2);
                    if (entry) setSelectedCycleId(entry.treeCycleId);
                  }}
                  className={`h-12 flex flex-col items-center justify-between py-1 rounded-lg text-xs ${
                    isToday ? 'font-bold text-[#6E7F67]' : 'text-[#4A3728]'
                  } ${hasRecord ? 'cursor-pointer hover:bg-[#E6EDE3]' : 'cursor-default'}`}
                >
                  <span>{day}</span>
                  <div className="w-5 h-5 flex items-center justify-center">
                    {stageImage ? (
                      <Image
                        src={stageImage}
                        alt=""
                        width={18}
                        height={20}
                        className="object-contain"
                      />
                    ) : hasRecord ? (
                      <span className="w-1.5 h-1.5 bg-[#6E7F67] rounded-full" />
                    ) : (
                      <div />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 성장 기록 — 선택된 나무 또는 현재 나무의 기록 (해당 월만) */}
        {(() => {
          const targetCycleId = selectedCycleId || useMoodStore.getState().activeCycleId;
          const targetCycle = cycles.find((c) => c.id === targetCycleId);
          const cycleEntries = targetCycleId
            ? entries
                .filter((e) => e.treeCycleId === targetCycleId)
                .filter((e) => {
                  const [y, m] = e.date.split('-').map(Number);
                  return y === year && m === month;
                })
                .sort((a, b) => a.date.localeCompare(b.date))
            : [];

          return (
            <>
              <h2 className="text-sm font-semibold text-[#4A3728] mb-3">
                🌱 {targetCycle?.harvested ? '완성된' : '현재'} 나무 성장 기록 ({cycleEntries.length}/7)
              </h2>
              {cycleEntries.length === 0 ? (
                <p className="text-sm text-[#B8A080] text-center py-8">
                  아직 기록이 없어요. 홈에서 첫 기록을 시작해보세요!
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {cycleEntries.map((entry, idx) => {
                    const emotionData = EMOTIONS.find(
                      (e) => e.id === entry.emotion
                    );
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
                            Day {idx + 1} · {entry.date}
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
            </>
          );
        })()}
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
