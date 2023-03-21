<template>
  <b-tab title="내가 쓴 게시글">
    <h3>
      <span id="mypageNickname">{{ memberInfo.memberNickname }}</span> 님이 쓴
      게시글
    </h3>
    <br />
    <div v-if="!myCommunityList.length" class="fadeNotice">
      게시글이 존재하지 않습니다.
    </div>
    <div v-else>
      <b-table
        :items="myCommunityList"
        :fields="fields"
        striped
        responsive="sm"
      >
        <template #cell(articleTitle)="row">
            <!-- <span @click="moveToDetailPage(row.item.articleId)">{{row.item.articleTitle }}</span> -->
            <router-link :to="{ name: 'boardDetail', params: { id: row.item.articleId } }">{{row.item.articleTitle }}</router-link>
        </template>

      </b-table>
    </div>
  </b-tab>
</template>


<script>
export default {
 
  data() {
    return {
      fields: [
        {
          key: "articleTitle",
          label: "게시글 제목",
          sortable: true,
        },
        {
          key: "articleContent",
          label: "게시글 내용",
          sortable: false,
        },
        {
          key: "articleCreatedAt",
          label: "작성 날짜",
          sortable: true,
        },
        {
          key: "likeCnt",
          label: "좋아요 수",
          sortable: true,
        },
        {
          key: "commentCnt",
          label: "댓글 수",
          sortable: true,
        },
      ],
    };
  },
  computed: {
 
    memberInfo() {
      return this.$store.getters["auth/memberInfo"];
    },
    myCommunityList() {
      return this.$store.getters["board/myCommunityList"];
    },
  },
   methods: {
    moveToDetailPage(id) {
      console.log(id);
      this.$router.push({
        name: 'boardDetail',
        params: { id }
      });
    }
  },
  mounted() {
    this.$store.dispatch("auth/authRequest", {
      requestCallback: () => {
        this.$store.dispatch("board/myCommunityList", this.memberInfo.memberId);
      },
      failedCallback: (error) => {
        console.error("실패");
        console.error(error);
        this.$store.commit("common/setSuccess", false);
      },
    });
  },
};
</script>

<style scoped>
.duplicate-indicator {
  margin-bottom: 10px;
}
#mypageNickname {
  background-color: cornsilk;
}
</style>