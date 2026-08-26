'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useMoodStore } from '@/store/useMoodStore';
import { EMOTIONS } from '@/constants/emotions';
import { DiaryEntry } from '@/store/types';

export default function DiaryPage() {
  const { entries } = useMoodStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // 해당 월의 기록 필터링
  const monthEntries = entries.filter((e) => {
    const [y, m] = e.date.split('-').map(Number);
    return y === year && m === month;
  });

  // 기록된 날짜 Set
  const recordedDates = new Set(monthEntries.map((e) => parseInt(e.date.split('-')[2])));

  // 달력 데이터 계산
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 2, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month, 1));
  };

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
              <div key={`empty-${i}`} className="h-9" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const hasRecord = recordedDates.has(day);
              const isToday =
                day === new Date().getDate() &&
                month === new Date().getMonth() + 1 &&
                year === new Date().getFullYear();

              return (
                <div
                  key={day}
                  className={`h-9 flex items-center justify-center rounded-full text-sm relative ${
                    isToday ? 'font-bold text-green-600' : 'text-[#4A3728]'
                  }`}
                >
                  {day}
                  {hasRecord && (
                    <span className="absolute bottom-0.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 일기 리스트 */}
        <h2 className="text-sm font-semibold text-[#4A3728] mb-3">
          이번 달 기록 ({monthEntries.length}건)
        </h2>
        {monthEntries.length === 0 ? (
          <p className="text-sm text-[#B8A080] text-center py-8">
            이번 달에는 아직 기록이 없어요.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {monthEntries
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((entry) => {
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
      <div className="bg-[#FFF8F0] rounded-t-3xl w-full max-w-[430px] max-h-[85vh] overflow-y-auto p-6 animate-slide-up">
        {/* 헤더 */}
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

        {/* 감정 */}
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

        {/* Moment */}
        <div className="mb-4">
          <p className="text-xs font-medium text-[#B8A080] mb-1">Moment</p>
          <p className="text-sm text-[#4A3728] bg-white rounded-xl p-3">
            {entry.moment}
          </p>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <p className="text-xs font-medium text-[#B8A080] mb-1">Reason</p>
          <p className="text-sm text-[#4A3728] bg-white rounded-xl p-3">
            {entry.reason}
          </p>
        </div>

        {/* Insight */}
        <div className="mb-4">
          <p className="text-xs font-medium text-[#B8A080] mb-1">Insight</p>
          <p className="text-sm text-[#4A3728] bg-white rounded-xl p-3">
            {entry.insight}
          </p>
        </div>

        {/* AI 분석 결과 */}
        {entry.aiAnalysis && (
          <div className="bg-green-50 rounded-2xl p-4 mb-4">
            <p className="text-xs font-medium text-green-700 mb-2">
              AI 분석 결과
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {entry.aiAnalysis.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs"
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

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-green-500 text-white rounded-2xl font-semibold mt-2"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
