'use client';

import { getTreeStage } from '@/constants/tree-stages';

interface TreeDisplayProps {
  currentDay: number;
}

export default function TreeDisplay({ currentDay }: TreeDisplayProps) {
  const stage = getTreeStage(currentDay);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-[120px] leading-none animate-bounce-slow">
        {stage.emoji}
      </div>
      <p className="text-sm text-[#B8A080]">{stage.label}</p>
    </div>
  );
}
