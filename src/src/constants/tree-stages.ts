export const TREE_STAGES = [
  { day: 0, image: '/trees/씨앗.png', label: '시작 전' },
  { day: 1, image: '/trees/씨앗.png', label: '씨앗' },
  { day: 2, image: '/trees/씨앗.png', label: '씨앗' },
  { day: 3, image: '/trees/새싹.png', label: '새싹' },
  { day: 4, image: '/trees/새싹.png', label: '새싹' },
  { day: 5, image: '/trees/묘목.png', label: '묘목' },
  { day: 6, image: '/trees/묘목.png', label: '묘목' },
  { day: 7, image: '/trees/묘목.png', label: '완성' },
] as const;

export function getTreeStage(day: number) {
  if (day <= 0) return TREE_STAGES[0];
  if (day >= 7) return TREE_STAGES[7];
  return TREE_STAGES[day];
}
