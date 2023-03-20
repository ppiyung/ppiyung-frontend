<template>

  <div class="NotifyNomal-container">
    <notify-nomal-card
      v-for="notify in notifyList"
      :key="notify.notifyId"
      :notificationId="notify.notificationId"
      :applyId="notify.applyId"
      :suggestId="notify.suggestId"
      :memberId="notify.memberId"
      :notifyDetail="notify.notifyDetail"
      :applyResult="notify.applyResult"
      :recruitId="notify.recruitId"
      :memberName="notify.memberName"
      :recruitTitle="notify.recruit.recruitTitle"
      :companyId="notify.companyId"
      :notificationCreatedAt="notify.notificationCreatedAt"/>
    
  </div>
  
</template>

<script>
import NotifyNomalCard from './NotifyNomalCard.vue';

export default {
  components: {
     NotifyNomalCard

  },
  computed: {
    notifyList() {
      return this.$store.getters['notify/notifyList'];
    },
    // auth 토근 로그인 
    memberInfo() {
      return this.$store.getters['auth/memberInfo'];
    }
  },

  // auth 토근 로그인
  watch: {
    workArea() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch('notify/company/requestNotifyList', );
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