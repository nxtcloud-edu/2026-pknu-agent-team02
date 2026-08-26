'use client';

import { Suspense } from 'react';
import ResultContent from './ResultContent';

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF9F4] flex flex-col items-center justify-center gap-4">
          <div className="text-6xl animate-pulse">🌿</div>
          <p className="text-[#8B7355]">로딩 중...</p>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
