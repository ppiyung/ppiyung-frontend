<template>
 <b-list-group>
   <b-list-group-item
    class="flex-column align-items-start"
    @click="moveToDetailPage(article.articleId)"
    v-for="article in boardList"
    :key="article.articleId">
      <div class="d-flex w-100 justify-conent-between">
        <h5 class="mb-1">{{article.articleTitle}}</h5>
        <small align="right">{{article.articleCreatedAt}}</small>
      </div>
      <div >
      <p class="mb-1"> {{article.articleContent}}</p>
      <small> {{article.memberNickname}}</small>
      <small> {{article.likeCnt}} {{article.commentCnt}}</small>
      </div>
    </b-list-group-item>
 </b-list-group>
</template>

<script>
export default {
  props: [
    // 자식 컴포넌트에 전달하는 것들
    "articleId",
    "articleTitle",
    "articleContent",
    "commentCnt",
    "likeCnt",
    "memberNickname",
    "articleCreatedAt",
    "boardDetail"
  ],
  // 데이터를 반환하는 형태들. (게시물 선택하면 넘어가는 값들?)
  data() {
    return {
      query: "",
      searchResult: [],
    };
  },
  computed: {
    // articleId(){
    //   return this.$route.params.id;
    // }
    // ,
    boardList() {
      return this.$store.getters['board/boardList'];
    }
  },
  methods: {
    // 커뮤니티 게시글 이동하는 메서드 작성
    // 게시글id 값을 받아서 전달.
    moveToDetailPage(id) {
      console.log(id);
      this.$router.push({
        name: "boardDetail",
        params: { id }
      });
    },
  },
  created() {
    this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch('board/requestBoardList');
      },
      failedCallback: (error) => {
        console.error('실패');
        console.error(error);
        this.$store.commit('common/setSuccess', false);
      }
    });
  },
};
</script>
