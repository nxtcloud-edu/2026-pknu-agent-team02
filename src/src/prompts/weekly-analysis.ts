import { DiaryEntry } from '@/store/types';
import { EMOTIONS } from '@/constants/emotions';
import { TREES } from '@/constants/trees';

export function getWeeklyAnalysisPrompt(entries: DiaryEntry[]): string {
  const entriesSummary = entries
    .map((e, i) => {
      const emotionLabel = EMOTIONS.find((em) => em.id === e.emotion)?.label ?? e.emotion;
      return `Day ${i + 1}: 감정=${emotionLabel}(강도${e.emotionIntensity}), 이유=${e.reason}, 인사이트=${e.insight}`;
    })
    .join('\n');

  const treeOptions = TREES.map(
    (t) => `${t.id}: ${t.name} (${t.keywords.join(', ')})`
  ).join('\n');

  return `당신은 감정 분석 AI입니다. 7일간의 감정 기록을 종합 분석하여 가장 어울리는 나무를 결정하세요.

## 7일간 기록
${entriesSummary}

## 나무 종류 (하나를 선택)
${treeOptions}

## 반환 형식 (JSON만 반환, 다른 텍스트 없이)
{
  "treeType": "선택한 나무의 ID (CHERRY, PINE, OAK, WILLOW, BIRCH, MAPLE, GINKGO, BAMBOO 중 하나)",
  "weeklyKeywords": ["주간키워드1", "주간키워드2", "주간키워드3"],
  "weeklySummary": "한 주를 요약하는 따뜻한 메시지 (2~3문장)",
  "treeMessage": "이번 주 당신의 마음은 [나무이름]로 자랐어요. 형태의 한 문장"
}

## 규칙
- 단순히 가장 많이 나온 감정만 보지 말고, Reason과 Insight 내용까지 종합 분석
- 감정을 좋다/나쁘다로 평가하지 않는다
- 어떤 나무든 긍정적인 의미를 담아 설명한다
- weeklySummary는 존댓말, 따뜻한 톤`;
}
