import { NextRequest, NextResponse } from 'next/server';
import { getDailyAnalysisPrompt } from '@/prompts/daily-analysis';

function stripJsonWrapper(text: string): string {
  // Remove <think>...</think> tags
  let cleaned = text.replace(/<think>[\s\S]*?<\/think>/g, '');
  // Remove ```json ... ``` code blocks
  cleaned = cleaned.replace(/```json\s*/g, '').replace(/```\s*/g, '');
  return cleaned.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { moment, emotion, emotionIntensity, reason, insight } = body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 500 }
      );
    }

    const userPrompt = getDailyAnalysisPrompt({
      moment,
      emotion,
      emotionIntensity,
      reason,
      insight,
    });

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
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Groq API error: ${errorText}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;

    if (!rawContent) {
      return NextResponse.json(
        { error: 'No response from Groq' },
        { status: 500 }
      );
    }

    const cleaned = stripJsonWrapper(rawContent);
    const result = JSON.parse(cleaned);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Daily analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze' },
      { status: 500 }
    );
  }
}
