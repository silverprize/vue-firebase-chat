# 스펙

## 기능

- 페이지 구성
  - 로그인
  - 채팅방 목록
  - 채팅방
- 로그인
  - 아이디 중복 검사
- 채팅방 목록 페이지
  - 채팅방 선택
  - 채팅방별 참여자수 실시간 표시
  - 초대를 통해 방입장
- 채팅방
  - 텍스트 메시지 전송
  - 이미지 메시지 전송 (이미지 업로드중 채팅을 막지 않음)
  - 다른 방에 있는 접속자 초대
  - 참여자수 실시간 표시
  - 메시지 시간 표시(서버 발송 시간 기준)
- 공통
  - 소켓연결이 끊기면 안내 메시지 출력, 사용자 컨펌후 로그인 페이지로 이동
  - 페이지 새로고침하면 로그인 페이지로 리디렉트

## 프론트엔드

- 소스코드 위치 : `<project root>/src`
- Node.js 12.x
- Vue.js, scss, jest
- ESlint : Vue프리셋 & [standardJS](https://standardjs.com/)기반에 개인취향 반영
- 컴포넌트 네이밍 : [Vue.js 공식 가이드](https://vuejs.org/v2/style-guide/#Priority-B-Rules-Strongly-Recommended-Improving-Readability)를 따름
- 디렉토리 & 파일 구조는 [vuetify 프레임워크](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/components) 벤치마킹

## 백엔드

- firebase

# 빌드와 실행

## 사전준비

Node.js 12 이상 설치

## 빌드

- 프론트엔드 output 위치 `<project root>/dist`
- 백엔드 빌드 없음

```sh
npm i
npm run build
```

## 실행

- `<project root>/dist` 디렉토리가 웹서버 `document root`

```sh
npm i
npm run build
npm run start
```

http://localhost:3000 접속

## 유닛테스트

```sh
npm i
npm run test:unit
```

# 문제해결 전략

## 메시지 순서 동기화

클라이언트마다 메시지 표시 순서가 달라지는 것을 방지하기 위해 서버가 클라이언트로부터 받은 메시지에 서버에서 관리하는 시퀀스를 기록하고 클라이언트로 보낸다.  
클라이언트에서 시퀀스를 기준으로 정렬한다.

## 채팅방/채팅방 목록, 위치에 상관없이 초대

뷰계층을 아래 구조로 구성하여 채팅방과 채팅방 목록을 상호 이동할떄,  
placeholder 부분 뷰인스턴스만 생성/파괴되고 Parent뷰 인스턴스는 유지되게 한다.  
Parent뷰가 초대 이벤트 리스너가 된다.

```html
<Parent>
  <채팅방 or 채팅방 목록 컴포넌트 placeholder>
  <ConfirmDialog />
</Parent>
```

## async 이미지 업로드

이미지 업로드 완료됨을 알리는 이벤트를 정의하고,  
이미지라는 것만 알리는 메시지를 전송하여 클라이언트들에게 전파한다.  
전파한 메시지를 서버가 수신 완료함을 확인한뒤 이미지를 업로드한다.  
서버가 이미지 수신을 완료하면 수신 완료 이벤트를 통해 이미지url을 클라이언트들에게 알린다.  
이미지 업로드 중인 동안 클라이언트들은 이미지 메시지 placeholder를 본다.

## 초대가 동시 다발적일때

클라이언트는 초대 다이얼로를 보고 있는 동안 초대 다이얼로그를 더 띄우지 않는다.  
초대 저장 큐를 두고 초대 다이얼로그가 띄워졌을땐 초대정보를 큐에 저장한다.  
초대 다이얼로그를 닫으면 큐에서 하나씩 밀어내며 초대 다이얼로그를 띄우는 과정을 반복한다.

## 채팅방 참여자수 실시간 표시

서버로부터 다른 클라이언트의 입장/퇴장 이벤트를 받아,  
현재 페이지에 따라 필요한 데이터를 요청/수신하여 반영한다.

## 클라이언트 아이디 유지/참여한 채팅방 식별/접속 현황 관리

socket.io를 특성을 통해 쉽게 구현할 수 있다.  
서버에서 클라이언트 socket은 끊기기 전까지 인스턴스가 유지된다.  
클라이언트 소켓에 아이디와 참여중인 채팅방을 저장한다.  
아래 자료구조로 연결과 끊김에 관련된 이벤트에 따라 업데이트.

```javascript
{
  people: {
    loginId: socket_instance
  },
  chatRooms: {
    Moon: {
      name: 'Moon',
      countPeople: 0,
    },
    ...
  },
  countTotalPeople: 0
}
```
