<template>
  <div></div>
</template>

<script>
export default {
  name: 'LogoutView',
  components: {
  },
  computed: {
    isLogin() {
      return this.$store.getters['auth/isLogin'];
    }
  },
  watch: {
    isLogin(val) {
      if (!val) {
        this.$router.push({ name: 'main' });
      }
    }
  },
  mounted() {
    this.$store.dispatch('auth/logout');
    this.$store.commit('notify/setNotifyList', [ ])
  }
};
</script>
