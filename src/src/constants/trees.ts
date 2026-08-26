import { EmotionId } from './emotions';

export interface TreeType {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  image: string;
  emotionId: EmotionId;
  keywords: string[];
  description: string;
}

export const TREES: TreeType[] = [
  {
    id: 'CHERRY',
    name: '벚나무',
    nameEn: 'Cherry Blossom',
    emoji: '🌸',
    image: '/trees/벚나무.png',
    emotionId: 'joy',
    keywords: ['기쁨', '설렘', '관계', '새로운 경험'],
    description: '새로운 순간과 사람들에게서 즐거움을 많이 발견한 한 주였습니다.',
  },
  {
    id: 'PINE',
    name: '소나무',
    nameEn: 'Pine',
    emoji: '🌲',
    image: '/trees/소나무.png',
    emotionId: 'calm',
    keywords: ['편안함', '안정감', '꾸준함', '차분함'],
    description: '자신의 리듬을 지키며 마음을 돌본 한 주였습니다.',
  },
  {
    id: 'OAK',
    name: '참나무',
    nameEn: 'Oak',
    emoji: '🌳',
    image: '/trees/참나무.png',
    emotionId: 'proud',
    keywords: ['성장', '도전', '성취', '문제 해결'],
    description: '어려움 속에서도 배우고 앞으로 나아가려는 모습이 많이 나타난 한 주였습니다.',
  },
  {
    id: 'WILLOW',
    name: '버드나무',
    nameEn: 'Willow',
    emoji: '🌿',
    image: '/trees/버드나무.png',
    emotionId: 'sad',
    keywords: ['위로', '공감', '감수성', '치유'],
    description: '깊은 감정을 느끼며 스스로를 위로한 한 주였습니다.',
  },
  {
    id: 'BIRCH',
    name: '자작나무',
    nameEn: 'Birch',
    emoji: '🌾',
    image: '/trees/자작나무.png',
    emotionId: 'anxious',
    keywords: ['용기', '극복', '인내', '희망'],
    description: '불안 속에서도 앞으로 나아가려는 용기를 보여준 한 주였습니다.',
  },
  {
    id: 'MAPLE',
    name: '단풍나무',
    nameEn: 'Maple',
    emoji: '🍁',
    image: '/trees/단풍나무.png',
    emotionId: 'angry',
    keywords: ['자기성찰', '변화', '에너지', '솔직함'],
    description: '자신의 감정에 솔직하게 마주한 한 주였습니다.',
  },
  {
    id: 'GINKGO',
    name: '은행나무',
    nameEn: 'Ginkgo',
    emoji: '💛',
    image: '/trees/은행.png',
    emotionId: 'regret',
    keywords: ['성숙', '받아들임', '배움', '감사'],
    description: '아쉬움을 통해 새로운 배움을 얻은 한 주였습니다.',
  },
  {
    id: 'BAMBOO',
    name: '대나무',
    nameEn: 'Bamboo',
    emoji: '🎋',
    image: '/trees/대나무.png',
    emotionId: 'neutral',
    keywords: ['평온', '균형', '관조', '여유'],
    description: '담담하게 자신을 바라보며 균형을 유지한 한 주였습니다.',
  },
];

export const TREE_MAP = Object.fromEntries(TREES.map((t) => [t.id, t]));
