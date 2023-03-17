<template>
  <basic-layout>
    <h1>커뮤니티 관리</h1>
    <admin-board-container /> 
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import AdminBoardContainer from '@/components/admin/AdminBoardContainer.vue';

export default {
  name: 'AdminMemberView',
  components: {
    BasicLayout, AdminBoardContainer
  }
};
</script>
