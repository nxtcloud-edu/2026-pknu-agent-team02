# Execution Plan

> INCEPTION STEP 05 산출물. CONSTRUCTION에서 어떤 단계를 돌릴지, 조건 단계를 할지 말지 여기서 정한다.

## 판정 근거

- Complexity: Moderate
- Requirements Depth: Standard
- 기존 코드: 없음 (greenfield)
- 일정 제약: 하루 안에 완성 + 배포

## CONSTRUCTION 조건 단계 판정

| STEP | 단계 | 실행 여부 | 사유 |
|---|---|---|---|
| 01 | 기능 설계 | ✅ 실행 | 멀티플레이어 게임이라 업무 규칙(턴 관리, 승패 판정)이 명확해야 함 |
| 02 | 비기능 요구 | ✅ 실행 | 기술 스택을 여기서 확정 (Node.js, Socket.io, React 등) |
| 03 | 비기능 설계 | ❌ 건너뜀 | 단순 웹앱, 복잡한 패턴 불필요. 하루 일정에 맞지 않음 |
| 04 | 인프라 설계 | ❌ 건너뜀 | Vercel + Railway 무료 티어로 충분. 별도 설계 불필요 |
| 05 | 코드 생성 | ✅ 항상 | — |
| 06 | 빌드와 테스트 | ✅ 항상 | — |

## INCEPTION 남은 단계 판정

| STEP | 단계 | 실행 여부 | 사유 |
|---|---|---|---|
| 06 | 애플리케이션 설계 | ✅ 실행 | 4명 분담을 위해 컴포넌트와 인터페이스 정의 필수 |
| 07 | 작업 단위 쪼개기 | ✅ 실행 | 4명에게 나눠줄 단위 정의 필수 |

## 전체 실행 순서

```
INCEPTION (지금 여기)
  ✅ STEP 01 워크스페이스 파악 — 완료
  — STEP 02 기존 코드 역분석 — 건너뜀
  ✅ STEP 03 요구사항 분석 — 완료
  — STEP 04 유저 스토리 — 건너뜀
  🔄 STEP 05 실행 계획 수립 — 지금
  ☐ STEP 06 애플리케이션 설계
  ☐ STEP 07 작업 단위 쪼개기

CONSTRUCTION (팀원 각자)
  단위 1: 게임 서버 → STEP 01, 02, 05, 06
  단위 2: AI 판정 → STEP 01, 02, 05, 06
  단위 3: 캔버스 → STEP 01, 02, 05, 06
  단위 4: UI → STEP 01, 02, 05, 06
```

## 소켓 이벤트 규약 (인터페이스 약속)

이것만 4명이 합의하면 각자 독립 개발 가능:

```
Client → Server:
  'room:create'     → { playerName }           → { roomCode }
  'room:join'       → { roomCode, playerName } → { players[] }
  'game:start'      → { }                      → broadcast
  'draw:stroke'     → { x, y, prevX, prevY, color, width }
  'draw:clear'      → { }
  'guess:submit'    → { guess }
  'round:timeup'    → { canvasImage (base64) }

Server → Client:
  'room:updated'    → { players[], host }
  'game:started'    → { }
  'round:start'     → { drawerId, topic (그리는 사람에게만) }
  'draw:stroke'     → { x, y, prevX, prevY, color, width } (중계)
  'draw:clear'      → { }
  'guess:correct'   → { playerName }
  'guess:message'   → { playerName, message }
  'ai:judging'      → { } (판정 중 표시)
  'round:result'    → { topic, humanGuessed, aiGuessed, aiAnswer, winner }
  'game:end'        → { scores[], winner }
```

## 질문

없음 — 요구사항이 충분히 구체적이고, 기술 결정은 CONSTRUCTION STEP 02에서 확정한다.
