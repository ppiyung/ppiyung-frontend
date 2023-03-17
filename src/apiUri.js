const baseUri = 'http://localhost:8080/ppiyung';

export default {
  login: `${baseUri}/auth/login`,
  logout: `${baseUri}/auth/logout`,
  refresh: `${baseUri}/auth/refresh`,
  member: `${baseUri}/member`,
  signin: `${baseUri}/member/signin`,
  recruit: `${baseUri}/recruit`,
  resources: `${baseUri}/resources`,
<<<<<<< HEAD
  notify: `${baseUri}/notify`,
=======
  board: `${baseUri}/board`,
>>>>>>> c6612b644453645a9440bf6e96557ede3ddfe01e
  kakaoLocationByKeyword: 'https://dapi.kakao.com/v2/local/search/keyword.json'
};
