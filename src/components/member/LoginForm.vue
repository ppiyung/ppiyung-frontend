<template>
<div>
    <b-form @submit="onSubmit" @reset="onReset">
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

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
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
  methods: {
    onSubmit() {
      // eslint-disable-next-line
      event.preventDefault();
      console.log(this.member_id);
      console.log(this.member_pw);

      this.$axios
        .post(
          'http://localhost:8080/ppiyung/auth/login',
          {
            member_id: this.member_id,
            member_pw: this.member_pw
          },
          { withCredentials: true }
        )
        .then((result) => {
          console.log(result);
          this.$store.state.currentMember = result.data.payload;
          this.$router.push({ name: 'main' });
        })
        .catch((result) => {
          console.error(result);
        });
    },
    onReset() {
      this.member_id = '';
      this.member_pw = '';
    }
  }
};
</script>
