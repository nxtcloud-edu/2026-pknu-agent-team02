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
      <Image
        src={stage.image}
        alt={stage.label}
        width={150}
        height={150}
        className="object-contain"
        priority
      />
      <p className="text-sm text-[#B8A080]">{stage.label}</p>
    </div>
  );
}
