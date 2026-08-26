# 요구사항 확인 질문

> `spec.md`에 명시되지 않은 사항을 확인합니다.
> 추가 요구: 메인화면 달력 + 일기 리스트, 나무 10종 반영

---

## Q1. 데이터 저장 방식

이 MVP에서 데이터를 어디에 저장할까요?

A) 브라우저 로컬스토리지만 사용 (서버 없음, 가장 단순)
B) Supabase (클라우드 DB, 멀티디바이스 동기화 가능)
C) Firebase Firestore
D) JSON 파일 기반 로컬 서버
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Q2. 인증 기능

사용자 인증(회원가입/로그인)을 MVP에 포함할까요?

A) 인증 없음 — 한 명의 사용자가 한 브라우저에서 사용
B) 간단한 소셜 로그인 하나만 (Google 등)
C) 이메일/비밀번호 인증
D) 인증 없이 시작하되 나중에 추가할 수 있는 구조만 잡기
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Q3. LLM API 선택

AI 분석에 어떤 LLM API를 사용할까요?

A) OpenAI API (GPT-4o-mini 등)
B) Anthropic Claude API
C) Google Gemini API
D) 여러 개 중 나중에 선택 — 추상화 레이어만 만들기
E) Other (please describe after [Answer]: tag below)

[Answer]: C

---

## Q4. 하루에 한 번 제한 기준

"하루에 한 번"의 기준은 무엇으로 할까요?

A) 자정(00:00) 기준으로 하루가 리셋됨
B) 마지막 기록 후 24시간이 지나야 다시 기록 가능
C) 사용자가 직접 설정한 시간 기준
D) 제한 없이 기록은 자유, Day 진행만 하루 한 번
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Q5. 기록을 건너뛴 날의 처리

사용자가 하루를 건너뛰면 어떻게 할까요?

A) 나무 성장이 멈춤 — 다시 기록하면 이어서 성장 (7일 연속 아니어도 됨)
B) 7일 연속 기록해야만 나무 완성 — 중간에 빠지면 리셋
C) 7일 연속 기록해야만 나무 완성 — 중간에 빠지면 그날은 건너뛰고 다음날 이어감
D) 연속 상관없이 총 7회 기록 완료 시 나무 완성
E) Other (please describe after [Answer]: tag below)

[Answer]:A

---

## Q6. 개발/시연용 테스트 기능

실제 7일을 기다릴 수 없으므로 개발/시연용 기능이 필요한가요?

A) 필요 — "다음 날로 이동" 버튼 (개발 모드에서만 노출)
B) 필요 — 테스트 데이터 일괄 생성 기능
C) A와 B 모두
D) 불필요 — 실제 날짜 기반으로만 동작
E) Other (please describe after [Answer]: tag below)

[Answer]:C

---

## Q7. 배포 대상

이 MVP는 어디에 배포할 예정인가요?

A) Vercel
B) Netlify
C) 로컬에서만 실행 (배포 안 함)
D) 아직 미정 — 나중에 결정
E) Other (please describe after [Answer]: tag below)

[Answer]: D

---

## Q8. 달력 메인화면 레이아웃

메인화면에서 달력과 일기 리스트의 배치를 어떻게 할까요?

A) 데스크탑: 왼쪽 달력 + 오른쪽 일기 리스트 / 모바일: 상단 달력 + 하단 리스트
B) 상단 달력 + 하단 일기 리스트 (항상 세로 배치)
C) 달력이 메인이고, 날짜 클릭 시 해당 일의 기록을 모달로 표시
D) 탭으로 분리 — 달력 탭 / 리스트 탭
E) Other (please describe after [Answer]: tag below)

[Answer]: E : 메인화면 왼쪽 상단 달력 위젯 누르면 달력 생성 + 우측 상단 리스트 위젯 누르면 일기 리스트 생성

---

## Q9. 나무 10종 구성

나무를 기존 4종에서 10종으로 늘립니다. 추가할 6종의 방향은?

A) 감정 특성을 더 세분화 — 예: 용기, 감사, 호기심, 위로, 열정, 평화 등
B) 계절/자연 테마 — 예: 대나무, 올리브, 야자수, 자작나무, 은행나무, 매화 등
C) A와 B를 혼합하여 10종 구성
D) AI가 판단할 수 있도록 감정 키워드 기반으로 AI에게 맡김
E) Other (please describe after [Answer]: tag below)

[Answer]: E: 감정 8개 나무 8개로 1:1 매핑될 수 있게 할게 

---

## Q10. 홈 화면에서 나무 성장 표시 위치

달력이 메인이 되면, 현재 키우는 나무의 성장 상태는 어디에 보여줄까요?

A) 달력 상단에 작은 카드로 나무 + Day 표시
B) 달력 하단 또는 리스트 상단에 배너 형태로 표시
C) 하단 네비게이션 옆에 플로팅 버튼/아이콘으로 표시
D) 별도 "나무" 탭에서만 표시
E) Other (please describe after [Answer]: tag below)

[Answer]: E : 메인은 나무고 달력은 따로 위젯 
