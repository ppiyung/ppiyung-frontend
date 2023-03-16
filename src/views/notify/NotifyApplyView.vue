<template>
  <basic-layout>
    <h1>지원현황 알림 페이지</h1>
    <Notify-Apply-Grid/>
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import NotifyApplyGrid from '@/components/notify/NotifyApplyGrid.vue';


export default {
  name: 'notify-apply',
  components: {
    BasicLayout,
    NotifyApplyGrid
  }
};
</script>
