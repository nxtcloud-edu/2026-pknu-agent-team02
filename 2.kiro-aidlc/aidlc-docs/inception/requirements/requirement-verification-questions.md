# 요구사항 검증 질문

> `spec.md` 에 없는 것만 묻습니다. 답변 후 `requirements.md` 를 완성합니다.

---

## Q1. 바둑판 격자 크기

홈 화면의 바둑판(숲)은 몇 × 몇 칸으로 구성하나요?

A) 5×5 (최대 25그루)
B) 7×7 (최대 49그루)
C) 10×10 (최대 100그루)
D) 사용자가 확장할 수 있는 무한 격자
E) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Q2. 일주일 기준

"나무를 클릭하면 일주일짜리 일기장 리스트"에서, 이 일주일은 어떻게 결정되나요?

A) 나무를 심은(칸을 클릭한) 시점부터 7일
B) 해당 주의 월요일~일요일(캘린더 위크)
C) 해당 주의 일요일~토요일
D) 사용자가 시작 요일을 설정
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Q3. 감정 표시 종류

캘린더에 감정 아이콘으로 표시한다고 하셨는데, 선택 가능한 감정의 종류는 몇 가지로 할까요?

A) 5가지 (기쁨, 평온, 슬픔, 화남, 피곤)
B) 7가지 (위 5가지 + 설렘, 불안)
C) 사용자가 직접 이모지를 선택
D) 세 번째 레퍼런스 이미지에 나온 아이콘 그대로 (꽃/새싹 등 식물 모티브)
E) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Q4. 데이터 저장 방식

일기 데이터는 어디에 저장하나요?

A) 브라우저 로컬 스토리지 (서버 없이 단일 기기)
B) 백엔드 서버 + 데이터베이스 (계정/로그인 포함)
C) 파일 기반 (JSON/마크다운 파일로 로컬 저장)
D) 일단 로컬 스토리지로 시작하고 나중에 서버 추가
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Q5. 사용자 범위

이 앱은 1인 사용(본인만 쓰는 개인 도구)인가요, 여러 사용자가 각자 계정으로 쓰는 서비스인가요?

A) 1인 사용 (로그인 없음, 내 브라우저에서만)
B) 다중 사용자 (계정 가입/로그인 필요)
C) 1인 사용이지만 기기 간 동기화는 필요
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Q6. 나무 크기 결정 시점

일주일치 일기 칸이 열리고, 일기를 쓸 때마다 나무 크기가 실시간으로 바뀌나요, 아니면 일주일이 끝난 후 확정되나요?

A) 일기를 쓸 때마다 실시간 갱신 (예: 3일째 쓰면 small→medium 으로 자람)
B) 일주일(7일)이 지난 후 한 번에 확정
C) 사용자가 "완료" 버튼을 눌렀을 때 확정
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---
