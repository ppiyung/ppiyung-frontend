<template>
  <div></div>
</template>

<script>
export default {
  name: 'LogoutView',
  components: {
  },
  mounted() {
    this.$axios.post(
      this.$apiUri.logout,
      { },
      { withCredentials: true }
    )
      .then(() => {
        this.$store.commit('auth/setMemberInfo', {
          member_id: '',
          member_name: '',
          member_type: ''
        });
        this.$store.commit('auth/setMemberVerified', false);
        this.$router.push({ name: 'main' });
      })
      .catch((result) => {
        console.error(result);
        // eslint-disable-next-line
          alert('로그인에 실패하였습니다.');
      });
  }
};
</script>
