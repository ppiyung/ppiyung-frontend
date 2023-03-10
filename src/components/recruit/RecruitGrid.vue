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
    this.$store.dispatch('recruit/requestRecruitList');
  }
};
</script>
