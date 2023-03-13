<template>
  <div>
    {{recruitList}}
  </div>
</template>

<script>
export default {
  computed: {
    recruitList() {
      return this.$store.getters['recruit/recruitList'];
    }
  },
  mounted() {
    this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch('recruit/requestRecruitList');
      },
      failedCallback: (error) => {
        console.error('실패');
        console.error(error);
        this.$store.commit('common/setSuccess', false);
      }
    });
  }
};
</script>
