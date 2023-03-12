<template>
  <basic-layout>
    <h1>회원가입</h1>
     <register-step-1 />
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import RegisterStep1 from '@/components/member/RegisterStep1.vue';

export default {
  name: 'RegisterView',
  components: {
    BasicLayout,
    RegisterStep1
  }
};
</script>
