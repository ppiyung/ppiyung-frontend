<template>
<div>
    <b-form @submit="onSubmit">
        <b-form-input
            id="input-1"
            v-model="member_id"
            placeholder="아이디"
            required
        ></b-form-input>

        <b-form-input
          id="input-2"
          v-model="member_pw"
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
      member_id: '',
      member_pw: ''
    };
  },
  computed: {
    logined() {
      return this.$store.getters.getMemberInfo.member_id === '';
    }
  },
  watch: {
    logined(val) {
      if (val) {
        this.$router.push({ name: 'main' });
      }
    }
  },
  methods: {
    async onSubmit() {
      // eslint-disable-next-line
      event.preventDefault();

      this.$axios.post(
        this.$apiUri.login,
        {
          member_id: this.member_id,
          member_pw: this.member_pw
        },
        { withCredentials: true }
      )
        .then((result) => {
          const memberInfo = result.data.payload;
          this.$store.commit('setMemberInfo', {
            member_id: memberInfo.member_id,
            member_name: memberInfo.member_name,
            member_type: memberInfo.member_type
          });
          this.$router.push({ name: 'main' });
        })
        .catch((result) => {
          console.error(result);
          // eslint-disable-next-line
          alert('로그인에 실패하였습니다.');
        });
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
