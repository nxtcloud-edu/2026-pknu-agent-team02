# 작업 단위 (Unit of Work)

> CONSTRUCTION에서 순차적으로 구현할 단위 목록.
> 한 단위를 STEP 05(코드 생성)까지 끝낸 뒤 다음 단위로 간다.
> STEP 06(빌드와 테스트)은 전체 단위 완료 후 한 번.

---

## 단위 목록

| # | 단위 이름 | 포함 Phase | CONSTRUCTION STEP |
|---|---|---|---|
| 1 | foundation | Phase 1 | 01(기능설계), 02(비기능요구), 05(코드생성) |
| 2 | home-tree | Phase 2 | 01, 05 |
| 3 | record-flow | Phase 3 | 01, 05 |
| 4 | data-storage | Phase 4 | 01, 05 |
| 5 | ai-analysis | Phase 5 | 01, 05 |
| 6 | completion-collection | Phase 6 | 01, 05 |
| 7 | calendar-polish | Phase 7 | 01, 05 |

> STEP 02(비기능 요구 / 기술 스택 결정)는 첫 단위(foundation)에서만 실행.
> STEP 03, 04는 execution-plan에서 건너뜀으로 판정됨.

---

## 단위 1: foundation

**범위**: 프로젝트 생성, 라우팅, 레이아웃, 하단 네비게이션

**포함 컴포넌트**:
- App
- Layout (Header + BottomNav)
- 빈 페이지 7개 (라우팅만)

**데이터/기능**:
- 프로젝트 초기화 (패키지, 빌드 설정)
- 페이지 라우팅 구조
- 하단 네비게이션 (홈/기록/도감)
- 글로벌 스타일 (크림/베이지/초록 테마)

**CONSTRUCTION STEP**:
- STEP 01 기능 설계: 라우팅 구조, 네비게이션 규칙
- STEP 02 비기능 요구: 기술 스택 결정 (프레임워크, 빌드도구, 상태관리)
- STEP 05 코드 생성

---

## 단위 2: home-tree

**범위**: 홈 화면, 나무 7단계 성장 UI

**포함 컴포넌트**:
- HomePage
- TreeDisplay
- DayProgress
- HomeMessage
- RecordButton / RecordComplete

**데이터/기능**:
- 나무 7단계 이미지/SVG
- Day N / 7 표시
- 오늘 기록 완료 여부에 따른 UI 전환
- "오늘도 마음에 물을 주세요" 메시지

**CONSTRUCTION STEP**:
- STEP 01 기능 설계: 나무 성장 단계 규칙, Day 진행 규칙
- STEP 05 코드 생성

---

## 단위 3: record-flow

**범위**: 감정 기록 4단계 플로우

**포함 컴포넌트**:
- RecordPage
- RecordProgress
- MomentStep
- EmotionStep (EmotionGrid + IntensitySlider)
- ReasonStep
- InsightStep

**데이터/기능**:
- 4단계 스텝 진행 UI
- 감정 8개 선택 그리드
- 강도 1~5 슬라이더
- 텍스트 입력 (Moment, Reason, Insight)
- 취소(X) 및 다음 버튼

**CONSTRUCTION STEP**:
- STEP 01 기능 설계: 입력 유효성 규칙, 단계 이동 규칙
- STEP 05 코드 생성

---

## 단위 4: data-storage

**범위**: 로컬스토리지 데이터 저장/조회

**포함 컴포넌트**:
- 데이터 레이어 (utils/hooks)
- DevTools (개발 모드 테스트 기능)

**데이터/기능**:
- DiaryEntry CRUD
- TreeCycle 관리 (생성, Day 진행, 완료)
- TreeCollection 관리
- 로컬스토리지 persist/hydrate
- 하루 1회 제한 (자정 기준)
- 개발 모드: 다음 날 이동, 테스트 데이터 생성

**CONSTRUCTION STEP**:
- STEP 01 기능 설계: 저장 규칙, 하루 제한 로직, 사이클 생명주기
- STEP 05 코드 생성

---

## 단위 5: ai-analysis

**범위**: AI API 연동, 결과 화면

**포함 컴포넌트**:
- ResultPage
- EmotionSummary
- KeywordTags
- AiMessage
- TreeGrowth

**데이터/기능**:
- Google Gemini API 호출 (일일 분석)
- AI 응답 JSON 파싱
- 분석 결과 영구 저장 (DiaryEntry.aiAnalysis)
- "오늘의 정원" 결과 화면 표시
- 나무 성장 전환 (Day N → Day N+1)

**CONSTRUCTION STEP**:
- STEP 01 기능 설계: AI 프롬프트, 응답 처리 규칙, 에러 핸들링
- STEP 05 코드 생성

---

## 단위 6: completion-collection

**범위**: 7일 완료, 나무 종류 결정, 도감

**포함 컴포넌트**:
- CompletePage (TreeReveal, WeeklySummary, HarvestButton)
- CollectionPage (TreeCard × 8)
- CollectionDetailPage (TreeInfo, WeeklyRecordList, WeeklySummarySection, DayDetailModal)

**데이터/기능**:
- 7일 완료 감지 → 주간 AI 분석 호출
- 나무 종류 결정 (감정 1:1 매핑 기반 AI 판단)
- 수확 → 도감 등록
- 새 사이클 시작
- 도감 카드 (획득/미획득)
- 도감 상세 (7일 기록 아카이브)

**CONSTRUCTION STEP**:
- STEP 01 기능 설계: 수확 로직, 도감 등록 규칙, 주간 분석 프롬프트
- STEP 05 코드 생성

---

## 단위 7: calendar-polish

**범위**: 달력/리스트 위젯, UI 마무리, 예외 처리

**포함 컴포넌트**:
- DiaryPage (CalendarWidget + DiaryList)
- 홈 화면 위젯 아이콘 (달력, 리스트)

**데이터/기능**:
- 월 달력 위젯 (기록한 날 표시)
- 일기 리스트 (해당 월 기록)
- 반응형 레이아웃 마무리
- 예외 처리 (빈 상태, 에러 UI)
- 성장 애니메이션 (가능 시)

**CONSTRUCTION STEP**:
- STEP 01 기능 설계: 달력 표시 규칙, 리스트 필터 규칙
- STEP 05 코드 생성

---

## 의존 순서

```
foundation → home-tree → record-flow → data-storage → ai-analysis → completion-collection → calendar-polish
```

각 단위는 이전 단위의 결과물(컴포넌트, 데이터 구조)에 의존한다.
한 단위를 완전히 끝낸 뒤 다음으로 넘어간다.

---

## STEP 06 빌드와 테스트

모든 단위(1~7)가 끝난 후 마지막으로 한 번 실행한다.
- 전체 빌드 확인
- 주요 플로우 수동 테스트
- 빌드 에러 수정
- `construction/build-and-test/build-and-test-summary.md` 작성
