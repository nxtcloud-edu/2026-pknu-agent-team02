'use client';

interface InsightStepProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function InsightStep({ value, onChange, onSubmit, isLoading }: InsightStepProps) {
  return (
    <div className="flex flex-col gap-6 mt-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#4A3728]">Insight</h2>
        <p className="text-sm text-[#8B7355] mt-2">
          이 경험을 통해 새롭게 알게 된 내 모습은?
        </p>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="오늘 발견한 나에 대해 적어보세요..."
        className="w-full h-40 p-4 bg-white rounded-2xl border border-gray-100 resize-none text-[#4A3728] placeholder-[#B8A080] focus:outline-none focus:ring-2 focus:ring-green-200"
      />

      <button
        onClick={onSubmit}
        disabled={!value.trim() || isLoading}
        className="w-full py-4 bg-green-500 text-white rounded-2xl font-semibold text-lg disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
      >
        {isLoading ? '분석 중...' : '기록 완료'}
      </button>
    </div>
  );
}
