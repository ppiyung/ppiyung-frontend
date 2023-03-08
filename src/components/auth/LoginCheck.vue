<template>
<div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state.currentMember);

    if (Object.keys(this.$store.state.currentMember).length === 0) {
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
