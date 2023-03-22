<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12" md="8" lg="6">
        <b-form @submit.prevent="onSubmit" class="mt-4">
          <b-form-group label="아이디" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="memberId"
              placeholder="아이디"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="비밀번호" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="memberPw"
              placeholder="비밀번호"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-row class="justify-content-center">
            <b-button type="submit" variant="primary" class="mt-4">로그인</b-button>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberId: "",
      memberPw: "",
    };
  },
  computed: {
    isSuccess() {
      return this.$store.getters["common/isSuccess"];
    },
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  watch: {
    isSuccess(newVal) {
      if (newVal === false) {
        this.$bvToast.toast(
          "로그인에 실패했습니다. 아이디와 비밀번호를 한 번 더 확인해주세요.",
          {
            title: "로그인 실패",
            variant: "danger",
            autoHideDelay: 5000,
          }
        );
        this.$store.commit("common/setSuccess", null);
      } else if (newVal === true) {
        this.$store.dispatch("common/getWorkArea");
        this.$store.commit("common/setSuccess", null);
        this.$router.push({ name: "main" });
      }
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      this.$store.dispatch("auth/login", {
        memberId: this.memberId,
        memberPw: this.memberPw,
      });
    },
  },
  mounted() {
    if (this.isLogin) {
      this.$store.dispatch("auth/logout");
    }

    this.$store.commit("common/setSuccess", null);
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>