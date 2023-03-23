<template>
   <basic-layout>
   <h5>{{ this.loginMemberInfo.memberNickname }}님의 마이 페이지</h5><br>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <profile-tab aria-selected="true"/>
          <resume-tab/>
          <update-tab/>
          <apply-tab/>
          <suggest-tab/>
          <community-tab/>
          <book-mark-tab/>
        </b-tabs>
      </b-card>
    </div>
 </basic-layout>
</template>

<script>
import UpdateTab from '@/components/member/MyPageUpdateTab.vue';
import BasicLayout from '@/components/common/BaseLayout.vue';
import ProfileTab from '@/components/member/MyPageProfileTab.vue';
import ResumeTab from '@/components/member/MyPageResumeTab.vue';
import ApplyTab from '@/components/member/MyPageApplyTab.vue';
import SuggestTab from '@/components/member/MyPageSuggestTab.vue';
import CommunityTab from '@/components/member/MyPageCommunityTab.vue';
import BookMarkTab from '@/components/member/MyPageBookMarkTab.vue';

export default {
  name: 'MyPageView',
  components:{
   BasicLayout, ProfileTab,ResumeTab ,UpdateTab ,ApplyTab,SuggestTab ,CommunityTab ,BookMarkTab
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
  width: 90%;
  height: fit-content;
}


</style>
