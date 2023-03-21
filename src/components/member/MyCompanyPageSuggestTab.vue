<template>
  <b-tab title="입사 제안 목록">
    <h3>
      <span id="mypageNickname">{{ memberInfo.memberNickname }}</span> 님이 보낸
      입사 제안 목록
    </h3>
    <br />
    <div v-if="!proposalsList.length" class="fadeNotice">
      아직 제안보낸 지원자가 없습니다.
    </div>
    <div v-else>
      <b-table :items="proposalsList" :fields="fields" striped responsive="sm">
        <template #row-details="row">
          <b-card>
            <b-row>
              <b-col sm="2" class="text-sm-right"><b>기업 이름 </b></b-col>
              <b-col>{{ row.item.companyName }}</b-col>
            </b-row>
            <b-row>
              <b-col sm="2" class="text-sm-right"><b>구직자 이름 </b></b-col>
              <b-col>{{ row.item.memberName }}</b-col>
            </b-row>
            <b-row>
              <b-col sm="2" class="text-sm-right"><b>제안직무</b></b-col>
              <b-col>{{ row.item.workAreaName }}</b-col>
            </b-row>
            <b-row>
              <b-col sm="2" class="text-sm-right"><b>구직자 번호</b></b-col>
              <b-col>{{ row.item.memberPhone }}</b-col>
            </b-row>
            <b-row>
              <b-col sm="2" class="text-sm-right"><b>제안 일시</b></b-col>
              <b-col>{{ row.item.suggestCreatedAt }}</b-col>
            </b-row>
          </b-card>
        </template>
        <template #cell(resumeLocation)="row">
        <b-button size="sm" class="mr-2" @click="downloadResume(row.item.memberId)"> 다운로드 </b-button>
        </template>
      </b-table>
    </div>
  </b-tab>
</template>
<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      fields: [
        {
          key: "companyName",
          label: "기업 이름",
          sortable: true,
        },
        {
          key: "memberName",
          label: "구직자 이름",
          sortable: true,
        },
        {
          key: "memberPhone",
          label: "구직자 번호",
          sortable: true,
        },
        {
          key: "workAreaName",
          label: "제안 직무 ",
          sortable: true,
        },
        {
          key: "suggestCreatedAt",
          label: "제안 일시 ",
          sortable: true,
        },
        {
          key: "resumeLocation",
          label: "이력서 열람",
          sortable: true,
        }
      ],
      downloadResult: {
        success: null,
      },
    };
  },
  computed: {
    memberInfo() {
      return this.$store.getters["auth/memberInfo"];
    },
    proposalsList() {
      return this.$store.getters["recruit/proposalsList"].map((item) => {
        return {
          ...item,
          suggestCreatedAt: dayjs
            .unix(item.suggestCreatedAt / 1000)
            .format("YYYY/MM/DD"),
        };
      });
    },
  },
  watch: {
    "downloadResult.success": {
      handler(val) {
        if (val === false) {
          alert("이력서 다운로드 실패했습니다.");
        }
        this.downloadResult.success = null;
      },
    },
  },
  mounted() {},
  created() {
    this.$store.dispatch("auth/authRequest", {
      requestCallback: () => {
        this.$store.dispatch(
          "recruit/sentProposalsList",
          this.memberInfo.memberId
        );
      },
      failedCallback: (error) => {
        console.error("실패");
        console.error(error);
        this.$store.commit("common/setSuccess", false);
      },
    });
  },
  methods: {
    downloadResume(memberId) {
      this.$store.dispatch("auth/authRequest", {
        requestCallback: () => {
          this.$store.dispatch("recruit/downloadResume", {
            memberId: memberId,
            resultRef: this.downloadResult,
          });
        },
        failedCallback: (error) => {
          console.error("실패");
          console.error(error);
          this.downloadResult.success = false;
        },
      });
    },
  },
};
</script>

<style>
#mypageNickname {
  background-color: cornsilk;
}
</style>
