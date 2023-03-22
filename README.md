# 삐융 프론트엔드

2022-2023 한국소프트웨어산업협회 솔트룩스 채용연계 교육과정  
1차 팀프로젝트 2조 삐융

삐융은 가상의 IT 채용 플랫폼입니다. 사용자는 구직회원과 일반회원으로 나뉘어 가입되며, 채용 공고를 게시하고/게시된 채용 공고에 지원할 수 있습니다.

## 테스트 인스트럭션

프론트엔드를 세팅하기 전에 [백엔드](https://github.com/ppiyung/ppiyung-backend)를 먼저 세팅해주세요. 백엔드가 정상적으로 작동하면 아래의 인스트럭션을 따르면 됩니다.

### 요구 사항
- Node v.18.x
- NPM을 사용할 수 있는 환경이어야 합니다.

### 설정
#### .env
```sh
$ cp .env.original .env
$ YOUR_EDITOR .env

# VUE_APP_KAKAO_JS_KEY = YOUR_KEY
# 카카오 JS 키를 발급받아 입력하고 저장
```

#### src/secret.js
```sh
$ cd src
$ cp secret.js.original secret.js
$ vim secret.js

# export default {
#   KAKAO_REST_HEADER: 'KakaoAK YOUR_KEY'
# };
# 카카오 REST 키를 발급받아 입력하고 저장
```

### 의존 패키지 설치
```sh
npm install
```

### 개발 서버 실행
```sh
npm run serve
```
