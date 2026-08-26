'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RecordProgress from '@/components/record/RecordProgress';
import MomentStep from '@/components/record/MomentStep';
import EmotionStep from '@/components/record/EmotionStep';
import ReasonStep from '@/components/record/ReasonStep';
import InsightStep from '@/components/record/InsightStep';
import { EmotionId } from '@/constants/emotions';
import { useMoodStore } from '@/store/useMoodStore';

export default function RecordPage() {
  const router = useRouter();
  const { addEntry, getTodayEntry, getActiveCycle } = useMoodStore();
  const [step, setStep] = useState(0);
  const [moment, setMoment] = useState('');
  const [emotion, setEmotion] = useState<EmotionId | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [reason, setReason] = useState('');
  const [insight, setInsight] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 이미 오늘 기록했으면 홈으로
  const todayEntry = getTodayEntry();
  if (todayEntry) {
    router.push('/');
    return null;
  }

  const handleSubmit = async () => {
    if (!emotion) return;
    setIsLoading(true);

    // 데이터 저장
    const entry = addEntry({
      moment,
      emotion,
      emotionIntensity: intensity,
      reason,
      insight,
    });

    // 결과 페이지에서 AI 분석을 수행
    setIsLoading(false);
    // 7일째면 완성 페이지로, 아닌면 결과 페이지로
    const cycle = getActiveCycle();
    if (cycle && cycle.currentDay >= 7) {
      router.push('/complete');
    } else {
      router.push(`/result?entryId=${entry.id}`);
    }
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
