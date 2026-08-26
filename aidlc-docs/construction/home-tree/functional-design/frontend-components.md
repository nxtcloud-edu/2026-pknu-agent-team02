# home-tree — Frontend Components

## TreeDisplay

- 현재 Day에 해당하는 나무 이모지를 크게 표시 (text-8xl)
- Day별 이모지 매핑은 상수에서 가져옴

## DayProgress

- "Day N / 7" 텍스트
- 7칸 진행 바 (채워진 칸: 초록, 빈 칸: 회색)

## HomeMessage

- 상단 메시지: "오늘도 마음에 물을 주세요."
- 하단 메시지: "기록 완료 후 7일차가 되면..."

## RecordButton

- 미완료 시: 초록색 "오늘 기록하기" 버튼 → /record 이동
- 완료 시: "오늘의 기록을 완료했어요 🌱" 비활성 상태
