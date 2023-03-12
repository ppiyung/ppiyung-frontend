<template>
  <div>
    <h2>회원 유형 선택</h2>
    <b-row  class="text-center select-type-control">
        <b-col lg="4" class="pb-2">
            <b-button size="lg"  variant="primary">구직 회원</b-button>
        </b-col>
        <b-col lg="4" class="pb-2">
            <b-button size="lg" variant="light">기업 회원</b-button>
        </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.select-type-control {
    justify-content: center;
    margin-top: 250px;
}
</style>
