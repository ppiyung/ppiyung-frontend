<template>
  <div class="NotifyApply-container">
    <Notify-Apply-card
      v-for="notify in notifyList"
      :key="notify.notifyId"
      :notificationId="notify.notificationId"
      :applyId="notify.applyId"
      :memberId="notify.memberId"
      :notifyDetail="notify.notifyDetail"
      :notificationCreateAt="new Date(notify.notificationCreateAt).toISOString()"/>
  </div>
</template>

<script>
import NotifyApplyCard from './NotifyApplyCard.vue';

export default {
  components: {
    NotifyApplyCard
  },
  computed: {
    notifyList() {
      return this.$store.getters['notify/apply/requestNotifyList'];
    }
  },
  watch: {
    workArea() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch('requestNotifyList');
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.$store.commit('common/setSuccess', false);
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch('requestNotifyList');
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

<style scoped>
.NotifyApply-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>
