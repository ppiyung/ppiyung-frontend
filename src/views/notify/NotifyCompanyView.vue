<template>
  <basic-layout>
    <h1>입사제안 알림 페이지</h1>
    <hr>
    <Notify-Company-Grid/>
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import NotifyCompanyGrid from '@/components/notify/NotifyCompanyGrid.vue';


export default {
  name: 'notify-Company',
  components: {
    BasicLayout,
    NotifyCompanyGrid
  }
};
</script>
