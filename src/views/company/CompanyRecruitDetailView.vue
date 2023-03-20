<template>
  <basic-layout>
    <h1>&lt;{{recruitDetail.recruitTitle}}&gt; 공고의 지원자</h1>

    <div class="additional-info">
      <div>시작: {{ recruitDetail.recruitStartAt }}</div>
      <div>마감: {{ recruitDetail.recruitEndAt }}</div>
    </div>


    <company-apply-list />
   </basic-layout>
</template>


<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import CompanyApplyList from '@/components/recruit/CompanyApplyList.vue';
import dayjs from 'dayjs';

export default {
  name: 'CompanyRecruitDetailView',
  components: {
    BasicLayout,
    CompanyApplyList
  },
  computed: {
    recruitDetail() {
      const recruitDetailRaw = this.$store.getters['recruit/recruitDetail']

      return {
        ...recruitDetailRaw,
        recruitStartAt: dayjs.unix(recruitDetailRaw.recruitStartAt / 1000).format('YYYY년 MM월 DD일'),
        recruitEndAt: dayjs.unix(recruitDetailRaw.recruitEndAt / 1000).format('YYYY년 MM월 DD일'),
      }
    },
    recruitId() {
      return this.$route.params.recruitId;
    }
  },
  watch: {
  },
  created() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch(
              'recruit/requestRecruitById',
              this.recruitId
          );
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.$store.commit('common/setSuccess', false);
        }
      });
  }
};
</script>

<style scoped>
.additional-info {
  display: flex;
  justify-content: space-between;
  width: 300px;
  font-size: 80%;
  margin: 20px 0;
}
</style>