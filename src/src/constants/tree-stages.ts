export const TREE_STAGES = [
  { day: 0, emoji: '🌑', label: '시작 전' },
  { day: 1, emoji: '🌰', label: '씨앗' },
  { day: 2, emoji: '🌱', label: '새싹' },
  { day: 3, emoji: '🪴', label: '줄기' },
  { day: 4, emoji: '🌿', label: '가지' },
  { day: 5, emoji: '☘️', label: '잎' },
  { day: 6, emoji: '🌲', label: '거의 완성' },
  { day: 7, emoji: '🎄', label: '완성' },
] as const;

export function getTreeStage(day: number) {
  if (day < 0) return TREE_STAGES[0];
  if (day > 7) return TREE_STAGES[7];
  return TREE_STAGES[day];
}
