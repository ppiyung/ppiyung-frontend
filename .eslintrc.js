module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': 'off', // 팀원들이 생각하기에 생소한 규칙일 것 같음
    'linebreak-style': 'off', // 깃 설정 때문에 문제 발생이 잦음
    'import/no-unresolved': 'off', // '@' 단축을 사용할 수 없음. 어짜피 뷰도 이 문제를 감지함.
    'import/extensions': 'off',
    'no-param-reassign': 'off'
  },
};
