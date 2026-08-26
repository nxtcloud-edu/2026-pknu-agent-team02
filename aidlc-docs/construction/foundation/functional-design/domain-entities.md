# foundation — Domain Entities

## 이 단위에서 다루는 엔티티

foundation 단위에서는 데이터 엔티티를 직접 다루지 않는다.
프로젝트 구조와 라우팅만 설정한다.

데이터 모델(DiaryEntry, TreeCycle, TreeCollection)은 단위 4(data-storage)에서 구현한다.

## 참조할 데이터 구조 (components.md 기반)

나중 단위에서 사용할 구조를 여기서 미리 정리해둔다:

### NavigationTab

| 필드 | 타입 | 설명 |
|---|---|---|
| id | string | 탭 식별자 (home, diary, collection) |
| label | string | 표시 텍스트 |
| icon | string | 아이콘 이름 |
| path | string | 라우트 경로 |

### PageMeta

| 필드 | 타입 | 설명 |
|---|---|---|
| showNav | boolean | 하단 네비게이션 표시 여부 |
| showHeader | boolean | 헤더 표시 여부 |
| title | string | 페이지 제목 (헤더에 표시) |
