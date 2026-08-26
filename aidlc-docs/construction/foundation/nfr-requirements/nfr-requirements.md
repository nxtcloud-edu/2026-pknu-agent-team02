# foundation — NFR Requirements

## NFR-1: 성능

- 페이지 전환 200ms 이내 (Next.js App Router의 클라이언트 네비게이션)
- AI API 호출 중 로딩 스피너 표시 (타임아웃 30초)
- 로컬스토리지 읽기/쓰기는 동기적이므로 별도 로딩 불필요

## NFR-2: 반응형

- 모바일 우선 (기준: 375px ~ 430px)
- 데스크탑: 중앙 정렬 max-width 430px 컨테이너
- Tailwind responsive breakpoints 사용

## NFR-3: 접근성

- 모든 버튼에 aria-label 제공
- 색상 대비 WCAG AA 기준 준수
- 키보드 네비게이션 지원

## NFR-4: 보안

- Gemini API 키는 서버사이드(Route Handler)에서만 사용
- 클라이언트 코드에 API 키 노출 금지
- 환경변수: `.env.local`에 `GEMINI_API_KEY` 저장

## NFR-5: 유지보수

- 나무 종류, 감정 목록 등은 `src/constants/` 에 상수 파일로 분리
- AI 프롬프트는 `src/prompts/` 에 별도 파일로 분리
- 컴포넌트는 기능별 폴더 구조 (`src/components/{기능}/`)
