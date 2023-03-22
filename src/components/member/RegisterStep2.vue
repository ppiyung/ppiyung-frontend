<template>
  <div>
    <h2>2단계 (<span v-if="registerType === 'N'">구직 회원</span>
<span v-if="registerType === 'C'">기업 회원</span>)
    </h2>
    <b-form @submit="saveAndNext">
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
              placeholder="비밀번호"
              required
          ></b-form-input>
          <b-form-input
              v-model="memberPwVerify"
              type="password"
              placeholder="비밀번호 확인"
              required
          ></b-form-input>
          <div v-if="this.registerInfoParam.memberPw !== this.memberPwVerify">
            비밀번호와 비밀번호 확인이 다릅니다.
          </div>
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
              type="email"
              required
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row  class="text-center">
        <b-col lg="4" class="pb-2">
            <b-button
            variant="light"
            @click="() => { this.$store.commit('member/prevRegisterStep'); }">&lt; 이전으로</b-button>
        </b-col>
        <b-col lg="4" class="pb-2">
            <b-button
            variant="primary"
            type="submit">&gt; 다음으로</b-button>
        </b-col>
      </b-row>
    </b-form>
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
      ],
      memberPwVerify: ''
    };
  },
  computed: {
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
        this.$store.dispatch('member/checkExistMember', val);
      }
    }
  },
  methods: {
    formValidate() {
      if (this.isDuplicated) {
        alert('중복되는 아이디입니다. 다른 아이디를 사용해주세요.');
        return false;
      }
      if (this.registerInfoParam.memberPw.length > 32) {
        alert('비밀번호는 최대 32자를 넘을 수 없습니다.');
        return false;
      }
      if (this.registerInfoParam.memberPw !== this.memberPwVerify) {
        alert('비밀번호와 비밀번호 확인이 다릅니다. 다시 한 번 확인해주세요.');
        return false;
      }
      if (this.registerInfoParam.memberId.length > 18) {
        alert('아이디는 최대 18자를 넘을 수 없습니다.');
        return false;
      }
      if (this.registerInfoParam.memberName.length > 18) {
        alert('이름은 최대 18자를 넘을 수 없습니다.');
        return false;
      }
      if (this.registerInfoParam.memberNickname.length > 18) {
        alert('닉네임은 최대 18자를 넘을 수 없습니다.');
        return false;
      }
      if (this.registerInfoParam.memberEmail.length > 120) {
        alert('이메일은 최대 120자를 넘을 수 없습니다.');
        return false;
      }
      this.registerInfoParam.memberPhone = this.registerInfoParam.memberPhone.replaceAll('-', '');
      if (this.registerInfoParam.memberPhone.length > 18) {
        alert('전화번호는 최대 18자를 넘을 수 없습니다.');
        return false;
      }
      let reg = /[$&+,:;=?@#|'<>.^*()%!-]/g; // 특수문자 매칭
      if(this.registerInfoParam.memberId.search(reg) !== -1) {
        alert('아이디에는 특수문자가 포함될 수 없습니다.');
        return false;
      }
      if(this.registerInfoParam.memberName.search(reg) !== -1) {
        alert('이름에는 특수문자가 포함될 수 없습니다.');
        return false;
      }
      if(this.registerInfoParam.memberNickname.search(reg) !== -1) {
        alert('닉네임에는 특수문자가 포함될 수 없습니다.');
        return false;
      }
      let reg2 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-Z|a-z]/g; // 영문자, 국문자 매칭
      if(this.registerInfoParam.memberPhone.search(reg2) !== -1) {
        alert('전화번호에는 문자를 입력할 수 없습니다.');
        return false;
      }
      return true;
    },
    saveAndNext(e) {
      e.preventDefault();
      if (!this.formValidate()) {
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