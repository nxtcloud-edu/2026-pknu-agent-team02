'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useMoodStore } from '@/store/useMoodStore';
import { EMOTIONS } from '@/constants/emotions';
import { DiaryEntry } from '@/store/types';
import { useHydration } from '@/store/useHydration';

interface MonthlyAnalysis {
  monthlySummary: string;
  dominantEmotion: string;
  emotionDistribution: { emotion: string; count: number; percentage: number }[];
  monthlyKeywords: string[];
  advice: string;
}

export default function AnalysisPage() {
  const hydrated = useHydration();
  const { entries } = useMoodStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [analysis, setAnalysis] = useState<MonthlyAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // 해당 월 기록 필터링
  const monthEntries = entries.filter((e) => {
    const [y, m] = e.date.split('-').map(Number);
    return y === year && m === month;
  });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 2, 1));
    setAnalysis(null);
    setSelectedEmotion(null);
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month, 1));
    setAnalysis(null);
    setSelectedEmotion(null);
  };

  // 월간 분석 요청
  const fetchAnalysis = async () => {
    if (monthEntries.length === 0) return;
    setIsLoading(true);
    try {
      const emotionLabels = monthEntries.map((e) => ({
        ...e,
        emotion: EMOTIONS.find((em) => em.id === e.emotion)?.label ?? e.emotion,
      }));

      const res = await fetch('/api/analyze-monthly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries: emotionLabels, year, month }),
      });

      if (res.ok) {
        const result = await res.json();
        setAnalysis(result);
      }
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hydrated && monthEntries.length > 0 && !analysis) {
      fetchAnalysis();
    }
  }, [hydrated, year, month]);

  // 감정별 일기 필터
  const filteredEntries = selectedEmotion
    ? monthEntries.filter((e) => {
        const label = EMOTIONS.find((em) => em.id === e.emotion)?.label;
        return label === selectedEmotion;
      })
    : [];

  if (!hydrated) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-4xl animate-pulse">📊</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-4">
        {/* 월 선택 */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="text-[#8B7355] text-lg px-2">←</button>
          <h1 className="text-lg font-semibold text-[#4A3728]">
            {year}년 {month}월 분석
          </h1>
          <button onClick={nextMonth} className="text-[#8B7355] text-lg px-2">→</button>
        </div>

        {monthEntries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#9E9087]">이번 달에는 아직 기록이 없어요.</p>
            <p className="text-xs text-[#9E9087] mt-2">기록을 시작하면 AI가 분석해드려요!</p>
          </div>
        ) : (
          <>
            {/* AI 월간 요약 */}
            {isLoading ? (
              <div className="bg-white rounded-2xl p-6 mb-6 flex flex-col items-center gap-3">
                <div className="text-3xl animate-pulse">🔍</div>
                <p className="text-sm text-[#9E9087]">AI가 이번 달을 분석하고 있어요...</p>
              </div>
            ) : analysis ? (
              <div className="bg-white rounded-2xl p-5 mb-6">
                <h2 className="text-sm font-semibold text-[#6E7F67] mb-3">이번 달 나의 마음</h2>
                <p className="text-sm text-[#4A3728] leading-relaxed mb-4">
                  {analysis.monthlySummary}
                </p>
                {/* 키워드 */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {analysis.monthlyKeywords.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#E6EDE3] text-[#6E7F67] rounded-full text-xs">
                      #{kw}
                    </span>
                  ))}
                </div>
                {/* 응원 메시지 */}
                <div className="bg-[#FBF9F4] rounded-xl p-3">
                  <p className="text-xs text-[#6E7F67] italic">{analysis.advice}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={fetchAnalysis}
                className="w-full bg-white rounded-2xl p-5 mb-6 text-center hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-[#6E7F67] font-medium">🔍 이번 달 감정 분석하기</p>
              </button>
            )}

            {/* 감정 분포 */}
            <h2 className="text-sm font-semibold text-[#4A3728] mb-3">감정별 기록</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {(() => {
                // 감정별 카운트 계산
                const emotionCounts: Record<string, { label: string; emoji: string; count: number }> = {};
                monthEntries.forEach((e) => {
                  const em = EMOTIONS.find((em) => em.id === e.emotion);
                  if (em) {
                    if (!emotionCounts[em.label]) {
                      emotionCounts[em.label] = { label: em.label, emoji: em.emoji, count: 0 };
                    }
                    emotionCounts[em.label].count++;
                  }
                });
                return Object.values(emotionCounts)
                  .sort((a, b) => b.count - a.count)
                  .map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setSelectedEmotion(selectedEmotion === item.label ? null : item.label)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all ${
                        selectedEmotion === item.label
                          ? 'bg-[#6E7F67] text-white'
                          : 'bg-white text-[#4A3728] hover:bg-[#E6EDE3]'
                      }`}
                    >
                      <span>{item.emoji}</span>
                      <span>{item.label}</span>
                      <span className="text-xs opacity-70">({item.count})</span>
                    </button>
                  ));
              })()}
            </div>

            {/* 선택된 감정의 일기 리스트 */}
            {selectedEmotion && (
              <div className="mt-2">
                <h3 className="text-xs font-medium text-[#9E9087] mb-3">
                  {selectedEmotion} 기록 ({filteredEntries.length}건)
                </h3>
                <div className="flex flex-col gap-3">
                  {filteredEntries
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((entry) => {
                      const emotionData = EMOTIONS.find((e) => e.id === entry.emotion);
                      return (
                        <button
                          key={entry.id}
                          onClick={() => setSelectedEntry(entry)}
                          className="bg-white rounded-xl p-4 flex items-center gap-3 w-full text-left hover:shadow-md transition-shadow"
                        >
                          <span className="text-2xl">{emotionData?.emoji ?? '😐'}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#4A3728]">{entry.date}</p>
                            <p className="text-xs text-[#8B7355] truncate">{entry.moment}</p>
                          </div>
                          <span className="text-[#9E9087] text-sm">›</span>
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 상세 모달 */}
      {selectedEntry && (
        <EntryDetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}
    </Layout>
  );
}

function EntryDetailModal({ entry, onClose }: { entry: DiaryEntry; onClose: () => void }) {
  const emotionData = EMOTIONS.find((e) => e.id === entry.emotion);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
      <div className="bg-[#FBF9F4] rounded-t-3xl w-full max-w-[430px] max-h-[85vh] overflow-y-auto p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#4A3728]">{entry.date}의 기록</h2>
          <button onClick={onClose} className="text-2xl text-[#8B7355]" aria-label="닫기">✕</button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-4xl">{emotionData?.emoji ?? '😐'}</span>
          <div>
            <p className="font-semibold text-[#4A3728]">{emotionData?.label ?? entry.emotion}</p>
            <p className="text-sm text-[#8B7355]">강도 {entry.emotionIntensity}/5</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-[#9E9087] mb-1">Moment</p>
          <p className="text-sm text-[#4A3728] bg-white rounded-xl p-3">{entry.moment}</p>
        </div>
        <div className="mb-4">
          <p className="text-xs font-medium text-[#9E9087] mb-1">Reason</p>
          <p className="text-sm text-[#4A3728] bg-white rounded-xl p-3">{entry.reason}</p>
        </div>
        <div className="mb-4">
          <p className="text-xs font-medium text-[#9E9087] mb-1">Insight</p>
          <p className="text-sm text-[#4A3728] bg-white rounded-xl p-3">{entry.insight}</p>
        </div>

        {entry.aiAnalysis && (
          <div className="bg-[#E6EDE3] rounded-2xl p-4 mb-4">
            <p className="text-xs font-medium text-[#6E7F67] mb-2">AI 분석 결과</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {entry.aiAnalysis.keywords.map((kw, i) => (
                <span key={i} className="px-2 py-0.5 bg-white text-[#6E7F67] rounded-full text-xs">#{kw}</span>
              ))}
            </div>
            <p className="text-sm text-[#4A3728]">{entry.aiAnalysis.dailyMessage}</p>
          </div>
        )}

        <button onClick={onClose} className="w-full py-3 bg-[#6E7F67] text-white rounded-2xl font-semibold mt-2">
          닫기
        </button>
      </div>
    </div>
  );
}
