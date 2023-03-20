<template>
  <basic-layout>
    <board-detail> </board-detail>
    <!-- <comment-list> </comment-list> -->
  </basic-layout>
</template>
<script>
import BasicLayout from "@/components/common/BaseLayout.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
// import CommentList from "@/components/board/CommentList.vue";
export default {
  name: "BoardDetailView",

  components: {
    BasicLayout,
    BoardDetail,
    // CommentList
  },
};
</script>