import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

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
    <html lang="ko" className={manrope.variable}>
      <body className="antialiased bg-[#FBF9F4] text-[#4A3728] font-[family-name:var(--font-manrope)]">
        {children}
      </body>
    </html>
  );
}
