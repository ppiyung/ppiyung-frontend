<template>
  <basic-layout>
    <h1>회원가입</h1>
      <register-step-1 v-if="registerStep === 1" />
      <register-step-2 v-if="registerStep === 2" />
      <register-step-3 v-if="registerStep === 3" />
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import RegisterStep1 from '@/components/member/RegisterStep1.vue';
import RegisterStep2 from '@/components/member/RegisterStep2.vue';
import RegisterStep3 from '@/components/member/RegisterStep3.vue';

export default {
  name: 'RegisterView',
  components: {
    BasicLayout,
    RegisterStep1,
    RegisterStep2,
    RegisterStep3
  },
  computed: {
    registerStep() {
      return this.$store.getters['member/registerInfo'].currentStep;
    }
  }
};
</script>
