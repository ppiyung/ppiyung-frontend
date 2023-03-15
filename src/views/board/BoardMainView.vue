<template>
  <basic-layout>
    <div>
      커뮤니티 페이지 영역
    </div>
    <board-container/>
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import BoardContainer from '@/components/board/BoardContainer.vue';


export default {
  name: 'BoardView',
  components: {
    BasicLayout,
    BoardContainer
  }
};
</script>
