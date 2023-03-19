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
        <div class="d-flex align-items-right">
          <small class="text-muted mr-2"
            >like : {{ boardDetail.likeCnt }}</small
          >
          <small>reply : {{ boardDetail.commentCnt }}</small>
        </div>
      </b-card-header>
      <b-card-body>
        {{ boardDetail.articleContent }}
      </b-card-body>
      <b-card-footer>
        <div
          v-if="memberId !== boardDetail.memberId"
          :active="isLiked"
          @click="toggleLike()"
        >
          <img src="@/assets/heart.png" id="LikeImg" v-if="!isLiked"/>
          <img src="@/assets/disHeart.png" id="disLikeImg" v-if="isLiked" />
        </div>
        <!-- <b-button v-if="memberId !== boardDetail.memberId" variant="secondary" :active="isLiked" @click="toggleLike()">
          {{ isLiked ? "좋아요 취소" : "좋아요" }}
        </b-button> -->
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
      isLiked: false,
    };
  },
  watch: {
    boardDetail() {
      return this.$store.getters["board/boardList"];
    },
  },
  computed: {
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
  methods: {
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
          this.applyResult.success = false;
        },
      });
    },

    //좋아요 버튼 클릭
    toggleLike() {
      // 버튼 상태가 '좋아요' 클릭이 가능하면.
      if (this.isLiked === false) {
        this.isLiked = !this.isLiked;
        this.$store.dispatch("auth/authRequest", {
          requestCallback: () => {
            this.$store.dispatch("board/insertLike", {
              articleId: this.articleId,
              memberId: this.memberId,
              likeCreatedAt: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            });
          },
          failedCallback: (error) => {
            console.error("실패");
            console.error(error);
            this.applyResult.success = false;
          },
        }); //이미 좋아요 버튼을 클릭한 경우라면.
      } else {
        this.isLiked = !this.isLiked;
        this.$store.dispatch("auth/authRequest", {
          requestCallback: () => {
            this.$store.dispatch("board/cencleLike", {
              articleId: this.articleId,
              memberId: this.memberId,
            });
          },
          failedCallback: (error) => {
            console.error("실패");
            console.error(error);
            this.applyResult.success = false;
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
