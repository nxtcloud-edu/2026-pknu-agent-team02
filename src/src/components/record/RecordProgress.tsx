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
                ? 'bg-green-500 text-white'
                : i < currentStep
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-400'
            }`}
            disabled
          >
            {step}
          </button>
        ))}
      </div>
      <p className="text-center text-sm text-[#8B7355]">
        {currentStep + 1} / {STEPS.length}
      </p>
    </div>
  );
}
