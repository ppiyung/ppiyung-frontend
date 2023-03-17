<template>
  <base-layout>
    <admin-main-container v-if="memberType === 'ROLE_ADMIN'" />
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/common/BaseLayout.vue';
import AdminMainContainer from '@/components/admin/AdminMainContainer.vue';

export default {
  name: 'HomeView',
  components: {
    BaseLayout, AdminMainContainer
  },
  computed: {
    memberType() {
      return this.$store.getters['auth/memberInfo'].role;
    }
  }
};
</script>
