<template>
  <div class="container my-4">
    <h2>Comments</h2>
    <b-list-group>
      <b-list-group-item
        v-for="comment in replyList"
        :key="comment.replyId"
        class="flex-column align-items-start">
        <div
          class="d-flex w-100 justify-content-between"
          v-if="!(editCommentcheck === comment.replyId)" >
          <h5 class="mb-3">
           {{ comment.memberNickname }}
          </h5>
          <small>{{ comment.replyCreatedAt }}</small>
        </div>
        <div  v-if="!(editCommentcheck === comment.replyId)" >
        <p class="mb-2">{{ comment.replyContent }}</p></div>
        <!-- <small class="ml-auto"> &bull;  {{ comment.replyContent }} </small> -->
        <b-form v-if="editCommentcheck === comment.replyId">
          <h5 class="mb-3">
           {{ comment.memberNickname }}
          </h5>
          <b-form-group>
            <b-form-textarea
              id="commentInput"
              v-model="commentRevise"
              :placeholder= comment.replyContent
              rows="2"
            ></b-form-textarea>
          </b-form-group>
          <div align="right">
          <b-button @click="ModifyComment(comment.replyId)" variant="primary"
            >수정 완료</b-button> 
          </div>
        </b-form>
        <div align="right">
          <b-button
            variant="secondary"
            v-if="memberId === comment.memberId && !(editCommentcheck === comment.replyId) "
            @click="editSelectComment(comment.replyId)"
            class="d-inline-block mr-2"
            >수정</b-button
          >
          <b-button
            variant="secondary"
            v-if="memberId === comment.memberId && !(editCommentcheck === comment.replyId)"
            @click="deleteComment(comment.replyId)"
            class="d-inline-block"
            >삭제</b-button
          >
        </div>
      </b-list-group-item>
    </b-list-group>
    <!-- <b-form @submit.prevent="submitComment"> -->
    <b-form>
      <b-form-group>
        <b-form-textarea
          id="commentInput"
          v-model="commentContent"
          placeholder="댓글을 남겨주세요"
          rows="2"
        ></b-form-textarea>
      </b-form-group>
      <div align="right">
      <b-button @click="insertComment" variant="primary">댓글 등록</b-button>
      </div>
    </b-form>
  </div>
</template>
<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      query: "",
      searchResult: [],
      commentContent: "",
      commentRevise : "",
      editCommentcheck: null,
    };
  },
  computed: {
    memberId() {
      return this.$store.getters["auth/memberInfo"].memberId;
    },
    articleId() {
      return this.$route.params.id;
    },
    replyList() {
      return this.$store.getters["board/replyList"];
    },
  },
  created() {
    // 댓글 목록 가져오기
    this.loadCommentList();
    this.loadArticleDetail();
  },
  methods: {
    //세부 게시물 불러오기
    loadArticleDetail() {
      this.$store.dispatch("auth/authRequest", {
        requestCallback: () => {
          this.$store.dispatch("board/requestBoardDetail", this.articleId);
        },
        failedCallback: (error) => {
          console.error("실패");
          console.error(error);
          this.$store.commit("common/setSuccess", false);
        },
      });
    },
    // 댓글 목록 가져오기
    loadCommentList() {
      this.$store.dispatch("auth/authRequest", {
        requestCallback: () => {
          this.$store.dispatch("board/requestReplyList", {
            articleId: this.articleId,
          });
        },
        failedCallback: (error) => {
          console.error("실패");
          console.error(error);
          this.$store.commit("common/setSuccess", false);
        },
      });
    },
    // 댓글 삽입
    insertComment() {
      this.$store.dispatch("auth/authRequest", {
        requestCallback: () => {
          this.$store.dispatch("board/inputCommnent", {
            articleId: this.articleId,
            replyContent: this.commentContent,
            memberId: this.memberId,
            replyCreatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss.SSSZ"),
            reloadFuncRef: this.loadCommentList,
            reloadFuncArticle : this.loadArticleDetail
          });
          this.commentContent = '';
        },
        failedCallback: (error) => {
          console.error("실패");
          console.error(error);
        },
      });
    },
    // 댓글을 수정할 항목 찾기
    editSelectComment(replyid) {
      this.editCommentcheck = replyid;
    },

    // 댓글 삭제
    deleteComment(id) {
      this.$store.dispatch("auth/authRequest", {
        requestCallback: () => {
          this.$store.dispatch("board/deleteComment", {
            replyId: id,
            reloadFuncRef: this.loadCommentList,
            reloadFuncArticle : this.loadArticleDetail
          });
        },
        failedCallback: (error) => {
          console.error("실패");
          console.error(error);
        },
      });
    },
    // 댓글 수정
    ModifyComment(id){
      console.log(id);
      this.$store.dispatch("auth/authRequest",{
        requestCallback :() =>{
          this.$store.dispatch("board/modfiyComment", {
            replyId : id,
            replyCreatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss.SSSZ"),
            replyContent : this.commentRevise,
            reloadFuncRef: this.loadCommentList,
          });
          this.editCommentcheck = ''
        },
        failedCallback: (error) => {
          console.log("실패");
          console.log(error);
        }
      });
    }
    
  },
};
</script>
<style scoped>
</style>

