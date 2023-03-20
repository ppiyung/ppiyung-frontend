<template>
  <basic-layout>
    <h1>알림 페이지</h1>
    <hr>
    <Notify-Nomal-Grid/>
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import NotifyNomalGrid from '@/components/notify/NotifyNomalGrid.vue';


export default {
  name: 'notify-Nomal',
  components: {
    BasicLayout,
    NotifyNomalGrid
  }
};
</script>
