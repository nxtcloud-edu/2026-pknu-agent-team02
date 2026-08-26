'use client';

import Link from 'next/link';
import Image from 'next/image';
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
                  className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-full h-24 flex items-center justify-center">
                    <Image src={tree.image} alt={tree.name} width={80} height={80} className="object-contain max-h-24" />
                  </div>
                  <p className="font-semibold text-[#4A3728] text-sm">{tree.name}</p>
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
                className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center gap-2 opacity-60"
              >
                <div className="w-full h-24 flex items-center justify-center">
                  <span className="text-4xl">🔒</span>
                </div>
                <p className="font-semibold text-gray-400 text-sm">???</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
