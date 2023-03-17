<template>
   <basic-layout>
   <h5>님의 마이 페이지</h5><br>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <profile-tab />
  
          <resume-tab/>
          <update-tab/>
   
          <b-tab title="지원 현황">
             <h3>지원 현황</h3> <br>
            <b-card-text>지원 현황</b-card-text>
            </b-tab>
          <b-tab title="입사 제안">
             <h3>입사 제안</h3> <br>
            <b-card-text>입사 제안</b-card-text>
            </b-tab>
          <b-tab title="내가 작성한 게시글">
             <h3>내가 작성한 게시글</h3> <br>
            <b-card-text>내가 작성한 게시글</b-card-text>
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


export default {
  name: 'MyPageView',
  components:{
   BasicLayout, ProfileTab,ResumeTab ,UpdateTab
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
