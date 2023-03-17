
<template>

  <div class="NotifyApply-container">
    <notify-apply-card
      v-for="notify in notifyList"
      :key="notify.notifyId"
      :notificationId="notify.notificationId"
      :applyId="notify.applyId"
      :memberId="notify.memberId"
      :notifyDetail="notify.notifyDetail"
      :applyResult="notify.applyResult"
      :recruitId="notify.recruitId"
      :recruitTitle="notify.recruitTitle"
      :notificationCreateAt="new Date(notify.notificationCreatedAt).toISOString()"/>
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
      return this.$store.getters['notify/notifyList'];
    },
    memberInfo() {
      return this.$store.getters['auth/memberInfo'];
    }
  },

  // 반응성 생성
  watch: {
    workArea() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch('notify/apply/requestNotifyList', );
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
        this.$store.dispatch('notify/requestNotifyList', this.memberInfo.memberId);
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