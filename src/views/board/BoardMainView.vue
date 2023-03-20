<template>
  <basic-layout>
    <div>
      <!-- 게시판 메인페이지 -->
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
}
</script>
