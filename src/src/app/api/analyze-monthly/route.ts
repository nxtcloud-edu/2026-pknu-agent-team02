import { NextRequest, NextResponse } from 'next/server';

function stripJsonWrapper(text: string): string {
  let cleaned = text.replace(/<think>[\s\S]*?<\/think>/g, '');
  cleaned = cleaned.replace(/```json\s*/g, '').replace(/```\s*/g, '');
  return cleaned.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { entries, year, month } = body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 500 }
      );
    }

    const entriesSummary = entries
      .map((e: { date: string; emotion: string; emotionIntensity: number; moment: string; reason: string; insight: string }) =>
        `${e.date}: 감정=${e.emotion}(강도${e.emotionIntensity}), 순간=${e.moment}, 이유=${e.reason}, 인사이트=${e.insight}`
      )
      .join('\n');

    const userPrompt = `${year}년 ${month}월의 감정 기록을 분석해주세요.

## 이번 달 기록 (${entries.length}건)
${entriesSummary}

## 반환 형식 (JSON만 반환, 다른 텍스트 없이)
{
  "monthlySummary": "이번 달 전체 감정을 요약하는 따뜻한 2~3문장 메시지",
  "dominantEmotion": "이번 달 가장 많이 느낀 감정 (한국어)",
  "emotionDistribution": [
    { "emotion": "감정이름", "count": 횟수, "percentage": 비율(소수점없는정수) }
  ],
  "monthlyKeywords": ["키워드1", "키워드2", "키워드3"],
  "advice": "이번 달을 바탕으로 한 짧은 응원 메시지"
}

## 규칙
- 감정을 좋다/나쁘다로 평가하지 않는다
- 모든 감정은 가치 있는 경험이다
- emotionDistribution은 기록에 나타난 감정별로 정리 (많은 순서대로)
- monthlySummary와 advice는 존댓말, 따뜻한 톤으로 작성
- 기록이 없으면 빈 배열과 "아직 기록이 없어요" 메시지 반환`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: 'You are a JSON-only response bot. Return ONLY valid JSON. No markdown, no code blocks, no thinking tags, no explanation. Just pure JSON.',
          },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `Groq API error: ${errorText}` }, { status: 500 });
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;

    if (!rawContent) {
      return NextResponse.json({ error: 'No response from Groq' }, { status: 500 });
    }

    const cleaned = stripJsonWrapper(rawContent);
    const result = JSON.parse(cleaned);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Monthly analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze' }, { status: 500 });
  }
}
