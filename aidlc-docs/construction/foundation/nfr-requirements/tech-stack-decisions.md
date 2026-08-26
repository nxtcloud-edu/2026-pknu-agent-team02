# foundation — Tech Stack Decisions

## 확정 기술 스택

| 영역 | 선택 | 사유 |
|---|---|---|
| 프레임워크 | Next.js 14+ (App Router) | Vercel 배포 최적화, SSR/SSG 지원, 파일 기반 라우팅 |
| 언어 | TypeScript | 타입 안전성, 개발 생산성 |
| 빌드 도구 | Next.js 내장 (Turbopack/Webpack) | 별도 설정 불필요 |
| 상태 관리 | Zustand | 가볍고 단순, 로컬스토리지 persist 미들웨어 내장 |
| 스타일링 | Tailwind CSS | 빠른 UI 개발, Next.js 기본 지원 |
| AI API | Google Gemini API | 요구사항 확정, Next.js Route Handler로 API 키 보호 |
| 데이터 저장 | 브라우저 로컬스토리지 | 인증 없는 MVP, Zustand persist로 자동 동기화 |
| 배포 | Vercel | Next.js 최적화, 무료 호비 플랜 |
| 패키지 매니저 | npm | 기본 제공, 별도 설치 불필요 |

## 주요 의존성

| 패키지 | 용도 |
|---|---|
| next | 프레임워크 |
| react, react-dom | UI 라이브러리 |
| typescript | 언어 |
| tailwindcss | 스타일링 |
| zustand | 상태 관리 |
| @google/generative-ai | Gemini API SDK |
| uuid | ID 생성 |

## AI API 연동 방식

- Next.js Route Handler (`/api/analyze-daily`, `/api/analyze-weekly`)를 통해 서버사이드에서 Gemini API 호출
- API 키는 환경변수 `GEMINI_API_KEY`로 관리
- 클라이언트에서는 Route Handler를 fetch로 호출
