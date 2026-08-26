'use client';

import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { useMoodStore } from '@/store/useMoodStore';
import { TREE_MAP } from '@/constants/trees';

export default function CollectionPage() {
  const { collection } = useMoodStore();

  return (
    <Layout>
      <div className="py-4">
        <h1 className="text-xl font-bold text-[#4A3728] text-center mb-6">
          나의 마음나무 도감
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {collection.map((item) => {
            const tree = TREE_MAP[item.treeType];
            if (!tree) return null;

            if (item.unlocked) {
              return (
                <Link
                  key={item.treeType}
                  href={`/collection/${item.cycleIds[item.cycleIds.length - 1]}`}
                  className="bg-white rounded-2xl p-5 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-4xl">{tree.emoji}</span>
                  <p className="font-semibold text-[#4A3728]">{tree.name}</p>
                  <p className="text-xs text-green-600">획득 완료</p>
                  {item.count > 1 && (
                    <p className="text-xs text-[#B8A080]">× {item.count}</p>
                  )}
                  <p className="text-xs text-[#B8A080]">{item.unlockedAt}</p>
                </Link>
              );
            }

            return (
              <div
                key={item.treeType}
                className="bg-gray-50 rounded-2xl p-5 flex flex-col items-center gap-2 opacity-60"
              >
                <span className="text-4xl">🔒</span>
                <p className="font-semibold text-gray-400">???</p>
                <p className="text-xs text-gray-400">아직 만나지 못했어요</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
