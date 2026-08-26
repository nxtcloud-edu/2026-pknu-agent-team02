# foundation — STEP 02 비기능 요구 계획

## 목표

Mood Tree MVP의 기술 스택을 결정하고 비기능 요구사항을 구체화한다.

## 체크리스트

- [x] 프레임워크 선택
- [x] 빌드 도구 선택
- [x] 상태 관리 라이브러리 선택
- [x] 스타일링 방식 선택
- [x] AI API 연동 방식 결정
- [x] 배포 설정 방향
- [x] 비기능 요구사항 구체화

## 산출물

- `construction/foundation/nfr-requirements/nfr-requirements.md`
- `construction/foundation/nfr-requirements/tech-stack-decisions.md`

## 질문

### Q1. 프레임워크

이 MVP에 어떤 프레임워크를 사용할까요?

A) Next.js (App Router) — SSR/SSG 가능, Vercel 최적화
B) Next.js (Pages Router) — 전통적 구조
C) Vite + React — SPA, 빠른 빌드
D) Remix — 풀스택
E) Other (please describe after [Answer]: tag below)

[Answer]: A

---

### Q2. 상태 관리

전역 상태 관리를 어떤 방식으로 할까요?

A) Zustand — 가볍고 단순
B) React Context + useReducer
C) Jotai — atomic 상태
D) Redux Toolkit
E) Other (please describe after [Answer]: tag below)

[Answer]: A
