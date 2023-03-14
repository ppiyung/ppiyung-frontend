<template>
  <basic-layout>
    <h1>채용</h1>
    <recruit-work-area-control />
     <recruit-grid />
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import RecruitGrid from '@/components/recruit/RecruitGrid.vue';
import RecruitWorkAreaControl from '@/components/recruit/RecruitWorkAreaControl.vue';

export default {
  name: 'RecruitView',
  components: {
    BasicLayout,
    RecruitGrid,
    RecruitWorkAreaControl
  }
};
</script>
