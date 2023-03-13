<template>
  <div>
    <h2>3단계 (<span v-if="this.registerType === 'N'">구직 회원</span>
<span v-if="this.registerType === 'C'">기업 회원</span>)
    </h2>

    <b-row>
      <b-col lg="1" class="pb-2">
          {{ isCompany ? '주 채용 분야' : '희망 직무 분야' }}
      </b-col>
      <b-col lg="4" class="pb-2">
        <b-form-select
            v-model="registerInfoParam.workAreaId"
            :options="workAreaType"
        ></b-form-select>
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
          @click="submit">&gt; 회원가입</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerInfoParam: {},
      workAreaType: [
        { value: 1, text: '프론트엔드' },
        { value: 2, text: '웹개발' }
      ]
    };
  },
  computed: {
    registerType() {
      return this.$store.getters['member/registerInfo'].memberType;
    },
    isCompany() {
      return this.registerType === 'C';
    },
    isSuccess() {
      return this.$store.getters['common/isSuccess'];
    }
  },
  watch: {
    isSuccess(val) {
      if (val) {
        alert('회원가입에 성공했습니다.');
        this.$router.push({ name: 'login' });
      } else {
        alert('회원가입에 실패했습니다.');
      }
    }
  },
  methods: {
    submit() {
      this.$store.commit('member/setRegisterInfo', this.registerInfoParam);
      this.$store.dispatch('member/register');
    }
  }
};
</script>

<style scoped>
</style>
