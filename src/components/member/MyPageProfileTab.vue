<template>
  <b-tab title="나의 프로필" aria-selected="true" active> 
    <h3>
      <span id="mypageNickname">{{ memberDetail.memberNickname }}</span> 님의 프로필 <br>
    </h3>
    <b-card-group deck>
      <b-card header="개인 정보">
        <b-list-group flush>
          <b-list-group-item>
            <b-row>
              <b-col>아이디</b-col>
              <b-col>{{ memberDetail.memberId }}</b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item>
            <b-row>
              <b-col>이름</b-col>
              <b-col>{{ memberDetail.memberName }}</b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item>
            <b-row>
              <b-col>생일</b-col>
              <b-col>{{ memberDetail.memberBirth }}</b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item>
            <b-row>
              <b-col>성별</b-col>
              <b-col>{{ memberDetail.memberGender }}</b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item>
            <b-row>
              <b-col>전화번호</b-col>
              <b-col>{{ memberDetail.memberPhone }}</b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item>
            <b-row>
              <b-col>주소</b-col>
              <b-col>{{ memberDetail.memberAddr }}</b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item>
            <b-row>
              <b-col>닉네임</b-col>
              <b-col>{{ memberDetail.memberNickname }}</b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item>
            <b-row>
              <b-col>이메일</b-col>
              <b-col>{{ memberDetail.memberEmail }}</b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item>
            <b-row>
              <b-col>구직 희망 포지션</b-col>
              <b-col>{{ memberDetail.workAreaName }}</b-col>
            </b-row>
         </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card header="자기 소개">
        <b-card-text>{{ memberDetail.memberInfo }}</b-card-text>
      </b-card>
    </b-card-group>
  </b-tab>
</template>


<script>
import dayjs from 'dayjs';
import { workAreaIdToName } from '@/util/workareaHelper';

export default {
    computed: {
        memberDetail() {
            const memberDetailRaw = this.$store.getters["member/memberDetail"]
            return {
                ...memberDetailRaw,
                memberBirth: dayjs.unix(memberDetailRaw.memberBirth / 1000).format('YYYY년 MM월 DD일'),
                workAreaName: workAreaIdToName(memberDetailRaw.workAreaId)
            }
        }
    }
}
</script>

<style scoped>
#mypageNickname{
 font-weight: 900;
}
</style>