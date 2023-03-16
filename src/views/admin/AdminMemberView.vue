<template>
  <basic-layout>
    <div>
      <h1>회원 관리</h1>
      <admin-member-table /> 
    </div>
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import AdminMemberTable from '@/components/admin/AdminMemberTable.vue';

export default {
  name: 'AdminMemberView',
  components: {
    BasicLayout, AdminMemberTable
  }
};
</script>
