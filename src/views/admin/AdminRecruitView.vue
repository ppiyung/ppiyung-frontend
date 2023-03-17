<template>
  <basic-layout>
      <h1>채용 공고 관리</h1>
      <admin-recruit-control />
      <admin-recruit-container /> 
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import AdminRecruitContainer from '@/components/admin/AdminRecruitContainer.vue';
import AdminRecruitControl from '@/components/admin/AdminRecruitControl.vue';

export default {
  name: 'AdminRecruitView',
  components: {
    BasicLayout, AdminRecruitContainer, AdminRecruitControl
  }
};
</script>
