<template>
<basic-layout>
  <div align ="right"><b-button variant="secondary" @click="moveToDetailPage(boardDetail.articleId)">수정</b-button>
  <b-button variant="secondary" @click="deletePost()">삭제</b-button></div>
  <div class="container my-4">
    <b-card>
      <b-card-header>
        <h4 class="mb-0">{{ boardDetail.articleTitle }}</h4>
        <div class="d-flex align-items-center">
          <small class="text-muted mr-2">{{ boardDetail.articleCreatedAt }}</small>
          <small>{{ boardDetail.memberNickname }}</small>
        </div>
        <div class="d-flex align-items-right">
          <small class="text-muted mr-2">like : {{ boardDetail.likeCnt }}</small>
          <small>reply : {{ boardDetail.commentCnt}}</small>
        </div>
      </b-card-header>
      <b-card-body>
        {{ boardDetail.articleContent }}
      </b-card-body>
    </b-card>
  </div>
  </basic-layout>
</template>
<script>
import BasicLayout from '@/components/common/BaseLayout.vue';

export default {
    name: 'BoardDetailView',

    components :{
       BasicLayout
    },
    data() {
      return {
      }
    },
    computed :{
        memberId(){
          return this.$$store.getters['auth/memberInfo'].memberId;
        },
        articleId(){
            return this.$route.params.id;
        },
        boardDetail(){
            return this.$store.getters['board/boardDetail'];
        }
    },
    created() {
    this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch('board/requestBoardDetail',this.articleId);
      },
        failedCallback: (error) => {
         console.error('실패');
         console.error(error);
         this.$store.commit('common/setSuccess', false);
         }
        });
    },
    methods :{
      // 게시물 수정 페이지 전환
    moveToDetailPage(id){
          console.log(id);
          this.$router.push({
          name: "BoardModify",
          params: { id }
      });
    },
    // 게시물 삭제 페이지 메소드 
     deletePost() {
      console.log(this.articleId);
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch(
            'board/deleteBoard',
            { articleId : this.articleId}
          );
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.applyResult.success = false;
        }
      });
      }
    }
}
</script>

<style scoped>

</style>
