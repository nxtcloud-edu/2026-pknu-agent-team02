'use client';

import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import TreeDisplay from '@/components/home/TreeDisplay';
import DayProgress from '@/components/home/DayProgress';
import RecordButton from '@/components/home/RecordButton';
import DevTools from '@/components/home/DevTools';
import { useMoodStore } from '@/store/useMoodStore';

export default function HomePage() {
  const { getActiveCycle, getTodayEntry, startNewCycle } = useMoodStore();
  const activeCycle = getActiveCycle();
  const todayEntry = getTodayEntry();

  useEffect(() => {
    if (!activeCycle) {
      startNewCycle();
    }
  }, [activeCycle, startNewCycle]);

  const currentDay = activeCycle?.currentDay ?? 0;
  const isTodayCompleted = !!todayEntry;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[65vh] gap-6">
        <p className="text-sm text-[#8B7355] mt-4">
          오늘도 마음에 물을 주세요.
        </p>

        <DayProgress currentDay={currentDay} />

        <TreeDisplay currentDay={currentDay} />

        <RecordButton isCompleted={isTodayCompleted} />

        <p className="text-xs text-[#B8A080] text-center px-4">
          기록 완료 후 7일차가 되면 가꿔낸 나무를 수확할 수 있습니다.
        </p>
      </div>

      <DevTools />
    </Layout>
  );
}
