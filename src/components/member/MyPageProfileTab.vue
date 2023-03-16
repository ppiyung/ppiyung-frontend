<template>
    <b-tab title="나의 프로필" active>
        <h3>나의 프로필</h3> <br>
         <b-card-text>안녕하세요님 {{this.memberDetail}}</b-card-text> 
        <b-card-text>내 아이디: {{this.memberDetail.memberId}} </b-card-text>
        <b-card-text>내 이름: {{this.memberDetail.memberName}}</b-card-text>
        <b-card-text>내 생일: {{this.memberDetail.memberBirth}}</b-card-text>
        <b-card-text>내 성별: {{this.memberDetail.memberGender}}</b-card-text>
        <b-card-text>내 전화번호: {{this.memberDetail.memberPhone}}</b-card-text>
        <b-card-text>내 주소: {{this.memberDetail.memberAddr}}</b-card-text>
        <b-card-text>닉네임: {{this.memberDetail.memberNickname}}</b-card-text>
        <b-card-text>이메일: {{this.memberDetail.memberEmail}}</b-card-text>
        <b-card-text>자기소개: {{this.memberDetail.memberInfo}}</b-card-text>
        <b-card-text>구직 희망 포지션: {{this.memberDetail.workAreaId}}</b-card-text>
    </b-tab>
</template>

<script>
export default {
    computed: {
        memberDetail() {
            return this.$store.getters['member/memberDetail'];
        }
    }
}
</script>

<style>

</style>