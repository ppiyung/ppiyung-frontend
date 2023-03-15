<template>
  <b-container sm="*">
    <b-row align-v="center">
        <h1>로그인</h1>
        <login-form />
    </b-row>
  </b-container>
</template>

<script>
import LoginForm from '@/components/member/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm
  }
};
</script>

<style scoped>
.container {
  width: 600px;
}
.row {
  align-content: center;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
}
</style>
