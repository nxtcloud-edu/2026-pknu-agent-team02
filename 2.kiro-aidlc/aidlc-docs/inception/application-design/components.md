# Application Design — Components

## 1. 화면(View) 컴포넌트

### V1: ForestHome (숲 홈 화면)

| 항목 | 내용 |
|---|---|
| 역할 | 7×7 아이소메트릭 격자 표시, 나무 배치 시각화 |
| 입력 | Grid 데이터 (49칸 상태) |
| 출력 | 빈 칸 클릭 → 나무 선택 UI 열기, 나무 클릭 → DiaryView 이동 |
| 하위 요소 | GridCell(49개), TreeSelector(모달), CalendarButton |

### V2: DiaryView (일기장 화면)

| 항목 | 내용 |
|---|---|
| 역할 | 선택한 나무의 7일 일기 리스트 표시 및 작성 |
| 입력 | Tree ID → 해당 나무의 DiaryEntry 7개 |
| 출력 | 일기 저장 → 성실도 검증 → 나무 크기 갱신 |
| 하위 요소 | DiaryDayCard(7개), DiaryEditor, EmotionSelector, BackButton |

### V3: CalendarView (캘린더 화면)

| 항목 | 내용 |
|---|---|
| 역할 | 월간 캘린더 + 해당 월 일기 리스트 표시 |
| 입력 | 현재 연/월 → 해당 월의 모든 DiaryEntry |
| 출력 | 월 이동, 날짜 선택 → 일기 상세 보기 |
| 하위 요소 | MonthCalendar, DiaryList, MonthNavigator |

---

## 2. 데이터 모델

### M1: Grid

```
Grid {
  cells: Cell[7][7]
}

Cell {
  row: number (0~6)
  col: number (0~6)
  treeId: string | null
}
```

### M2: Tree

```
Tree {
  id: string (고유 식별자)
  type: "ginkgo" | "sakura" | "oak" | "star"
  size: "small" | "medium" | "large"
  plantedAt: Date (심은 날짜)
  position: { row: number, col: number }
}
```

### M3: DiaryEntry

```
DiaryEntry {
  id: string
  treeId: string (소속 나무)
  date: Date (해당 일자)
  dayIndex: number (0~6, 심은 날 기준)
  content: string | null
  emotion: "joy" | "calm" | "sad" | "angry" | "tired" | "excited" | "anxious" | null
  isValid: boolean (성실도 검증 통과 여부)
}
```

---

## 3. 공유 유틸리티

### U1: DiaryValidator (성실도 검증)

| 규칙 | 조건 |
|---|---|
| 최소 글자 수 | 공백 제거 후 ≥ 20자 |
| 최소 어절 수 | 띄어쓰기 기준 ≥ 15개 |
| 고유 어절 비율 | 고유 어절 / 전체 어절 ≥ 60% |

- 세 조건 모두 통과 → isValid = true
- 하나라도 미달 → isValid = false + 미달 항목 안내

### U2: TreeSizeCalculator (나무 크기 결정)

| 유효 작성 일수 | 크기 |
|---|---|
| 6~7일 | large |
| 4~5일 | medium |
| 0~3일 | small |

- 일기 저장 시마다 해당 나무의 유효 작성 일수를 다시 세어 크기를 갱신

### U3: StorageManager (로컬 스토리지 관리)

- Grid, Tree[], DiaryEntry[]를 JSON 직렬화하여 localStorage에 저장/로드
- 키 구조: `diary-forest-grid`, `diary-forest-trees`, `diary-forest-entries`

---

## 4. 컴포넌트 의존 흐름

```
[ForestHome]
  ├─ reads → Grid, Tree[]
  ├─ opens → TreeSelector → creates Tree + 7 DiaryEntry
  ├─ navigates → DiaryView (treeId)
  └─ navigates → CalendarView

[DiaryView]
  ├─ reads → Tree, DiaryEntry[] (해당 treeId)
  ├─ uses → DiaryValidator
  ├─ uses → TreeSizeCalculator
  └─ writes → StorageManager

[CalendarView]
  ├─ reads → DiaryEntry[] (해당 월)
  └─ displays → emotion icons on calendar

[StorageManager]
  └─ 모든 View에서 데이터 읽기/쓰기에 사용
```
