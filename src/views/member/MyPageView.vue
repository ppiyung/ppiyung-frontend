<template>
   <basic-layout>
   <h5>{{this.loginMemberInfo.memberNickname}}님의 마이 페이지</h5><br>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="나의 정보" active>
            <!-- <b-card-text>안녕하세요님 {{this.loginMemberInfo}}</b-card-text> -->
               <b-card-text>내 아이디: {{this.loginMemberInfo.memberId}} </b-card-text>
              <b-card-text>내 이름: {{this.loginMemberInfo.memberName}}</b-card-text>
                <b-card-text>내 생일: {{this.loginMemberInfo.memberBirth}}</b-card-text>
                <b-card-text>내 성별: {{this.loginMemberInfo.memberGender}}</b-card-text>
                <b-card-text>내 전화번호: {{this.loginMemberInfo.memberPhone}}</b-card-text>
                <b-card-text>내 주소: {{this.loginMemberInfo.memberAddr}}</b-card-text>
                <b-card-text>닉네임: {{this.loginMemberInfo.memberNickname}}</b-card-text>
              <b-card-text>이메일: {{this.loginMemberInfo.memberEmail}}</b-card-text>
               <b-card-text>자기소개: {{this.loginMemberInfo.memberInfo}}</b-card-text>
                <b-card-text>희망 직무분야: {{this.loginMemberInfo.workAreaId}}</b-card-text>

          </b-tab>
          <b-tab title="이력서 관리"><b-card-text>이력서 관리</b-card-text></b-tab>
          <b-tab title="지원 현황"><b-card-text>지원 현황</b-card-text></b-tab>
          <b-tab title="입사 제안"><b-card-text>입사 제안</b-card-text></b-tab>
          <b-tab title="내가 작성한 게시글"><b-card-text>내가 작성한 게시글</b-card-text></b-tab>
          <b-tab title="회원 정보 수정"><b-card-text>회원 정보 수정</b-card-text></b-tab>
        </b-tabs>
      </b-card>
    </div>
 </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';

export default {
  name: 'MyPageView',
  components:{
   BasicLayout
  },
  computed: {
    loginMemberInfo() {
      return this.$store.getters['auth/memberInfo'];
    }
  }
};
</script>

<style>
.card{
  width: 1200px;
  height: fit-content;
}
</style>
