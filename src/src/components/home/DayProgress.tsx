'use client';

interface DayProgressProps {
  currentDay: number;
}

export default function DayProgress({ currentDay }: DayProgressProps) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <p className="text-sm font-medium text-[#8B7355]">
        Day {currentDay} / 7
      </p>
      <div className="flex gap-1.5 w-full max-w-[200px]">
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < currentDay ? 'bg-green-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
