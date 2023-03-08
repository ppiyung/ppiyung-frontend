<template>
  <b-container>
    로그인

    <login-form />
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
