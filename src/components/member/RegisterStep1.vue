<template>
  <div>
    <h2>회원 유형 선택</h2>
    <b-row  class="text-center select-type-control">
        <b-col lg="4" class="pb-2">
            <b-button size="lg" variant="primary" @click="selectType('N')">구직 회원</b-button>
        </b-col>
        <b-col lg="4" class="pb-2">
            <b-button size="lg" variant="light" @click="selectType('C')">기업 회원</b-button>
        </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  methods: {
    selectType(memberType) {
      this.$store.commit('member/setRegisterMemberType', memberType);
      this.$store.commit('member/nextRegisterStep');
    }
  },
};
</script>

<style scoped>
.select-type-control {
    justify-content: center;
    margin-top: 250px;
}
</style>
