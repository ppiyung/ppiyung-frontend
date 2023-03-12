<template>
<div>
    <b-form @submit="onSubmit">
        <b-form-input
            id="input-1"
            v-model="memberId"
            placeholder="아이디"
            required
        ></b-form-input>

        <b-form-input
          id="input-2"
          v-model="memberPw"
          placeholder="비밀번호"
          type="password"
          required
        ></b-form-input>

      <div class="login-control">
        <b-button type="submit" variant="primary">로그인</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberId: '',
      memberPw: ''
    };
  },
  computed: {
    isSuccess() {
      return this.$store.getters['auth/isAuthSuccess'];
    },
    isLogin() {
      return this.$store.getters['auth/isLogin'];
    }
  },
  watch: {
    isSuccess(val) {
      if (val) {
        this.$router.push({ name: 'main' });
      } else if (!val) {
        alert('로그인에 실패했습니다. 아이디와 비밀번호를 한 번 더 확인해주세요.');
      } else if (val === null) {
        // 로그아웃 상태
      }
    }
  },
  methods: {
    async onSubmit() {
      // eslint-disable-next-line
      event.preventDefault();

      this.$store.dispatch('auth/login', {
        memberId: this.memberId,
        memberPw: this.memberPw
      });
    }
  },
  mounted() {
    if (this.isLogin) {
      this.$store.dispatch('auth/logout');
    }
  }
};
</script>

<style scoped>
form {
  margin-top: 50px;
}
.login-control {
  margin-top: 25px;
}
</style>
