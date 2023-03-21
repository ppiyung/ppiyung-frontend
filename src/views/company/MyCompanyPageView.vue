<template>
   <basic-layout>
   <h5>{{ this.loginMemberInfo.memberNickname }}님의 마이 페이지</h5><br>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <update-tab/>
          <suggest-tab/>
        </b-tabs>
      </b-card>
    </div>
 </basic-layout>
</template>

<script>
import UpdateTab from '@/components/member/MyCompanyPageUpdateTab.vue';
import BasicLayout from '@/components/common/BaseLayout.vue';
import SuggestTab from '@/components/member/MyCompanyPageSuggestTab.vue';

export default {
  name: 'MyPageView',
  components:{
   BasicLayout,UpdateTab,SuggestTab
  },
  computed: {
    loginMemberInfo() {
      return this.$store.getters['auth/memberInfo'];
    }
  },
  created() {
    this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch('member/getMemberById', this.loginMemberInfo.memberId);
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
.card{
  width: 1200px;
  height: fit-content;
}

</style>
