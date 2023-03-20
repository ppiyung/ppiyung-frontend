<template>
    <b-tab title="나의 프로필" active>
         <h3><span id="mypageNickname">{{memberDetail.memberNickname}}</span> 님의 프로필</h3><br>
        <b-card-text>내 아이디: {{memberDetail.memberId}} </b-card-text>
        <b-card-text>내 이름: {{memberDetail.memberName}}</b-card-text>
        <b-card-text>내 생일: {{memberDetail.memberBirth}}</b-card-text>
        <b-card-text>내 성별: {{memberDetail.memberGender}}</b-card-text>
        <b-card-text>내 전화번호: {{memberDetail.memberPhone}}</b-card-text>
        <b-card-text>내 주소: {{memberDetail.memberAddr}}</b-card-text>
        <b-card-text>닉네임: {{memberDetail.memberNickname}}</b-card-text>
        <b-card-text>이메일: {{memberDetail.memberEmail}}</b-card-text>
        <b-card-text>자기소개: {{memberDetail.memberInfo}}</b-card-text>
        <b-card-text>구직 희망 포지션: {{memberDetail.workAreaId}}</b-card-text>
    </b-tab>
</template>

<script>
import dayjs from 'dayjs';
export default {
    computed: {
        memberDetail() {
            const memberDetailRaw = this.$store.getters["member/memberDetail"]
            return {
                ...memberDetailRaw,
                memberBirth: dayjs.unix(memberDetailRaw.memberBirth / 1000).format('YYYY년 MM월 DD일')
            }
        }
    }
}
</script>

<style>
#mypageNickname{
 background-color: cornsilk;
}
</style>