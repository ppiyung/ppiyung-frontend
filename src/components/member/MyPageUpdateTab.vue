<template>
    <b-tab title="정보 수정하기" active>
         <!-- <b-card-text>안녕하세요님 {{this.memberDetail}}</b-card-text> 
        <b-card-text>내 아이디: {{this.memberDetail.memberId}} </b-card-text>
        <b-card-text>내 이름: {{this.memberDetail.memberName}}</b-card-text>
        <b-card-text>내 생일: {{this.memberDetail.memberBirth}}</b-card-text>
        <b-card-text>내 성별: {{this.memberDetail.memberGender}}</b-card-text>
        <b-card-text>내 전화번호: {{this.memberDetail.memberPhone}}</b-card-text>
        <b-card-text>내 주소: {{this.memberDetail.memberAddr}}</b-card-text>
        <b-card-text>닉네임: {{this.memberDetail.memberNickname}}</b-card-text>
        <b-card-text>이메일: {{this.memberDetail.memberEmail}}</b-card-text>
        <b-card-text>자기소개: {{this.memberDetail.memberInfo}}</b-card-text>
        <b-card-text>구직 희망 포지션: {{this.memberDetail.workAreaId}}</b-card-text> -->
     <div>
    <h2>2단계 (<span v-if="registerType === 'N'">구직 회원</span>
<span v-if="registerType === 'C'">기업 회원</span>)
    </h2>

    <b-row>
      <b-col lg="1" class="pb-2">
          아이디
      </b-col>
      <b-col lg="4" class="pb-2">
        <b-form-input
            v-model="registerInfoParam.memberId"
            required
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-container class="duplicate-indicator">
        {{isDuplicated ? '사용할 수 없는 아이디입니다.' : '이 아이디는 사용할 수 있습니다.'}}
      </b-container>
    </b-row>

    <b-row>
      <b-col lg="1" class="pb-2">
          비밀번호
      </b-col>
      <b-col lg="4" class="pb-2">
        <b-form-input
            v-model="registerInfoParam.memberPw"
            type="password"
            required
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="1" class="pb-2">
          {{this.isCompany ? '기업명' : '이름'}}
      </b-col>
      <b-col lg="4" class="pb-2">
        <b-form-input
            v-model="registerInfoParam.memberName"
            required
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="1" class="pb-2">
          {{this.isCompany ? '별칭' : '닉네임'}}
      </b-col>
      <b-col lg="4" class="pb-2">
        <b-form-input
            v-model="registerInfoParam.memberNickname"
            required
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="1" class="pb-2">
          {{this.isCompany ? '창립일' : '생년월일'}}
      </b-col>
      <b-col lg="4" class="pb-2">
        <b-form-input
            type="date"
            v-model="registerInfoParam.memberBirth"
            required
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row v-if="isCompany">
      <b-col lg="1" class="pb-2">
          사업자등록번호
      </b-col>
      <b-col lg="4" class="pb-2">
        <b-form-input
            v-model="registerInfoParam.memberRegNum"
            required
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row v-if="!isCompany">
      <b-col lg="1" class="pb-2">
          성별
      </b-col>
      <b-col lg="4" class="pb-2">
        <b-form-select
            v-model="registerInfoParam.memberGender"
            :options="genderOptions"
        ></b-form-select>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="1" class="pb-2">
          전화번호
      </b-col>
      <b-col lg="4" class="pb-2">
        <b-form-input
            v-model="registerInfoParam.memberPhone"
            required
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row v-if="isCompany">
      <b-col lg="1" class="pb-2">
          주소
      </b-col>
      <b-col lg="8" class="pb-2">
          <register-map-container />
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="1" class="pb-2">
          이메일
      </b-col>
      <b-col lg="4" class="pb-2">
        <b-form-input
            v-model="registerInfoParam.memberEmail"
            required
        ></b-form-input>
      </b-col>
    </b-row>
  </div>
    
    </b-tab>
</template>

<script>
import RegisterMapContainer from './RegisterMapContainer.vue';
export default {
  components: {
    RegisterMapContainer
  },
   data() {
    return {
      registerInfoParam: {},
      genderOptions: [
        { value: 'F', text: '여성' },
        { value: 'M', text: '남성' },
        { value: 'O', text: '여기에 없음' },
        { value: 'X', text: '밝히지 않음' }
      ]
    };
  },
    name: "UpdateTab",
    computed: {
        memberDetail() {
            return this.$store.getters['member/memberDetail'];
        },
         registerType() {
      return this.$store.getters['member/registerInfo'].memberType;
    },
    isCompany() {
      return this.registerType === 'C';
    },
    isDuplicated() {
      const memberDetail = this.$store.getters['member/memberDetail'];
      if (!memberDetail) {
        return true;
      }
      return Object.keys(memberDetail).length === 0;
    }
  },
  watch: {
    'registerInfoParam.memberId': {
      handler(val) {
        this.$store.dispatch('member/getMemberById', val);
      }
    }
  },
  methods: {
    saveAndNext() {
      if (this.isDuplicated) {
        alert('중복되는 아이디입니다. 다른 아이디를 사용해주세요.');
        return;
      }
      this.$store.commit('member/setRegisterInfo', this.registerInfoParam);
      this.$store.commit('member/nextRegisterStep');
    }
  }
};
  
</script>

<style scoped>
.duplicate-indicator {
  margin-bottom: 10px;
}
</style>