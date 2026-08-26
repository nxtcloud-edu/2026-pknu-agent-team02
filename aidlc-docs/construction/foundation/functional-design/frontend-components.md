# foundation — Frontend Components

## 컴포넌트 목록

### App (루트)

- 역할: 라우터 설정, 글로벌 Context 제공
- 자식: Layout 또는 전체화면 페이지

### Layout

- 역할: 네비게이션 포함 페이지의 공통 래퍼
- 구성: Header + children + BottomNav
- 조건: showNav=true인 페이지에서만 사용

### Header

- 역할: 상단 바
- 구성:
  - 왼쪽: 달력 아이콘 (클릭 → /diary)
  - 중앙: "마음 나무" 텍스트
  - 오른쪽: 리스트 아이콘 (클릭 → /diary)
- 높이: 56px
- 배경: 투명 또는 페이지 배경과 동일

### BottomNav

- 역할: 하단 탭 네비게이션
- 탭 3개:
  - 홈 (🏠) → `/`
  - 기록 (📅) → `/diary`
  - 도감 (🌳) → `/collection`
- 활성 탭: 초록색 아이콘 + 텍스트
- 비활성 탭: 회색 아이콘 + 텍스트
- 높이: 64px
- 배경: 흰색 + 상단 border 또는 그림자
- safe-area-inset-bottom 고려

### 빈 페이지 (Placeholder)

- HomePage: "/" → 단위 2에서 구현
- RecordPage: "/record" → 단위 3에서 구현
- ResultPage: "/result" → 단위 5에서 구현
- CompletePage: "/complete" → 단위 6에서 구현
- DiaryPage: "/diary" → 단위 7에서 구현
- CollectionPage: "/collection" → 단위 6에서 구현
- CollectionDetailPage: "/collection/:cycleId" → 단위 6에서 구현

각 빈 페이지는 페이지 이름만 표시하는 Placeholder로 만든다.

## 라우팅 구조

```
/                    → HomePage        (Layout 포함)
/diary               → DiaryPage       (Layout 포함)
/collection          → CollectionPage  (Layout 포함)
/collection/:cycleId → CollectionDetailPage (Layout 포함)
/record              → RecordPage      (Layout 없음, 전체 화면)
/result              → ResultPage      (Layout 없음, 전체 화면)
/complete            → CompletePage    (Layout 없음, 전체 화면)
```
