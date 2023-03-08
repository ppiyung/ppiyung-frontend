<template>
  <div>
    <login-check />
    로그인이 필요한 페이지
    아이디: {{ this.$store.state.currentMember.member_id }}
  </div>
</template>

<script>
import LoginCheck from '@/components/auth/LoginCheck.vue';

export default {
  name: 'HomeView',
  components: {
    LoginCheck
  }
};
</script>
