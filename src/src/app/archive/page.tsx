'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMoodStore } from '@/store/useMoodStore';
import { useHydration } from '@/store/useHydration';

export default function ArchivePage() {
  const hydrated = useHydration();
  const router = useRouter();
  const { entries } = useMoodStore();

  // 년도-월별로 기록 개수 집계
  const monthGroups = useMemo(() => {
    const groups: Record<string, Record<string, number>> = {};
    entries.forEach((e) => {
      const [year, month] = e.date.split('-');
      if (!groups[year]) groups[year] = {};
      groups[year][month] = (groups[year][month] || 0) + 1;
    });
    return groups;
  }, [entries]);

  const years = Object.keys(monthGroups).sort((a, b) => b.localeCompare(a));
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(
    years.includes(currentYear) ? currentYear : years[0] || currentYear
  );

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="text-4xl animate-pulse">📋</div>
      </div>
    );
  }

  const monthsForYear = monthGroups[selectedYear] || {};

  return (
    <div className="min-h-screen bg-[#FFF8F0] px-5 py-6">
      <div className="max-w-[430px] mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/')}
            className="text-[#8B7355] text-lg"
          >
            ← 홈
          </button>
          <h1 className="text-lg font-semibold text-[#4A3728]">기록 보관함</h1>
          <div className="w-10" />
        </div>

        {years.length === 0 ? (
          <p className="text-sm text-[#B8A080] text-center py-12">
            아직 기록이 없어요.
          </p>
        ) : (
          <>
            {/* 년도 선택 */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => {
                  const idx = years.indexOf(selectedYear);
                  if (idx < years.length - 1) setSelectedYear(years[idx + 1]);
                }}
                disabled={years.indexOf(selectedYear) >= years.length - 1}
                className="text-xl text-[#8B7355] disabled:opacity-30"
              >
                ←
              </button>
              <span className="text-2xl font-bold text-[#4A3728]">
                {selectedYear}년
              </span>
              <button
                onClick={() => {
                  const idx = years.indexOf(selectedYear);
                  if (idx > 0) setSelectedYear(years[idx - 1]);
                }}
                disabled={years.indexOf(selectedYear) <= 0}
                className="text-xl text-[#8B7355] disabled:opacity-30"
              >
                →
              </button>
            </div>

            {/* 월별 버튼 */}
            {Object.keys(monthsForYear).length === 0 ? (
              <p className="text-sm text-[#B8A080] text-center py-8">
                {selectedYear}년에는 기록이 없어요.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(monthsForYear)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([month, count]) => (
                    <button
                      key={month}
                      onClick={() => router.push(`/archive/${selectedYear}-${month}`)}
                      className="bg-white rounded-2xl p-5 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-2xl font-bold text-[#4A3728]">
                        {parseInt(month)}월
                      </span>
                      <span className="text-xs text-[#8B7355]">
                        {count}건
                      </span>
                    </button>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
