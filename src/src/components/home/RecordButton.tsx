'use client';

import Link from 'next/link';

interface RecordButtonProps {
  isCompleted: boolean;
}

export default function RecordButton({ isCompleted }: RecordButtonProps) {
  if (isCompleted) {
    return (
      <div className="w-full max-w-xs py-4 bg-[#E6EDE3] text-[#6E7F67] rounded-2xl font-medium text-center">
        오늘의 기록을 완료했어요 🌱
      </div>
    );
  }

  return (
    <Link
      href="/record"
      className="block w-full max-w-xs py-4 bg-[#6E7F67] border border-[#9E9087] text-[#FFFFFF] rounded-2xl font-semibold text-lg text-center hover:bg-[#5a6b56] transition-colors"
    >
      오늘 기록하기
    </Link>
  );
}
