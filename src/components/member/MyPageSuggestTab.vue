<template>
  <b-tab title="입사 제안">
    <h3><span id="mypageNickname">{{memberInfo.memberNickname}}</span> 님에게 온 입사 제안</h3>
    <br />
     <div v-if="suggestList.length === 0" class="fadeNotice">
      요청받은 입사제안 내역이 없습니다.
    </div>
    <div v-else>
      <b-table :items="suggestList" :fields="fields" striped responsive="sm">
        <template #cell(companyName)="row">
            <!-- <span @click="moveToDetailPage(row.item.articleId)">{{row.item.articleTitle }}</span> -->
            <router-link :to="{ name: 'companyProfile', params: { id: row.item.companyId } }">{{row.item.companyName }}</router-link>
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
          key: "companyName",
          label: "입사 제안한 회사",
          sortable: true,
        },
        {
          key: "suggestCreatedAt",
          label: "입사 제안 온 날짜 ",
          sortable: true,
        }
      ],
    };
  },
  computed: {
    memberInfo() {
      return this.$store.getters["auth/memberInfo"];
    },
    suggestList() {
      return this.$store.getters["recruit/suggestList"]
      .map(item => {
        return{
          ...item,
          suggestCreatedAt: dayjs.unix(item.suggestCreatedAt / 1000).format('YYYY년 MM월 DD일')
        }
      })
    },
  },
  methods: {
    moveToDetailPage(id) {
      console.log(id);
      this.$router.push({
        name: 'companyProfile',
        params: { id }
      });
    }
  },
  mounted() {
    this.$store.dispatch("auth/authRequest", {
      requestCallback: () => {
        console.log("asdf2");
        this.$store.dispatch("recruit/suggestList", this.memberInfo.memberId);
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
#mypageNickname{
 background-color: cornsilk;
}
.fadeNotice {
  font-weight: 900;
  text-align: center;
  margin-top: 100px;
  color: darkgray;
  font-size: 35px;
}
</style>
