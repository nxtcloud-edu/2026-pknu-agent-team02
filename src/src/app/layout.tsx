import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '마음 나무 - Mood Tree',
  description: '매일의 감정을 기록하고, 7일 동안의 마음을 한 그루의 나무로 키워가는 AI 감정 기록 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-[#FFF8F0] text-[#4A3728]">
        {children}
      </body>
    </html>
  );
}
