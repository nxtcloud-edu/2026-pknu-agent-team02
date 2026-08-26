# 애플리케이션 설계: Mood Tree

---

## 1. 화면(페이지) 목록

| # | 화면 | 경로 | 설명 |
|---|---|---|---|
| 1 | 홈 | `/` | 나무 성장 메인, 달력·리스트 위젯 진입 |
| 2 | 감정 기록 | `/record` | Moment → Emotion → Reason → Insight 4단계 |
| 3 | 오늘의 결과 | `/result` | AI 분석 결과 + 나무 성장 표시 |
| 4 | 나무 완성 | `/complete` | 7일 완료 시 나무 종류 공개 + 수확 |
| 5 | 기록 (달력+리스트) | `/diary` | 달력 뷰 + 해당 월 일기 리스트 |
| 6 | 도감 | `/collection` | 8종 나무 카드 목록 |
| 7 | 도감 상세 | `/collection/:cycleId` | 나무 상세 + 7일 기록 아카이브 |

---

## 2. 화면 간 네비게이션 흐름

```
[홈] ─── "오늘 기록하기" ──→ [감정 기록]
  │                              │ (4단계 완료)
  │                              ▼
  │                         [오늘의 결과]
  │                              │ (Day < 7)
  │                              ▼
  │◀──── "홈으로" ──────────────┘
  │
  │                         [오늘의 결과]
  │                              │ (Day = 7)
  │                              ▼
  │                         [나무 완성]
  │                              │ "나무 수확하기"
  │                              ▼
  │◀──── 도감 등록 후 홈 ───────┘
  │
  ├─── 달력 위젯 아이콘 ──→ [기록 (달력+리스트)]
  ├─── 리스트 위젯 아이콘 ──→ [기록 (달력+리스트)]
  │
  └─── 하단 네비게이션
         ├── 홈 → [홈]
         ├── 기록 → [기록 (달력+리스트)]
         └── 도감 → [도감] → 카드 클릭 → [도감 상세]
```

---

## 3. 주요 컴포넌트 트리

```
App
├── Layout
│   ├── Header (서비스명, 위젯 아이콘들)
│   └── BottomNav (홈, 기록, 도감)
│
├── HomePage
│   ├── TreeDisplay (현재 Day에 맞는 나무 이미지)
│   ├── DayProgress (Day N / 7)
│   ├── HomeMessage ("오늘도 마음에 물을 주세요")
│   ├── RecordButton / RecordComplete
│   └── DevTools (개발 모드 전용)
│
├── RecordPage
│   ├── RecordProgress (탭 + 단계 번호)
│   ├── MomentStep (텍스트 입력)
│   ├── EmotionStep
│   │   ├── EmotionGrid (8개 감정 선택)
│   │   └── IntensitySlider (1~5)
│   ├── ReasonStep (텍스트 입력)
│   └── InsightStep (텍스트 입력)
│
├── ResultPage
│   ├── EmotionSummary (핵심 감정 + 이모지)
│   ├── KeywordTags (해시태그)
│   ├── AiMessage ("AI 마음 거울")
│   └── TreeGrowth (성장 전환 표시)
│
├── CompletePage
│   ├── TreeReveal (나무 종류 공개)
│   ├── WeeklySummary (주간 키워드 + 메시지)
│   └── HarvestButton ("나무 수확하기")
│
├── DiaryPage
│   ├── CalendarWidget (월 달력 + 기록 표시)
│   └── DiaryList (해당 월 기록 목록)
│
├── CollectionPage
│   └── TreeCard × 8 (획득/미획득)
│
└── CollectionDetailPage
    ├── TreeInfo (이름, 영문명, 이미지, 수확일)
    ├── WeeklyRecordList (7일 감정 리스트)
    ├── WeeklySummarySection (AI 총평)
    └── DayDetailModal (날짜별 상세)
```

---

## 4. 데이터 모델

### DiaryEntry

| 필드 | 타입 | 설명 |
|---|---|---|
| id | string (UUID) | 고유 식별자 |
| date | string (YYYY-MM-DD) | 기록 날짜 |
| moment | string | Moment 텍스트 |
| emotion | string | 선택한 감정 (기쁨, 편안함, ...) |
| emotionIntensity | number (1~5) | 감정 강도 |
| reason | string | Reason 텍스트 |
| insight | string | Insight 텍스트 |
| aiAnalysis | AiDailyResult | AI 일일 분석 결과 (영구 저장) |
| treeCycleId | string | 소속 TreeCycle ID |

### AiDailyResult

| 필드 | 타입 | 설명 |
|---|---|---|
| mainEmotion | string | AI가 판단한 핵심 감정 |
| keywords | string[] | 키워드 2~3개 |
| reasonSummary | string | 감정 발생 이유 요약 |
| insightSummary | string | 자기이해 요약 |
| dailyMessage | string | 오늘의 메시지 |

### TreeCycle

| 필드 | 타입 | 설명 |
|---|---|---|
| id | string (UUID) | 고유 식별자 |
| startDate | string (YYYY-MM-DD) | 사이클 시작일 |
| currentDay | number (1~7) | 현재 Day |
| completed | boolean | 7일 완료 여부 |
| harvested | boolean | 수확 여부 |
| treeType | string | null | 완성 시 결정된 나무 종류 |
| aiWeeklyResult | AiWeeklyResult | null | AI 주간 분석 결과 |

### AiWeeklyResult

| 필드 | 타입 | 설명 |
|---|---|---|
| treeType | string | 결정된 나무 (PINE, CHERRY, ...) |
| weeklyKeywords | string[] | 주간 키워드 |
| weeklySummary | string | 주간 요약 메시지 |
| treeMessage | string | 나무 결정 메시지 |

### TreeCollection

| 필드 | 타입 | 설명 |
|---|---|---|
| treeType | string | 나무 종류 |
| unlocked | boolean | 획득 여부 |
| unlockedAt | string | null | 최초 획득 날짜 |
| count | number | 획득 횟수 |
| cycleIds | string[] | 관련 사이클 ID 목록 |

---

## 5. 나무 8종 매핑

| 감정 | 나무 | 영문 코드 | 이모지 |
|---|---|---|---|
| 기쁨 | 벚나무 | CHERRY | 🌸 |
| 편안함 | 소나무 | PINE | 🌲 |
| 뿌듯함 | 참나무 | OAK | 🌳 |
| 슬픔 | 버드나무 | WILLOW | 🌿 |
| 불안 | 자작나무 | BIRCH | 🌾 |
| 화남 | 단풍나무 | MAPLE | 🍁 |
| 아쉬움 | 은행나무 | GINKGO | 💛 |
| 무덤덤함 | 대나무 | BAMBOO | 🎋 |

---

## 6. AI API 인터페이스

### 일일 분석 요청

```
입력: { moment, emotion, emotionIntensity, reason, insight }
출력: AiDailyResult (JSON)
```

### 주간 분석 요청

```
입력: DiaryEntry[] (7개)
출력: AiWeeklyResult (JSON)
```

- Google Gemini API 사용
- API 키는 환경변수 또는 서버사이드 라우트로 보호
- 응답은 JSON 형식 강제 (프롬프트에서 지정)

---

## 7. 로컬스토리지 키 구조

| 키 | 값 | 설명 |
|---|---|---|
| `moodtree_entries` | DiaryEntry[] | 전체 일기 목록 |
| `moodtree_cycles` | TreeCycle[] | 전체 나무 사이클 |
| `moodtree_collection` | TreeCollection[] | 도감 상태 |
| `moodtree_active_cycle` | string | 현재 활성 사이클 ID |

---

## 8. 상태 관리 구조

- 전역 상태: React Context 또는 Zustand (CONSTRUCTION STEP 02에서 결정)
- 주요 상태:
  - `activeCycle`: 현재 진행 중인 TreeCycle
  - `todayEntry`: 오늘 기록 (null이면 미기록)
  - `entries`: 전체 DiaryEntry 배열
  - `collection`: TreeCollection 배열
- 로컬스토리지 동기화: 상태 변경 시 자동 persist
