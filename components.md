# Application Design — Components

> INCEPTION STEP 06 산출물. 전체 아키텍처와 컴포넌트 구조를 정의한다.

## 전체 아키텍처

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (브라우저)                   │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  UI      │  │ Canvas   │  │  AI Judge        │  │
│  │  Module  │  │ Module   │  │  Module          │  │
│  │          │  │          │  │                  │  │
│  │ - Lobby  │  │ - Draw   │  │ - Canvas→Image   │  │
│  │ - Game   │  │ - Replay │  │ - Gemini API call│  │
│  │ - Result │  │ - Tools  │  │ - Result parse   │  │
│  └────┬─────┘  └────┬─────┘  └────────┬─────────┘  │
│       │              │                 │            │
│       └──────────────┼─────────────────┘            │
│                      │                              │
│              ┌───────┴───────┐                      │
│              │ Socket Client │                      │
│              └───────┬───────┘                      │
└──────────────────────┼──────────────────────────────┘
                       │ WebSocket
┌──────────────────────┼──────────────────────────────┐
│              ┌───────┴───────┐                      │
│              │ Socket Server │                      │
│              └───────┬───────┘                      │
│                      │                              │
│  ┌──────────┐  ┌────┴─────┐  ┌──────────────────┐  │
│  │  Room    │  │  Game    │  │  Score           │  │
│  │  Manager │  │  Engine  │  │  Manager         │  │
│  │          │  │          │  │                  │  │
│  │ - create │  │ - turns  │  │ - calculate      │  │
│  │ - join   │  │ - timer  │  │ - ranking        │  │
│  │ - leave  │  │ - topics │  │ - winner         │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
│                                                     │
│                    SERVER (Node.js)                  │
└─────────────────────────────────────────────────────┘
```

## 서버 컴포넌트

### 1. Room Manager

| 항목 | 내용 |
|---|---|
| 책임 | 방 생성, 입장, 퇴장, 방 목록 관리 |
| 입력 | 소켓 이벤트 (room:create, room:join) |
| 출력 | 방 상태 브로드캐스트 (room:updated) |
| 상태 | rooms: Map<roomCode, Room> |

### 2. Game Engine

| 항목 | 내용 |
|---|---|
| 책임 | 턴 진행, 타이머, 주제 배정, 라운드 관리 |
| 입력 | game:start, round:timeup |
| 출력 | round:start, round:result, game:end |
| 상태 | 현재 라운드, 남은 시간, 그리는 사람, 주제 |

### 3. Score Manager

| 항목 | 내용 |
|---|---|
| 책임 | 승패 판정, 점수 집계, 우승자 결정 |
| 입력 | 사람 추측 결과 + AI 판정 결과 |
| 출력 | round:result 에 포함될 승패 정보 |
| 규칙 | 사람O+AI X=승, 사람O+AI O=패, 사람X+AI X=무, 사람X+AI O=패 |

## 클라이언트 컴포넌트

### 4. UI Module

| 항목 | 내용 |
|---|---|
| 책임 | 화면 전환, 사용자 인터랙션, 상태 표시 |
| 페이지 | Lobby(방 생성/입장) → Waiting(대기) → Game(게임) → Result(결과) |
| 입력 | 사용자 클릭/입력 + 서버 이벤트 |
| 출력 | 소켓 이벤트 발송 + 화면 갱신 |

### 5. Canvas Module

| 항목 | 내용 |
|---|---|
| 책임 | 그리기 도구, 캔버스 관리, 드로잉 데이터 전송/수신 |
| 기능 | 펜(색상, 굵기), 지우개, 전체 지우기, 터치 지원 |
| 입력 | 마우스/터치 이벤트 (그리는 사람), 소켓 데이터 (보는 사람) |
| 출력 | draw:stroke 이벤트, canvas→base64 변환 (라운드 종료 시) |

### 6. AI Judge Module

| 항목 | 내용 |
|---|---|
| 책임 | 캔버스를 이미지로 변환, Gemini API 호출, 결과 파싱 |
| 호출 시점 | 라운드 종료 시 1회 |
| 입력 | 캔버스 이미지 (base64) |
| 출력 | AI가 추측한 답 (문자열) |
| 위치 | 서버에서 호출 (API 키 보호) |

## 데이터 흐름

```
1. 방 생성/입장
   Player → room:create/join → RoomManager → room:updated → All Players

2. 게임 시작
   Host → game:start → GameEngine → round:start(topic) → Drawer only
                                   → round:start(no topic) → Guessers

3. 그리기 중
   Drawer → draw:stroke → Server 중계 → All Other Players (캔버스에 표시)
   Guesser → guess:submit → GameEngine → guess:correct (맞으면) / guess:message (틀리면)

4. 라운드 종료
   Timer ends → Server가 Canvas 이미지 요청 → Client가 base64 전송
   → Server가 Gemini API 호출 → AI 판정 결과
   → ScoreManager 승패 계산
   → round:result → All Players

5. 게임 종료
   마지막 라운드 결과 후 → game:end(scores, winner) → All Players
```

## 외부 의존성

| 의존성 | 용도 | 호출 주체 |
|---|---|---|
| Gemini API (2.0 Flash) | 그림 판정 | 서버 (API 키 보호) |
| Socket.io | 실시간 양방향 통신 | 서버 + 클라이언트 |

## 폴더 구조 (예상)

```
project-root/
├── server/
│   ├── index.js          (Express + Socket.io 서버 진입점)
│   ├── roomManager.js    (방 관리)
│   ├── gameEngine.js     (턴/타이머/주제)
│   ├── scoreManager.js   (점수/승패)
│   ├── aiJudge.js        (Gemini API 호출)
│   ├── topics.js         (345개 주제 목록)
│   └── config.js         (설정값: 시간, 인원, confidence)
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── ui/           (페이지 컴포넌트)
│   │   ├── canvas/       (드로잉 모듈)
│   │   ├── socket/       (소켓 클라이언트 래퍼)
│   │   └── App.js
│   └── package.json
├── package.json
└── README.md
```
