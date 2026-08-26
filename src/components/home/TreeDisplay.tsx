'use client';

import Image from 'next/image';
import { getGrowthStage } from '@/constants/tree-stages';

interface TreeDisplayProps {
  currentDay: number;
}

export default function TreeDisplay({ currentDay }: TreeDisplayProps) {
  const stage = getGrowthStage(currentDay);

  return (
    <div className="flex flex-col items-center gap-2">
      {stage.image ? (
        <div className="relative w-[160px] h-[192px] flex items-center justify-center">
          <Image
            src={stage.image}
            alt={stage.label}
            fill
            className="object-contain animate-bounce-slow"
            sizes="160px"
            priority
          />
        </div>
      ) : (
        <div className="text-[120px] leading-none animate-bounce-slow">
          🌳
        </div>
      )}
      <p className="text-sm text-[#B8A080]">{stage.label}</p>
    </div>
  );
}
