<template>
  <b-tab title="입사 제안">
    <h3><span id="mypageNickname">{{memberInfo.memberNickname}}</span> 님에게 온 입사 제안</h3>
    <br />
    <div v-if="!suggestList.length" class="fadeNotice">
      아직 입사 제안이 오지 않았습니다.
    </div>
    <div v-else>
      <b-table :items="suggestList" :fields="fields" striped responsive="sm">
        <template #row-details="row">
          <b-card>
            <b-row>
              <b-col sm="3" class="text-sm-right"><b>입사 제안한 회사 </b></b-col>
              <b-col>{{ row.item.companyName }}</b-col>
            </b-row>

            <b-row>
              <b-col sm="3" class="text-sm-right"><b>입사 제안 온 날짜 </b></b-col>
              <b-col>{{ row.item.suggestCreatedAt}}</b-col>
            </b-row>
          </b-card>
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
      return this.$store.getters["recruit/suggestList"];
    },
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

<style>
#mypageNickname{
 background-color: cornsilk;
}
</style>
