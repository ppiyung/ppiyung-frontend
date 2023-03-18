<template>
  <b-container>
    <div class="d-flex justify-content-between mb-4">
      <h2 class="mb-0">커뮤니티 게시글</h2>
      <div>
        <b-button variant="primary" @click="moveInsertPage()">새 글쓰기</b-button>
      </div>
    </div>
    <b-list-group>
      <b-list-group-item
        v-for="article in boardList"
        :key="article.articleId"
        class="flex-column align-items-start"
        @click="moveToDetailPage(article.articleId)"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ article.articleTitle}}</h5>
          <small>{{article.articleCreatedAt}}</small>
        </div>
        <p class="mb-1"> {{article.articleContent}}</p>
        <small class="ml-auto">
         {{article.memberNickname}} &bull;  {{article.likeCnt}} Likes &bull;{{article.commentCnt}}Comments
        </small>
      </b-list-group-item>
    </b-list-group>
    <div class="btn-cover" align="center" style = "margin: 15px 25px 15px 0px; padding: 10px;">
      <b-button variant="secondary" :disabled="pageNum === 1" @click="prevPage" class="page-btn">
        이전
      </b-button >
      <span class="page-count">{{ pageNum }} / {{ pageCount }} 페이지</span>
      <b-button variant="secondary" class="page-btn" :disabled="pageNum===pageCount" @click="nextPage">
        다음
      </b-button>
    </div>
  </b-container>
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
    "boardDetail",
  ],
 

  // 데이터를 반환하는 형태들. (게시물 선택하면 넘어가는 값들?)
  data() {
    return {
      query: "",
      searchResult: [],
      pageNum: 1
    };
  },
  watch:{
     boardList() {
      return this.$store.getters['board/boardList'];
    }
  },
  computed: {
    boardList() {
      return this.$store.getters['board/boardList'];
    },
    pageCount () {

    let listLeng = this.$store.getters['board/boardTotal'],
    page = Math.floor(parseFloat(listLeng)/3);
    if ((listLeng % 3) > 0) page += 1;
    // 만약 16개의 게시물에서 화면에 보여질 게시물이 3이면 나머지 값는 1을 초과 하므로 => 1/6 페이지로 나타내야 하므로. 위 공식을 씀.
    //  console.log(page);
    return page;
    },
  },
  methods: {
    // 커뮤니티 게시글 이동하는 메서드 작성
    moveToDetailPage(id) {
      console.log(id);
      this.$router.push({
        name: "boardDetail",
        params: { id }
      });
    },
    // 커뮤니티 게시글을 생성하는 메서드
    moveInsertPage(){
      this.$router.push({
        name: "boardInsert"
      })
    },
    nextPage () {
      this.pageNum += 1;
      this.$store.dispatch('board/requestBoardList',this.pageNum);
    },
    prevPage () {
      this.pageNum -= 1;
      this.$store.dispatch('board/requestBoardList',this.pageNum);
    }
  },
  created() {
    this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch('board/requestBoardList',1);
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
