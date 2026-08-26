import Layout from '@/components/layout/Layout';

export default function HomePage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <p className="text-sm text-[#8B7355]">Day 1 / 7</p>
        <div className="text-8xl">🌱</div>
        <p className="text-center text-[#8B7355]">오늘도 마음에 물을 주세요.</p>
        <button className="w-full max-w-xs py-4 bg-green-500 text-white rounded-2xl font-semibold text-lg hover:bg-green-600 transition-colors">
          오늘 기록하기
        </button>
        <p className="text-xs text-[#B8A080] text-center">
          기록 완료 후 7일차가 되면 가꿔낸 나무를 수확할 수 있습니다.
        </p>
      </div>
    </Layout>
  );
}
