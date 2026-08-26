'use client';

import { useMoodStore } from '@/store/useMoodStore';

export default function DevTools() {
  const { advanceDay, generateTestData, resetAll } = useMoodStore();

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-20 right-4 flex flex-col gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3 shadow-lg z-50">
      <p className="text-xs font-bold text-yellow-800">DEV TOOLS</p>
      <button
        onClick={advanceDay}
        className="text-xs bg-yellow-200 px-3 py-1.5 rounded-lg hover:bg-yellow-300"
      >
        다음 날로 이동
      </button>
      <button
        onClick={generateTestData}
        className="text-xs bg-yellow-200 px-3 py-1.5 rounded-lg hover:bg-yellow-300"
      >
        테스트 데이터 생성
      </button>
      <button
        onClick={resetAll}
        className="text-xs bg-red-200 px-3 py-1.5 rounded-lg hover:bg-red-300"
      >
        전체 초기화
      </button>
    </div>
  );
}
