'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-4 h-14">
      <Link href="/archive" aria-label="전체 일기 보기">
        <ListIcon />
      </Link>
      <h1
        className="text-lg font-semibold"
        style={{ color: '#4A3728' }}
      >
        마음 나무
      </h1>
      {/* 우측은 빈 공간으로 중앙 정렬 유지 */}
      <div className="w-5" />
    </header>
  );
}

function ListIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.66602 5H17.4993"
        stroke="#9E9087"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66602 10H17.4993"
        stroke="#9E9087"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66602 15H17.4993"
        stroke="#9E9087"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 5H2.50833"
        stroke="#9E9087"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 10H2.50833"
        stroke="#9E9087"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 15H2.50833"
        stroke="#9E9087"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
