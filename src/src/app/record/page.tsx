'use client';

import { useState, useEffect, useRef } from 'react';
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
  const { addEntry, getTodayEntry } = useMoodStore();
  const [step, setStep] = useState(0);
  const [moment, setMoment] = useState('');
  const [emotion, setEmotion] = useState<EmotionId | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [reason, setReason] = useState('');
  const [insight, setInsight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const submittedRef = useRef(false);

  // 이미 오늘 기록했으면 홈으로 (단, 방금 제출한 경우는 제외)
  const todayEntry = getTodayEntry();

  useEffect(() => {
    if (todayEntry && !submittedRef.current) {
      router.push('/');
    }
  }, [todayEntry, router]);

  if (todayEntry && !submittedRef.current) {
    return null;
  }

  const handleSubmit = async () => {
    if (!emotion) return;
    setIsLoading(true);
    submittedRef.current = true;

    // 데이터 저장
    const entry = addEntry({
      moment,
      emotion,
      emotionIntensity: intensity,
      reason,
      insight,
    });

    // addEntry 후 최신 상태에서 사이클 확인
    setIsLoading(false);
    const updatedCycle = useMoodStore.getState().getActiveCycle();
    if (updatedCycle && updatedCycle.completed) {
      router.push('/complete');
    } else {
      router.push(`/result?entryId=${entry.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4]">
      <div className="max-w-[430px] mx-auto px-5 py-6">
      {/* 상단 네비 */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => { if (step > 0) setStep(step - 1); else router.push('/'); }}
          className="text-lg text-[#8B7355] hover:text-[#4A3728]"
          aria-label="이전 단계"
        >
          ←
        </button>
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
    </div>
  );
}
