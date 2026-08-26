'use client';

const STEPS = ['Moment', 'Emotion', 'Reason', 'Insight'];

interface RecordProgressProps {
  currentStep: number;
}

export default function RecordProgress({ currentStep }: RecordProgressProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-2">
        {STEPS.map((step, i) => (
          <button
            key={step}
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
              i === currentStep
                ? 'bg-[#6E7F67] text-white'
                : i < currentStep
                ? 'bg-[#E6EDE3] text-[#6E7F67]'
                : 'bg-gray-100 text-gray-400'
            }`}
            disabled
          >
            {step}
          </button>
        ))}
      </div>
      <p className="text-center text-sm text-[#9E9087]">
        {currentStep + 1} / {STEPS.length}
      </p>
    </div>
  );
}
