const baseUri = 'http://localhost:8080/ppiyung';

export default {
  login: `${baseUri}/auth/login`,
  logout: `${baseUri}/auth/logout`,
  refresh: `${baseUri}/auth/refresh`,
  signin: `${baseUri}/member/signin`,
  recruit: `${baseUri}/recruit`,
  kakaoLocationByKeyword: 'https://dapi.kakao.com/v2/local/search/keyword.json'
};
