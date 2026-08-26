'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-4 h-14">
      <Link href="/diary" aria-label="달력 보기" className="text-xl">
        📅
      </Link>
      <h1 className="text-lg font-semibold text-brown-800">마음 나무</h1>
      <Link href="/diary" aria-label="기록 목록 보기" className="text-xl">
        📋
      </Link>
    </header>
  );
}
