<template>
  <b-tab title="지원현황" active>
    <div>
      <b-table :items="applyList" :fields="fields" striped responsive="sm">
        <template #cell(show_details)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            상세정보 {{ row.detailsShowing ? "닫기" : "보기" }}
          </b-button>
        </template>

        <template #cell(resumeLocation)>
          <b-button size="sm" class="mr-2"> 다운로드 </b-button>
        </template>

        <template #cell(sendJobOffer)="row">
          <b-button
            size="sm"
            class="mr-2"
            @click="sendJobOffer(row.item.memberId)"
          >
            입사제안 보내기
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>지원자 거주지 :</b></b-col>
              <b-col>{{ row.item.memberAddr }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>지원자 연락처 :</b></b-col>
              <b-col>{{ row.item.memberPhone }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>지원자 이메일 :</b></b-col>
              <b-col>{{ row.item.memberEmail }}</b-col>
            </b-row>
          </b-card>
        </template>
      </b-table>
    </div>
  </b-tab>
</template>

<script>
export default {
  computed: {
        applyList() {
          return this.$store.getters['recruit/openedResumeList']
                .map((item) => {
                  return {...item, _showDetails: false};
                });
        },
        selectedWorkArea() {
          return this.$store.getters['recruit/selectedWorkArea'];
        },
        memberInfo() {
          return this.$store.getters['auth/memberInfo'];
    },
      }
}
</script>

<style scoped>
.duplicate-indicator {
  margin-bottom: 10px;
}
</style>