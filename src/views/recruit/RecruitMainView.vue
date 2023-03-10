<template>
  <basic-layout>
    <h1>채용</h1>
     <recruit-grid />
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import RecruitGrid from '@/components/recruit/RecruitGrid.vue';

export default {
  name: 'RecruitView',
  components: {
    BasicLayout,
    RecruitGrid
  }
};
</script>
