<template>
  <div class="dashboard-container">
    <b-card class="companyTopBox">
      <b-card-header class="bg-light">
        <strong>채용 진행 현황</strong>
      </b-card-header>
      <b-card-body class="text-center">
        <b-row>
          <b-col>
            <div class="text-muted">채용 확정 인원</div>
            <div class="h4 font-weight-bold mt-3">
              {{ companyRecruitList.applicantsPassed }}
            </div>
          </b-col>
          <b-col>
            <div class="text-muted">총 지원자 수</div>
            <div class="h4 font-weight-bold mt-3">
              {{ companyRecruitList.applicantsNum }}
            </div>
          </b-col>
          <b-col>
            <div class="text-muted">마감한 채용</div>
            <div class="h4 font-weight-bold mt-3">
              {{ companyRecruitList.closedRecruitNum }}
            </div>
          </b-col>
          <b-col>
            <div class="text-muted">진행중인 채용</div>
            <div class="h4 font-weight-bold mt-3">
              {{ companyRecruitList.recruitingNum }}
            </div>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-card class="companyBottomBox">
      <div v-if="allRecruitListCompany.length === 0" class="fadeNotice">
        진행중인 채용공고가 없습니다.
      </div>
      <div v-else>
        <b-table :items="allRecruitListCompany" :fields="fields" striped responsive="sm">
          <template #cell(recruitTitle)="row">
              <router-link :to="{ name: 'recruitDetail', params: { id: row.item.recruitId } }">{{row.item.recruitTitle }}</router-link>
          </template>
        </b-table>
      </div>
    </b-card>
  </div>
</template>
<script>
import dayjs from 'dayjs';
export default {
   data() {
    return {
      fields: [
        {
          key: "recruitTitle",
          label: "채용공고",
          sortable: true,
        },
        {
          key: "workAreaId",
          label: "직무분야",
          sortable: false,
        },  
          {
          key: "recruitStartAt",
          label: "채용 시작 날짜",
          sortable: true,
        }, 
          {
          key: "recruitEndAt",
          label: "채용 마감 날짜",
          sortable: true,
        } 
      ]
    };
  },
  computed: {
   
    memberInfo() {
      return this.$store.getters["auth/memberInfo"];
    },
    companyRecruitList() {
      return this.$store.getters["recruit/companyRecruitList"];
    },
    allRecruitListCompany() {
      return this.$store.getters["recruit/allRecruitListCompany"]
      .map(item => {
        return{
          ...item,
          recruitStartAt: dayjs.unix(item.recruitStartAt / 1000).format('YYYY년 MM월 DD일'),
          recruitEndAt:  dayjs.unix(item.recruitEndAt / 1000).format('YYYY년 MM월 DD일')
       }
      })
    },
  },
  mounted() {
    this.$store.dispatch("auth/authRequest", {
      requestCallback: () => {
        this.$store.dispatch("recruit/companyRecruitList", {
          memberId: this.memberInfo.memberId,
        });
      },
      failedCallback: (error) => {
        console.error("실패");
        console.error(error);
        this.$store.commit("common/setSuccess", false);
      },
    });
    this.$store.dispatch("auth/authRequest", {
      requestCallback: () => {
        this.$store.dispatch("recruit/allRecruitListCompany", {
          companyId: this.memberInfo.memberId,
        });
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
.dashboard-container {
  margin: 100px 60px;
}
.companyTopBox,
.companyBottomBox {
  border: 1px solid gray;
  margin-top: 50px;
  border-radius: 30px;
}
.fadeNotice {
  font-weight: 900;
  text-align: center;
  color: darkgray;
  font-size: 35px;
}
</style>