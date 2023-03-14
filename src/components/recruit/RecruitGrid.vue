<template>
  <div class="recruit-container">
    <recruit-card
      v-for="recruit in recruitList"
      :key="recruit.recruitId"
      :recuritId="recruit.recruitId"
      :companyId="recruit.companyId"
      :recruitTitle="recruit.recruitTitle"
      :recruitDetail="recruit.recruitDetail"
      :recruitStartAt="new Date(recruit.recruitStartAt).toISOString()"
      :recruitEndAt="new Date(recruit.recruitEndAt).toISOString()"/>
  </div>
</template>

<script>
import RecruitCard from './RecruitCard.vue';

export default {
  components: {
    RecruitCard
  },
  computed: {
    recruitList() {
      return this.$store.getters['recruit/recruitList'];
    },
    workArea() {
      return this.$store.getters['recruit/selectedWorkArea'];
    }
  },
  watch: {
    workArea() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch('recruit/requestRecruitListByWorkArea');
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.$store.commit('common/setSuccess', false);
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch('recruit/requestRecruitListByWorkArea');
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
.recruit-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>
