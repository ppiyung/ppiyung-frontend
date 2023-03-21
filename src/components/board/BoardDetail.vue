<template>
  <div class="container my-4">
    <div id="button" align="right">
      <div>
        <b-button
          v-if="memberId === boardDetail.memberId"
          variant="secondary"
          @click="moveToDetailPage(boardDetail.articleId)"
          class="d-inline-block mr-2"
          >수정</b-button
        >
        <b-button
          v-if="memberId === boardDetail.memberId"
          variant="secondary"
          @click="deletePost()"
          class="d-inline-block"
          >삭제</b-button
        >
      </div>
    </div>
    <b-card>
      <b-card-header>
        <h4 class="mb-0">{{ boardDetail.articleTitle }}</h4>
        <div class="d-flex align-items-center">
          <small class="text-muted mr-2">{{
            boardDetail.articleCreatedAt
          }}</small>
          <small>{{ boardDetail.memberNickname }}</small>
        </div>
        <div align="right">
          <h5 class="mb-1">  
            <font-awesome-icon style="color: black" icon="fa-solid fa-heart" />
           {{ boardDetail.likeCnt }}
          <font-awesome-icon icon="fa-solid fa-comment" />
           {{ boardDetail.commentCnt }} </h5>
        
        </div>
      </b-card-header>
      <b-card-body>
        {{ boardDetail.articleContent }}
      </b-card-body>
      <b-card-footer>
        <div
          v-if="memberId !== boardDetail.memberId"
          :active="likechecked"
          @click="toggleLike()"> 
          <font-awesome-icon style="color: red" icon="fa-solid fa-heart"  v-if="!likechecked" size="2x" />
          <font-awesome-icon style="color: black" icon="fa-solid fa-heart"  v-if="likechecked" size="2x"  />

        </div>
      </b-card-footer>
    </b-card>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "BoardDetailView",

  data() {
    return {
      // isLiked: false,
    };
  },
  watch: {
    boardDetail() {
      return this.$store.getters["board/boardList"];
    },
  },
  computed: {
    likechecked: {
      get() {
        return this.$store.getters["board/likechecked"];
      },
      set(value) {
        this.$store.commit("board/setLikechecked", value);
      },
    },
    memberId() {
      return this.$store.getters["auth/memberInfo"].memberId;
    },
    articleId() {
      return this.$route.params.id;
    },
    boardDetail() {
      return this.$store.getters["board/boardDetail"];
    },
  },
  created() {
    this.loadArticleDetail();

    // 좋아요 여부 조회
    this.$store.dispatch("auth/authRequest", {
      requestCallback: () => {
        this.$store.dispatch("board/checkedLike", {
          memberId: this.memberId,
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
  methods: {
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
    // 게시물 수정 페이지 전환
    moveToDetailPage(id) {
      console.log(id);
      this.$router.push({
        name: "BoardModify",
        params: { id },
      });
    },
    // 게시물 삭제 페이지 메소드
    deletePost() {
      console.log(this.articleId);
      this.$store.dispatch("auth/authRequest", {
        requestCallback: () => {
          this.$store.dispatch("board/deleteBoard", {
            articleId: this.articleId,
          });
        },
        failedCallback: (error) => {
          console.error("실패");
          console.error(error);
        },
      });
    },

    //좋아요 버튼 클릭
    toggleLike() {
      // 버튼 상태가 '좋아요' 클릭이 가능하면.
      if (this.likechecked === null || this.likechecked === false) {
        this.likechecked = !this.likechecked;
        this.$store.dispatch("auth/authRequest", {
          requestCallback: () => {
            this.$store.dispatch("board/insertLike", {
              articleId: this.articleId,
              memberId: this.memberId,
              likeCreatedAt: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
              reloadFuncRef: this.loadArticleDetail
            });
          },
          failedCallback: (error) => {
            console.error("실패");
            console.error(error);
          },
        });
      } else {
        //이미 좋아요 버튼을 클릭한 경우라면.
        this.likechecked = !this.likechecked;
        this.$store.dispatch("auth/authRequest", {
          requestCallback: () => {
            this.$store.dispatch("board/cencleLike", {
              articleId: this.articleId,
              memberId: this.memberId,
              reloadFuncRef: this.loadArticleDetail
            });
          },
          failedCallback: (error) => {
            console.error("실패");
            console.error(error);
          },
        });
      }
    },
  },
};
</script>
<style scoped>
#button {
  margin-bottom: 20px;
}
#LikeImg {
  width: 50px;
  height: 50px;
}
#disLikeImg {
  width: 50px;
  height: 50px;
}
</style>
