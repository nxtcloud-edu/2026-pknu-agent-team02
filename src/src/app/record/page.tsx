'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RecordProgress from '@/components/record/RecordProgress';
import MomentStep from '@/components/record/MomentStep';
import EmotionStep from '@/components/record/EmotionStep';
import ReasonStep from '@/components/record/ReasonStep';
import InsightStep from '@/components/record/InsightStep';
import { EmotionId } from '@/constants/emotions';

export default function RecordPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [moment, setMoment] = useState('');
  const [emotion, setEmotion] = useState<EmotionId | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [reason, setReason] = useState('');
  const [insight, setInsight] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // TODO: 단위 4에서 데이터 저장, 단위 5에서 AI 분석 연동
    // 임시로 결과 페이지로 이동
    setTimeout(() => {
      setIsLoading(false);
      router.push('/result');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] px-5 py-6">
      {/* 닫기 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={() => router.push('/')}
          className="text-2xl text-[#8B7355] hover:text-[#4A3728]"
          aria-label="기록 취소"
        >
          ✕
        </button>
      </div>

      {/* 진행 탭 */}
      <RecordProgress currentStep={step} />

      {/* 단계별 컴포넌트 */}
      {step === 0 && (
        <MomentStep
          value={moment}
          onChange={setMoment}
          onNext={() => setStep(1)}
        />
      )}

      {step === 1 && (
        <EmotionStep
          selectedEmotion={emotion}
          intensity={intensity}
          onSelectEmotion={setEmotion}
          onChangeIntensity={setIntensity}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <ReasonStep
          value={reason}
          onChange={setReason}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <InsightStep
          value={insight}
          onChange={setInsight}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
