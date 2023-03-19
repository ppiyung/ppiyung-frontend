<template>
   <basic-layout>
   <h5>{{ this.loginMemberInfo.memberNickname }}님의 마이 페이지</h5><br>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <profile-tab />
          <resume-tab/>
          <update-tab/>
          <apply-tab/>
          <suggest-tab/>
    
          <b-tab title="내가 작성한 게시글">
             <h3>내가 작성한 게시글</h3> <br>
            <b-card-text>내가 작성한 게시글</b-card-text>
            </b-tab>

             <b-tab title="관심 채용 정보">
             <h3>관심 채용 정보</h3> <br>
            <b-card-text>관심 채용 정보</b-card-text>
            </b-tab>

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

export default {
  name: 'MyPageView',
  components:{
   BasicLayout, ProfileTab,ResumeTab ,UpdateTab ,ApplyTab,SuggestTab
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
