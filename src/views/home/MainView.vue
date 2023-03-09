<template>
  <base-layout>
    메인 영역
    {{ userInfo }}
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/common/BaseLayout.vue';

export default {
  name: 'HomeView',
  components: {
    BaseLayout
  },
  computed: {
    userInfo() {
      return this.$store.getters.getMemberInfo;
    }
  }
};
</script>
