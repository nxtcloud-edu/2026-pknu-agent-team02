'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-4 h-14">
      <Link href="/diary" aria-label="달력 보기">
        <CalendarIcon />
      </Link>
      <h1
        className="text-lg font-semibold"
        style={{ color: '#4A3728', fontFamily: 'var(--font-manrope), sans-serif' }}
      >
        마음 나무
      </h1>
      <Link href="/diary" aria-label="기록 목록 보기">
        <ListIcon />
      </Link>
    </header>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="2.5"
        y="3.33301"
        width="15"
        height="14.1667"
        rx="2"
        stroke="#9E9087"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.334 1.66699V5.00033"
        stroke="#9E9087"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66602 1.66699V5.00033"
        stroke="#9E9087"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 8.33301H17.5"
        stroke="#9E9087"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
