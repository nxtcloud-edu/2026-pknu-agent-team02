# Unit of Work — 작업 단위 정의

> INCEPTION STEP 07 산출물. 4명의 팀원에게 나눌 작업 단위.
> 각 팀원은 자기 단위의 CONSTRUCTION(기능 설계 → 코드 생성)을 수행한다.

---

## 단위 1: game-server (팀원 A)

### 담당 컴포넌트
- RoomManager
- GameEngine
- ScoreManager

### 파일 목록
```
server/
├── index.js          (Express + Socket.io 진입점)
├── roomManager.js    (방 CRUD)
├── gameEngine.js     (턴, 타이머, 주제 배정)
├── scoreManager.js   (승패 판정, 점수 집계)
├── topics.js         (345개 주제 목록 — DoodleNet 카테고리)
└── config.js         (ROUND_TIME=90, MAX_PLAYERS=5, MIN_PLAYERS=2)
```

### 핵심 책임
1. 방 생성 시 4자리 코드 발급, 2~5명 관리
2. 게임 시작 → 플레이어 순서 셔플 → 라운드별 그리는 사람 지정
3. 90초 타이머 관리, 종료 시 클라이언트에 캔버스 이미지 요청
4. 추측 채팅 수신 → 정답 비교 → 맞으면 broadcast
5. 라운드 종료 시 AI 판정 결과와 사람 추측 결과 조합하여 승패 판정
6. 전체 라운드 종료 시 최종 순위 발표

### 의존성
- 없음 (가장 먼저 시작, 다른 단위가 여기에 의존)

### 우선 작업 (첫 1~2시간)
- 소켓 서버 뼈대 (방 생성/입장 + 이벤트 중계)만 먼저 push
- 나머지 단위가 이걸 기반으로 연결 테스트

---

## 단위 2: ai-judge (팀원 B)

### 담당 컴포넌트
- AI Judge (서버 모듈)

### 파일 목록
```
server/
└── aiJudge.js        (Gemini API 호출 + 결과 파싱)
```

### 핵심 책임
1. 캔버스 이미지(base64)를 받아 Gemini API에 전송
2. 프롬프트: "이 손그림이 무엇을 그린 것인지 한 단어로 맞혀봐. 345개 카테고리 중에서 골라."
3. Gemini 응답 파싱 → 정답과 비교 (대소문자 무시, 유사어 처리)
4. 판정 결과(맞힘/못 맞힘 + AI의 추측)를 GameEngine에 반환

### 의존성
- 단위 1의 GameEngine이 aiJudge를 호출하는 구조
- 하지만 독립 테스트 가능 (이미지 파일 → API 호출 → 결과 확인)

### 추가 작업
- Gemini API 키 관리 (환경변수)
- 유사어 매핑 테이블 (cat/kitty, car/automobile 등)
- rate limit 대응 (무료 티어 분당 15회 제한)

---

## 단위 3: canvas (팀원 C)

### 담당 컴포넌트
- Canvas Module

### 파일 목록
```
client/src/canvas/
├── DrawingCanvas.js    (캔버스 컴포넌트)
├── tools.js            (펜, 지우개, 색상, 굵기)
├── strokeSync.js       (소켓으로 stroke 데이터 전송/수신)
└── canvasExport.js     (캔버스 → base64 변환)
```

### 핵심 책임
1. 그리기 도구: 펜(검정, 굵기 조절), 지우개, 전체 지우기
2. 마우스 + 터치 이벤트 처리 (PC 우선, 모바일 지원)
3. 그리는 사람: stroke 데이터를 실시간으로 소켓 전송
4. 보는 사람: 소켓으로 받은 stroke를 캔버스에 재현
5. 라운드 종료 시: 캔버스를 base64 이미지로 변환하여 서버에 전송

### 의존성
- 소켓 연결 (단위 1 서버 필요)
- 하지만 독립 테스트 가능 (로컬에서 그리기 기능만 확인)

### 기술 노트
- 흰 배경 + 검은 선 (Gemini 인식률 최적화)
- 기본 strokeWeight: 8~16px
- 캔버스 크기: 400x400 (반응형으로 조절)

---

## 단위 4: ui (팀원 D)

### 담당 컴포넌트
- UI Module
- Socket Client (래퍼)

### 파일 목록
```
client/src/
├── ui/
│   ├── LobbyPage.js     (방 생성/입장 화면)
│   ├── WaitingPage.js    (대기실 — 플레이어 목록, 시작 버튼)
│   ├── GamePage.js       (게임 화면 — 캔버스 + 채팅 + 타이머)
│   ├── ResultPage.js     (라운드 결과 + 최종 순위)
│   └── components/       (공통 컴포넌트: Timer, PlayerList, ChatBox)
├── socket/
│   └── socketClient.js   (Socket.io 클라이언트 래퍼)
└── App.js                (라우팅/상태 관리)
```

### 핵심 책임
1. 페이지 전환: Lobby → Waiting → Game → Result → (다시 Lobby)
2. 소켓 이벤트에 따라 화면 상태 갱신
3. 채팅/추측 입력 UI + 정답 시 피드백
4. 타이머 표시 (서버 시간 기준 동기화)
5. AI 판정 결과 공개 연출 (드라마틱하게)
6. 최종 순위 화면

### 의존성
- 소켓 이벤트 규약 (execution-plan.md에 정의됨)
- 캔버스 컴포넌트 (단위 3에서 import)
- 독립 테스트: 더미 데이터로 화면 전환/레이아웃 확인 가능

---

## 단위 간 의존성 맵

```
단위 1 (server) ←── 단위 2 (ai-judge) 가 서버에 포함됨
       ↑
       │ 소켓 연결
       │
단위 3 (canvas) ──→ 단위 4 (ui) 가 canvas를 import
단위 4 (ui) ──→ 단위 1 (server) 에 소켓 연결
```

## 작업 순서 타임라인

```
시간    단위1(A)           단위2(B)         단위3(C)         단위4(D)
────────────────────────────────────────────────────────────────────
0~2h   소켓 서버 뼈대     Gemini 연동      캔버스 로컬      UI 목업
       (방+이벤트중계)    독립 테스트       그리기 완성      페이지 전환
       → push                                              
                                                           
2~4h   게임 로직         유사어 매핑       stroke 전송      채팅/타이머
       (턴/타이머/점수)  에러 핸들링       캔버스 export    결과 화면
                                                           
4~6h   ─────────── 통합 테스트 + 버그 수정 ───────────────
                                                           
6~7h   ─────────── 배포 (Vercel + Railway) ───────────────
```

## 통합 테스트 방법

1. A가 서버를 Railway에 배포 (또는 로컬 ngrok)
2. B/C/D가 각자 파트를 서버에 연결
3. 4명이 동시 접속하여 게임 1판 플레이
4. 확인 사항:
   - 방 생성/입장 정상
   - 그림이 다른 플레이어에게 보이는지
   - 채팅 추측 + 정답 판정
   - 라운드 종료 → AI 판정 → 승패 표시
   - 게임 종료 → 최종 순위
