<template>
  <b-tab title="관심 채용 정보">
     <h3><span id="mypageNickname">{{memberInfo.memberNickname}}</span> 님의 관심 채용 정보</h3>
    <br />
    <div v-if="!bookMarkList.length" class="fadeNotice">
      관심 채용 정보가 존재하지 않습니다.
    </div>
    <div v-else>
      <b-table :items="bookMarkList" :fields="fields" striped responsive="sm">
       <template #cell(recruit_title)="row">
            <!-- <span @click="moveToDetailPage(row.item.articleId)">{{row.item.articleTitle }}</span> -->
            <router-link :to="{ name: 'recruitDetail', params: { id: row.item.recruit_id } }">{{row.item.recruit_title }}</router-link>
        </template>
      </b-table>
    </div>
  </b-tab>
</template>

<script>
import dayjs from 'dayjs';
export default {
  data() {
    return {
      fields: [
        {
          key: "work_area_id",
          label: "직무분야",
          sortable: true,
        },
        {
          key: "recruit_title",
          label: "채용 공고 제목",
          sortable: false,
        },
        {
          key: "recruit_detail",
          label: "채용 공고 내용",
          sortable: false,
        },
        {
          key: "recruit_start_at",
          label: "채용 시작 날짜",
          sortable: true,
        },
         {
          key: "recruit_end_at",
          label: "채용 마감 날짜",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    memberInfo() {
      return this.$store.getters["auth/memberInfo"];
    },
    bookMarkList() {
      const rawData = this.$store.getters["recruit/bookMarkList"];

      if(Object.keys(rawData).length === 0) {
        return rawData;
      }

      return rawData
       .map(item => {
        return{
          ...item,
          recruit_start_at: dayjs.unix(item.recruit_start_at / 1000).format('YYYY년 MM월 DD일'),
          recruit_end_at:  dayjs.unix(item.recruit_end_at / 1000).format('YYYY년 MM월 DD일')
       }
      })
    },
  },
   methods: {
    moveToDetailPage(id) {
      console.log(id);
      this.$router.push({
        name: 'recruitDetail',
        params: { id }
      });
    }
  },
  mounted() {
    this.$store.dispatch("auth/authRequest", {
      requestCallback: () => {
        this.$store.dispatch("recruit/bookMarkList", this.memberInfo.memberId);
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
.fadeNotice {
  font-weight: 900;
  text-align: center;
  margin-top: 100px;
  color: darkgray;
  font-size: 35px;
}
#mypageNickname{
 background-color: cornsilk;
}
</style>
