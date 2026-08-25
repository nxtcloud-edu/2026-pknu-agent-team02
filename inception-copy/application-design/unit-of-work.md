# Unit of Work

## 단위 목록

| # | 단위 이름 | 범위 | 의존 |
|---|---|---|---|
| 1 | core | 데이터 모델, StorageManager, DiaryValidator, TreeSizeCalculator | 없음 |
| 2 | forest-home | ForestHome 화면 (7×7 격자, 나무 표시, TreeSelector) | core |
| 3 | diary-view | DiaryView 화면 (7일 일기 리스트, 작성/저장, 감정 선택) | core |
| 4 | calendar-view | CalendarView 화면 (월간 캘린더, 일기 리스트, 감정 아이콘) | core |

---

## 단위 1: core

**포함 컴포넌트:**
- M1 Grid, M2 Tree, M3 DiaryEntry (데이터 모델/타입)
- U1 DiaryValidator (성실도 검증 로직)
- U2 TreeSizeCalculator (나무 크기 결정 로직)
- U3 StorageManager (localStorage CRUD)

**산출물:** 순수 로직 모듈. UI 없음.

---

## 단위 2: forest-home

**포함 컴포넌트:**
- V1 ForestHome (메인 화면)
- GridCell (격자 칸 하나)
- TreeSelector (나무 종류 선택 모달)
- CalendarButton (캘린더 화면 이동 버튼)

**의존:** core (Grid, Tree 데이터 읽기/쓰기)

---

## 단위 3: diary-view

**포함 컴포넌트:**
- V2 DiaryView (일기장 화면)
- DiaryDayCard (하루 일기 칸)
- DiaryEditor (일기 작성 에디터)
- EmotionSelector (감정 7가지 선택)
- BackButton (홈으로 돌아가기)

**의존:** core (DiaryEntry 읽기/쓰기, DiaryValidator, TreeSizeCalculator)

---

## 단위 4: calendar-view

**포함 컴포넌트:**
- V3 CalendarView (캘린더 화면)
- MonthCalendar (월간 달력 + 감정 아이콘)
- DiaryList (해당 월 일기 목록)
- MonthNavigator (이전/다음 월 이동)

**의존:** core (DiaryEntry 읽기)

---

## 실행 순서

```
core → forest-home → diary-view → calendar-view → 빌드와 테스트
```

각 단위는 CONSTRUCTION STEP 01(기능 설계) → 02(비기능 요구) → 05(코드 생성) 순으로 진행한다.
STEP 03(비기능 설계), STEP 04(인프라 설계)는 execution-plan에 따라 건너뛴다.
