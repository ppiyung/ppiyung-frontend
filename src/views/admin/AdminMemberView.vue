<template>
  <basic-layout>
    <div>
      <h1>회원 관리</h1>
      <admin-member-container /> 
    </div>
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import AdminMemberContainer from '@/components/admin/AdminMemberContainer.vue';

export default {
  name: 'AdminMemberView',
  components: {
    BasicLayout, AdminMemberContainer
  }
};
</script>
