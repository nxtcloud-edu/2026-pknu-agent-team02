'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { useMoodStore } from '@/store/useMoodStore';
import { TREE_MAP } from '@/constants/trees';
import { useHydration } from '@/store/useHydration';

export default function TreeTypePage() {
  const hydrated = useHydration();
  const router = useRouter();
  const { treeType } = useParams<{ treeType: string }>();
  const { collection, cycles } = useMoodStore();

  const tree = TREE_MAP[treeType];
  const collectionItem = collection.find((c) => c.treeType === treeType);

  if (!hydrated) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-4xl animate-pulse">🌳</div>
        </div>
      </Layout>
    );
  }

  if (!tree || !collectionItem?.unlocked) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-[#8B7355]">아직 발견하지 못한 나무예요.</p>
        </div>
      </Layout>
    );
  }

  // 이 나무 종류에 해당하는 모든 사이클 가져오기
  const treeCycles = collectionItem.cycleIds
    .map((id) => cycles.find((c) => c.id === id))
    .filter(Boolean)
    .sort((a, b) => (b!.startDate).localeCompare(a!.startDate));

  return (
    <Layout>
      <div className="py-4">
        {/* 뒤로가기 */}
        <button
          onClick={() => router.push('/collection')}
          className="text-sm text-[#8B7355] mb-4"
        >
          ← 도감으로
        </button>

        {/* 나무 정보 */}
        <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 mb-6">
          <Image src={tree.image} alt={tree.name} width={100} height={100} className="object-contain" />
          <h1 className="text-xl font-bold text-[#4A3728]">{tree.name}</h1>
          <p className="text-sm text-[#8B7355]">{tree.nameEn}</p>
          <p className="text-xs text-[#B8A080]">총 {treeCycles.length}그루 수확</p>
        </div>

        {/* 나무 그루별 목록 */}
        <h2 className="text-sm font-semibold text-[#4A3728] mb-3">
          나의 {tree.name} 숲
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {treeCycles.map((cycle, idx) => (
            <button
              key={cycle!.id}
              onClick={() => router.push(`/collection/${treeType}/${cycle!.id}`)}
              className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <Image src={tree.image} alt={tree.name} width={50} height={50} className="object-contain" />
              <p className="text-xs font-medium text-[#4A3728]">
                {idx + 1}번째
              </p>
              <p className="text-[10px] text-[#B8A080]">
                {cycle!.startDate}
              </p>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
