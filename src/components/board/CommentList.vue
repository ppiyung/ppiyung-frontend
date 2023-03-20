<template>
  <div class="container my-4">
    <h2>Comments</h2>
    <b-list-group>
      <b-list-group-item
        v-for="comment in replyList"
        :key="comment.replyId"
        class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ comment.replyContent}}</h5>
          <small>{{comment.replyCreatedAt}}</small>
        </div>
        <div>
        <small class="ml-auto">
         {{comment.memberId}} &bull; 
        </small><div>
        <b-button
          v-if="memberId === boardDetail.memberId"
          variant="secondary"
          @click="moveToDetailPage()"
          class="d-inline-block mr-2"
          >수정</b-button
        >
        <b-button
          v-if="memberId === replyList.memberId"
          variant="secondary"
          @click="deletePost()"
          class="d-inline-block"
          >삭제</b-button
        >
      </div>
        </div>
      </b-list-group-item>
      <!-- <b-list-group-item v-for="comment in comments" :key="comment.id">
        {{ comment.text }}
      </b-list-group-item> -->
    </b-list-group>
  </div>
</template>
<script>
export default {
  
  data() {
    return {
      query: "",
      searchResult: [],
    }
  },
  computed:{
    articleId() {
      return this.$route.params.id;
    },
    replyList(){
      return this.$store.getters['board/replyList'];
    }
  },
  created() {
    //  // 게시물 세부 내역 가져오기
    //   this.$store.dispatch("auth/authRequest", {
    //     requestCallback: () => {
    //       this.$store.dispatch("board/requestBoardDetail", this.articleId);
    //     },
    //     failedCallback: (error) => {
    //       console.error("실패");
    //       console.error(error);
    //       this.$store.commit("common/setSuccess", false);
    //     },
    //   });
   // 댓글 목록 가져오기 
     this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch('board/requestReplyList',{
          articleId : this.articleId
        });
      },
      failedCallback: (error) => {
        console.error('실패');
        console.error(error);
        this.$store.commit('common/setSuccess', false);
      }
    });
  }

}
</script>

