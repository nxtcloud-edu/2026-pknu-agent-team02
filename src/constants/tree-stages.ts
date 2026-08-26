import seedImg from '@/assets/trees/seed.png';
import sproutImg from '@/assets/trees/sprout.png';
import saplingImg from '@/assets/trees/sapling.png';

export const GROWTH_STAGES = [
  { minDay: 0, maxDay: 0, image: seedImg, label: '시작 전' },
  { minDay: 1, maxDay: 2, image: seedImg, label: '씨앗' },
  { minDay: 3, maxDay: 4, image: sproutImg, label: '새싹' },
  { minDay: 5, maxDay: 6, image: saplingImg, label: '묘목' },
  { minDay: 7, maxDay: 7, image: null, label: '다 자란 나무' }, // 7일차는 나무 종류별 이미지 사용
] as const;

// 레거시 호환용
export const TREE_STAGES = [
  { day: 0, emoji: '🌑', label: '시작 전' },
  { day: 1, emoji: '🌰', label: '씨앗' },
  { day: 2, emoji: '🌰', label: '씨앗' },
  { day: 3, emoji: '🌱', label: '새싹' },
  { day: 4, emoji: '🌱', label: '새싹' },
  { day: 5, emoji: '🪴', label: '묘목' },
  { day: 6, emoji: '🪴', label: '묘목' },
  { day: 7, emoji: '🌳', label: '다 자란 나무' },
] as const;

export function getTreeStage(day: number) {
  if (day < 0) return TREE_STAGES[0];
  if (day > 7) return TREE_STAGES[7];
  return TREE_STAGES[day];
}

export function getGrowthStage(day: number) {
  if (day <= 0) return GROWTH_STAGES[0];
  if (day <= 2) return GROWTH_STAGES[1];
  if (day <= 4) return GROWTH_STAGES[2];
  if (day <= 6) return GROWTH_STAGES[3];
  return GROWTH_STAGES[4];
}
