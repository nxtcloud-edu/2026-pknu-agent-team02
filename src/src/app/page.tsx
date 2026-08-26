'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import TreeDisplay from '@/components/home/TreeDisplay';
import DayProgress from '@/components/home/DayProgress';
import RecordButton from '@/components/home/RecordButton';
import DevTools from '@/components/home/DevTools';
import { useMoodStore } from '@/store/useMoodStore';
import { useHydration } from '@/store/useHydration';
import { TREE_MAP } from '@/constants/trees';

export default function HomePage() {
  const hydrated = useHydration();
  const { getActiveCycle, getTodayEntry, startNewCycle } = useMoodStore();
  const activeCycle = getActiveCycle();
  const todayEntry = getTodayEntry();

  useEffect(() => {
    if (!hydrated) return;

    if (!activeCycle) {
      // 사이클 없으면 새로 시작
      startNewCycle();
    } else if (activeCycle.harvested && !todayEntry) {
      // 수확 완료 + 오늘 기록 없음(= 다음 날) → 새 사이클 시작
      startNewCycle();
    }
  }, [hydrated, activeCycle, todayEntry, startNewCycle]);

  if (!hydrated) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[65vh] gap-6">
          <div className="text-6xl animate-pulse">🌱</div>
        </div>
      </Layout>
    );
  }

  const currentDay = activeCycle?.currentDay ?? 0;
  const isTodayCompleted = !!todayEntry;
  const isHarvested = activeCycle?.harvested ?? false;

  // 수확된 나무면 해당 나무 이모지를 보여줌
  const harvestedTree = isHarvested && activeCycle?.treeType
    ? TREE_MAP[activeCycle.treeType]
    : null;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[65vh] gap-6">
        {isHarvested ? (
          <>
            <p className="text-sm text-[#8B7355] mt-4">
              오늘 수확한 나무예요 🎉
            </p>
            <DayProgress currentDay={7} />
            <div className="flex flex-col items-center gap-2">
              <Image
                src={harvestedTree?.image ?? '/trees/소나무.png'}
                alt={harvestedTree?.name ?? '나무'}
                width={150}
                height={150}
                className="object-contain"
              />
              <p className="text-sm text-[#B8A080]">{harvestedTree?.name}</p>
            </div>
            <div className="w-full max-w-xs py-4 bg-green-100 text-green-700 rounded-2xl font-medium text-center">
              내일부터 새 나무를 키울 수 있어요 🌱
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-[#8B7355] mt-4">
              오늘도 마음에 물을 주세요.
            </p>
            <DayProgress currentDay={currentDay} />
            <TreeDisplay currentDay={currentDay} />
            <RecordButton isCompleted={isTodayCompleted} />
            <p className="text-xs text-[#B8A080] text-center px-4">
              기록 완료 후 7일차가 되면 가꿔낸 나무를 수확할 수 있습니다.
            </p>
          </>
        )}
      </div>

      <DevTools />
    </Layout>
  );
}
