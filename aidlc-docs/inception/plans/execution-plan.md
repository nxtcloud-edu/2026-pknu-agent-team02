# STEP 05 실행 계획 (Execution Plan)

## 목표

INCEPTION 나머지 단계(STEP 06~07)와 CONSTRUCTION 단계의 실행 범위를 결정한다.

---

## Intent Analysis 기반 판정

| Attribute | Value | 판정 |
|---|---|---|
| Complexity | Moderate | STEP 06(앱 설계), STEP 07(작업 단위 쪼개기) 실행 |
| Requirements Depth | Standard | CONSTRUCTION 조건 단계 선별 실행 |

---

## INCEPTION 나머지 단계

| STEP | 실행 여부 | 사유 |
|---|---|---|
| 06 애플리케이션 설계 | 실행 | 화면 5개 + AI API + 로컬스토리지 구조 정리 필요 |
| 07 작업 단위 쪼개기 | 실행 | 단위별 순서대로 구현하기 위해 필요 |

---

## CONSTRUCTION 조건 단계 판정

| STEP | 실행 여부 | 사유 |
|---|---|---|
| 01 기능 설계 | 실행 | 비즈니스 규칙(7일 사이클, 감정 매핑, 하루 1회 제한)이 명확히 정리되어야 함 |
| 02 비기능 요구 | 실행 | 기술 스택(프레임워크, 빌드도구)을 여기서 결정 |
| 03 비기능 설계 | 건너뜀 | MVP 단일 앱이므로 복잡한 패턴 설계 불필요 |
| 04 인프라 설계 | 건너뜀 | 로컬스토리지 + Vercel 배포만으로 인프라 결정이 단순 |
| 05 코드 생성 | 항상 실행 | — |
| 06 빌드와 테스트 | 항상 실행 | — |

---

## 개발 순서 (Phase)

requirements.md와 UI 이미지 기반으로, 아래 순서로 개발한다.

### Phase 1: 프로젝트 기반 + 페이지 구조
- 프로젝트 생성, 라우팅, 하단 네비게이션

### Phase 2: 홈 화면 + 나무 성장 UI
- 나무 7단계 이미지/SVG, Day 표시, 기록하기 버튼

### Phase 3: 감정 기록 플로우
- Moment → Emotion → Reason → Insight 4단계 UI
- 감정 선택 그리드 + 강도 슬라이더

### Phase 4: 데이터 저장
- 로컬스토리지 CRUD
- DiaryEntry, TreeCycle, TreeCollection 데이터 구조

### Phase 5: AI 연동
- Google Gemini API 연결
- 일일 분석 + 7일 종합 분석
- 결과 영구 저장

### Phase 6: 7일 완료 + 도감
- 나무 종류 결정, 수확, 도감 등록
- 도감 페이지 + 상세 아카이브

### Phase 7: 달력/리스트 위젯 + UI 마무리
- 달력 위젯, 일기 리스트 위젯
- 개발 모드 테스트 기능
- 반응형 + 예외 처리

---

## 체크리스트

- [x] INCEPTION 나머지 단계 실행 여부 판정
- [x] CONSTRUCTION 조건 단계 판정
- [x] 개발 순서(Phase) 정리
