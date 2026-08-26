'use client';

import Header from './Header';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <div className="max-w-[430px] mx-auto relative">
        <Header />
        <main className="px-5 pb-20">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
