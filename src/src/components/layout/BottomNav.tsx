'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { id: 'home', label: '홈', path: '/', icon: HouseIcon },
  { id: 'diary', label: '달력', path: '/diary', icon: CalendarIcon },
  { id: 'analysis', label: '분석', path: '/analysis', icon: ChartIcon },
  { id: 'collection', label: '도감', path: '/collection', icon: BookOpenIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-[430px] mx-auto flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.path === '/'
              ? pathname === '/'
              : pathname.startsWith(item.path);

          const color = isActive ? '#6E7F67' : '#9E9087';

          return (
            <Link
              key={item.id}
              href={item.path}
              className="flex flex-col items-center gap-1 px-4 py-2"
              aria-label={item.label}
            >
              <item.icon color={color} />
              <span
                className="text-[11px] leading-[15px]"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: isActive ? 700 : 500,
                  color,
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function HouseIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 7.5L10 2L17 7.5V16C17 16.5304 16.7893 17.0391 16.4142 17.4142C16.0391 17.7893 15.5304 18 15 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V7.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 18V10H12.5V18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PenIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.166 2.5C14.3849 2.28113 14.6447 2.10752 14.9307 1.98906C15.2167 1.87061 15.5232 1.80957 15.8327 1.80957C16.1422 1.80957 16.4487 1.87061 16.7347 1.98906C17.0207 2.10752 17.2805 2.28113 17.4993 2.5C17.7182 2.71887 17.8918 2.97871 18.0103 3.26468C18.1287 3.55066 18.1898 3.85719 18.1898 4.16667C18.1898 4.47614 18.1287 4.78267 18.0103 5.06865C17.8918 5.35463 17.7182 5.61446 17.4993 5.83333L6.24935 17.0833L1.66602 18.3333L2.91602 13.75L14.166 2.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookOpenIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.66602 2.5H6.66602C7.55007 2.5 8.39791 2.85119 9.02303 3.47631C9.64816 4.10143 9.99935 4.94928 9.99935 5.83333V17.5C9.99935 16.837 9.73596 16.2011 9.26712 15.7322C8.79827 15.2634 8.16239 15 7.49935 15H1.66602V2.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.334 2.5H13.334C12.4499 2.5 11.6021 2.85119 10.977 3.47631C10.3518 4.10143 10.0007 4.94928 10.0007 5.83333V17.5C10.0007 16.837 10.264 16.2011 10.7329 15.7322C11.2017 15.2634 11.8376 15 12.5007 15H18.334V2.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="2.5"
        y="3.33"
        width="15"
        height="14.17"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.33 1.67V5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.67 1.67V5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 8.33H17.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.67 10H13.33L11.67 17.5L8.33 2.5L6.67 10H3.33" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
