# 스펙

## 프론트엔드

- Vue.js
- jest : unit test
- eslint : - [standardJS](https://standardjs.com/)를 기준으로 콤마와 space rule을 약간 변경하여 사용.

# 문제해결 전략

## 프론트엔드

### 컴포넌트 설계

- 컴포넌트 네이밍은 [공식 가이드](https://vuejs.org/v2/style-guide/#Priority-B-Rules-Strongly-Recommended-Improving-Readability)를 따름.
- 컴포넌트 파일 구조는 [vuetify 프레임워크](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/components)를 벤치마킹.

## 백엔드

**서버 구현 방법에 대한 제한 없음**을 전제로 Firebase를 선택.

- 백엔드 데이터 변경을 클라이언트에게 실시간으로 알림

# 빌드

output 위치 : `<project root>/dist`

```
npm run build
```

# 실행

```
npm run build && npm run start
```
