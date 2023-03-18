<template>
  <basic-layout>
  <board-detail/>
  </basic-layout>
</template>
<script>
import BasicLayout from "@/components/common/BaseLayout.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
export default {
  name: "BoardDetailView",

  components: {
    BasicLayout,
    BoardDetail
  }
};
</script>