<template>
  <div class="home">
    메인입니다.
    아이디: {{ this.$store.state.member_id }}
    비밀번호: {{ this.$store.state.member_pw }}

    <router-link to="/recruit">Go to recruit</router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  }
};
</script>
