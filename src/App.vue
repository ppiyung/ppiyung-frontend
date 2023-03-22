<template>
  <div id="app">
    <router-view class="router-wrapper" />
  </div>
</template>

<script>

export default {
  methods: {
    loadNotification() {
      if (!this.isLogin) {
        this.$store.commit('notify/setNotifyList', []);
        return;
      }
      console.log('불러오기');
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch('notify/requestNotifyList', this.$store.getters['auth/memberInfo'].memberId);
        },
        failedCallback: (error) => {
          console.error('알림 불러오기 실패');
          console.error(error);
          this.$store.commit('common/setSuccess', false);
        }
      });
    }
  },
  computed: {
    memberInfo() {
      return this.$store.getters['auth/memberInfo'];
    },
    isLogin() {
      return this.$store.getters['auth/isLogin'];
    }
  },
  created() {
    this.loadNotification();
    this.$store.dispatch('common/getWorkArea');
  },
  watch: {
    '$route' () {
      if (this.$route.name === 'logout') {
        return;
      }
      this.loadNotification();
    }
  }
};
</script>

<style>
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

#app {
  height: 100%;
  font-family: 'Pretendard-Regular';
}

</style>
