'use client';

import { EMOTIONS, EmotionId } from '@/constants/emotions';

interface EmotionStepProps {
  selectedEmotion: EmotionId | null;
  intensity: number;
  onSelectEmotion: (emotion: EmotionId) => void;
  onChangeIntensity: (intensity: number) => void;
  onNext: () => void;
}

export default function EmotionStep({
  selectedEmotion,
  intensity,
  onSelectEmotion,
  onChangeIntensity,
  onNext,
}: EmotionStepProps) {
  return (
    <div className="flex flex-col gap-6 mt-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#4A3728]">Emotion</h2>
        <p className="text-sm text-[#8B7355] mt-2">
          그때 어떤 감정을 느꼈어?
        </p>
      </div>

      {/* 감정 그리드 */}
      <div className="grid grid-cols-4 gap-3">
        {EMOTIONS.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => onSelectEmotion(emotion.id)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
              selectedEmotion === emotion.id
                ? 'bg-green-100 ring-2 ring-green-500 scale-105'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl">{emotion.emoji}</span>
            <span className="text-xs text-[#4A3728]">{emotion.label}</span>
          </button>
        ))}
      </div>

      {/* 강도 슬라이더 */}
      {selectedEmotion && (
        <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl">
          <p className="text-sm text-[#8B7355] text-center">
            감정의 강도는 어느 정도인가요?
          </p>
          <input
            type="range"
            min={1}
            max={5}
            value={intensity}
            onChange={(e) => onChangeIntensity(Number(e.target.value))}
            className="w-full accent-green-500"
          />
          <div className="flex justify-between text-xs text-[#B8A080]">
            <span>1 약함</span>
            <span>3 보통</span>
            <span>5 매우 강함</span>
          </div>
          <p className="text-center text-lg font-semibold text-green-600">
            {intensity}
          </p>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!selectedEmotion}
        className="w-full py-4 bg-green-500 text-white rounded-2xl font-semibold text-lg disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
      >
        다음
      </button>
    </div>
  );
}
