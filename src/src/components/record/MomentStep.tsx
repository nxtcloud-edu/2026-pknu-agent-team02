'use client';

interface MomentStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export default function MomentStep({ value, onChange, onNext }: MomentStepProps) {
  return (
    <div className="flex flex-col gap-6 mt-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#4A3728]">Moment</h2>
        <p className="text-sm text-[#8B7355] mt-2">
          오늘 가장 기억에 남는 순간은?
        </p>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="오늘 있었던 일을 자유롭게 적어보세요..."
        className="w-full h-40 p-4 bg-white rounded-2xl border border-gray-100 resize-none text-[#4A3728] placeholder-[#B8A080] focus:outline-none focus:ring-2 focus:ring-[#E6EDE3]"
      />

      <button
        onClick={onNext}
        disabled={!value.trim()}
        className="w-full py-4 bg-[#6E7F67] border border-[#9E9087] text-[#FFFFFF] rounded-2xl font-semibold text-lg disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
      >
        다음
      </button>
    </div>
  );
}
