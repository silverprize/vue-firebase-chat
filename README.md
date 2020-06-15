## Demo

https://vue-firebase-chat-53f70.web.app

# SPEC

## Features

- 페이지 구성
  - 로그인
  - 채팅방 목록
  - 채팅방
- 로그인
  - 아이디 중복 검사
- 채팅방 목록 페이지
  - 채팅방 선택
  - 채팅방별 참여자수 실시간 표시
  - 초대를 통해 입장
- 채팅방
  - 텍스트 메시지 전송
  - 이미지 메시지 전송 (이미지 업로드중 채팅 가능)
  - 다른 방에 있는 접속자 초대
  - 참여자수 실시간 표시
  - 메시지 시간 표시(서버 발송 시간 기준)
- 공통
  - 서버 연결이 끊기면 안내 메시지 출력
  - 페이지 새로고침하면 마지막에 참여중이었던 방으로 자동 입장 

## Frontend

- Node.js 10.x
- Vue.js, scss, jest
- ESlint : vue-cli preset & customized [standardJS](https://standardjs.com/)
- Component naming : [Vue.js Official](https://vuejs.org/v2/style-guide/#Priority-B-Rules-Strongly-Recommended-Improving-Readability)
- Directory structure : [vuetify](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/components) style

## Backend

firebase spark plan
- firebase-database
  - 나중에 나온 firestore가 클라이언트에서 더 편리하게 사용할 수 있도록 정돈되어 있지만 [채팅 애플리케이션에 사용할 수 없는 특징](https://cloud.google.com/firestore/docs/best-practices#updates_to_a_single_document)이 있다.
    - **한 document의 update 는 1초에 1번만 가능.**
  - firestore를 사용하다 코드가 장황 해지는 로직, 클라이언트에 노출하지 않았으면 하는 코드를 functions를 사용하면 아주 간단하고 편리하게 처리 할 수 있다.
    단, functions는 blaze플랜부터 사용 할 수 있다. firestore는 functions를 사용 할 수 밖에 없게 끔 하여 유료 플랜으로 끌어들이는 미끼처럼 느껴졌다.
- firebase-storage

# Build & Deploy

## Preparation

nvm
```shell script
brew install nvm
```

node 10
```shell script
nvm install 10
nvm use 10
```

yarn
```shell script
npm i -g yarn
```

firebase-tools
```shell script
yarn global add firebase-tools
cd <project root>
firebase login
firebase use <your firebase project id>
```

firebase configuration
```shell script
touch <project root>/firebase.config.json
# firebase 설정값 추가
```

## Build

Output path : `<project root>/dist`
```shell script
cd <project root>
yarn build
```

## Deploy

```shell script
cd <project root>
yarn deploy
```

firebase specific
```shell script
yarn deploy --only <database|storage|hosting>
```

# Development

## Start

```shell script
cd <project root>/firebase
firebase deploy --except hosting
cd <project root>
yarn serve
```

## Unit test

```shell script
cd <project root>
yarn test:unit
```
