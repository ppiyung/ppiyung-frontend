<template>
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

    <b-row  class="text-center">
      <b-col lg="4" class="pb-2">
          <b-button
          variant="light"
          @click="() => { this.$store.commit('member/prevRegisterStep') }">&lt; 이전으로</b-button>
      </b-col>
      <b-col lg="4" class="pb-2">
          <b-button
          variant="primary"
          @click="saveAndNext">&gt; 다음으로</b-button>
      </b-col>
    </b-row>
  </div>
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
  computed: {
    registerType() {
      return this.$store.getters['member/registerInfo'].memberType;
    },
    isCompany() {
      return this.registerType === 'C';
    }
  },
  methods: {
    saveAndNext() {
      this.$store.commit('member/setRegisterInfo', this.registerInfoParam);
      this.$store.commit('member/nextRegisterStep');
    }
  }
};
</script>

<style scoped>
</style>
