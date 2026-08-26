'use client';

import { Suspense } from 'react';
import CompleteContent from './CompleteContent';

export default function CompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center gap-4">
          <div className="text-6xl animate-pulse">🌳</div>
          <p className="text-[#8B7355]">나무를 분석하고 있어요...</p>
        </div>
      }
    >
      <CompleteContent />
    </Suspense>
  );
}
