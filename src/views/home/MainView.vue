<template>
  <base-layout>
    <admin-main-container v-if="memberType === 'ROLE_ADMIN'" />
    <company-main-container v-if="memberType === 'ROLE_COMPANY'" />
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/common/BaseLayout.vue';
import AdminMainContainer from '@/components/admin/AdminMainContainer.vue';
import CompanyMainContainer from '@/components/member/CompanyMainContainer.vue';
export default {
  name: 'HomeView',
  components: {
    BaseLayout, AdminMainContainer ,CompanyMainContainer
  },
  computed: {
    memberType() {
      return this.$store.getters['auth/memberInfo'].role;
    }
  }
};
</script>
