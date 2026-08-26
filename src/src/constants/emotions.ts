export const EMOTIONS = [
  { id: 'joy', label: '기쁨', emoji: '😊' },
  { id: 'calm', label: '편안함', emoji: '😌' },
  { id: 'proud', label: '뿌듯함', emoji: '🥹' },
  { id: 'sad', label: '슬픔', emoji: '😢' },
  { id: 'anxious', label: '불안', emoji: '😰' },
  { id: 'angry', label: '화남', emoji: '😡' },
  { id: 'regret', label: '아쉬움', emoji: '😔' },
  { id: 'neutral', label: '무덤덤함', emoji: '😐' },
] as const;

export type EmotionId = (typeof EMOTIONS)[number]['id'];
