<template>
  <b-tab title="관심 채용 정보">
    <h3>{{ memberInfo.memberNickname }}님의 관심 채용 정보</h3>
    <br />
    <div v-if="!bookMarkList.length" class="fadeNotice">관심 채용 정보가 존재하지 않습니다.</div>
    <div v-else>{{ bookMarkList }}</div>
  </b-tab>
</template>

<script>
export default {
  computed: {
    memberInfo() {
      return this.$store.getters["auth/memberInfo"];
    },
    bookMarkList() {
      return this.$store.getters["recruit/bookMarkList"];
    },
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

<style>
.fadeNotice{
    font-weight: 900;
    text-align: center;
    margin-top: 100px;
    color: darkgray;
    font-size: 35px;
}
</style>
