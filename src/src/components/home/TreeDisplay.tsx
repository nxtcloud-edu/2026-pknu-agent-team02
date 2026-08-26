'use client';

import Image from 'next/image';
import { getTreeStage } from '@/constants/tree-stages';

interface TreeDisplayProps {
  currentDay: number;
}

export default function TreeDisplay({ currentDay }: TreeDisplayProps) {
  const stage = getTreeStage(currentDay);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-[160px] h-[200px] relative flex items-center justify-center overflow-hidden">
        <Image
          src={stage.image}
          alt={stage.label}
          fill
          className="object-contain"
          priority
        />
      </div>
      <p className="text-sm text-[#B8A080]">{stage.label}</p>
    </div>
  );
}
