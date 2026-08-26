'use client';

import Link from 'next/link';

interface RecordButtonProps {
  isCompleted: boolean;
}

export default function RecordButton({ isCompleted }: RecordButtonProps) {
  if (isCompleted) {
    return (
      <div className="w-full max-w-xs py-4 bg-green-100 text-green-700 rounded-2xl font-medium text-center">
        오늘의 기록을 완료했어요 🌱
      </div>
    );
  }

  return (
    <Link
      href="/record"
      className="block w-full max-w-xs py-4 bg-green-500 text-white rounded-2xl font-semibold text-lg text-center hover:bg-green-600 transition-colors"
    >
      오늘 기록하기
    </Link>
  );
}
