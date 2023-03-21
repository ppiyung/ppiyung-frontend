<template>
  <b-tab title="지원현황" >
     <h3><span id="mypageNickname">{{memberInfo.memberNickname}}</span> 님이 지원한 목록</h3> <br>
    <div class="apply-container">
      <div v-if="!applyList.length" class="fadeNotice">
        지원한 이력이 없습니다.
      </div>
      <div v-else>
        <b-table :items="applyList" :fields="fields" striped responsive="sm">
          <template #cell(companyName)="row">
            <!-- <span @click="moveToDetailPage(row.item.articleId)">{{row.item.articleTitle }}</span> -->
            <router-link :to="{ name: 'companyProfile', params: { id: row.item.applyRecruit.companyId } }">{{row.item.applyRecruit.companyName}}</router-link>
          </template>
        
          <template #cell(recruitTitle)="row">
            <!-- <span @click="moveToDetailPage(row.item.articleId)">{{row.item.articleTitle }}</span> -->
            <router-link :to="{ name: 'recruitDetail', params: { id: row.item.applyRecruit.recruitId } }">{{row.item.applyRecruit.recruitTitle}}</router-link>
          </template>
        </b-table>
      </div>
    </div>
    <span> </span>
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
          label: "입사 지원한 회사",
          sortable: false,
        },
        {
          key: "recruitTitle",
          label: "채용 공고 ",
          sortable: true,
        },
         {
          key: "applyRecruit.workAreaId",
          label: "직무 분야 ",
          sortable: true,
        },
           {
          key: "applyRecruit.recruitStartAt",
          label: "채용 시작일 ",
          sortable: true,
        },
          {
          key: "applyRecruit.recruitEndAt",
          label: "채용 마감일 ",
          sortable: true,
        }
        
      ],
    };
  },
  computed: {
    memberInfo() {
      return this.$store.getters["auth/memberInfo"];
    },
    applyList() {
      return this.$store.getters["recruit/applyListById"]
        .map(item => {
          return {
            ...item,
            applyRecruit: {
              ...item.applyRecruit,
              recruitStartAt: dayjs.unix(item.applyRecruit.recruitStartAt / 1000).format('YYYY년 MM월 DD일'),
              recruitEndAt: dayjs.unix(item.applyRecruit.recruitEndAt / 1000).format('YYYY년 MM월 DD일')
            }
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
        this.$store.dispatch("recruit/applyListById", this.memberInfo.memberId);
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
.applyBox {
  font-weight: 900;
}
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