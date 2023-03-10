<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  mounted() {
    this.$store.commit('auth/setMemberVerified', false);
  }
};
</script>

<style>

</style>
