<template>
  <div class="dashboard-container">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">현재 진행중인 채용</h5>
            <p class="card-text">{{statistics.ongoingRecruits}}건</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">현재 채용 지원자</h5>
            <p class="card-text">{{statistics.applyMembers}}명</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    components: {
    },
    computed: {
        statistics() {
            return this.$store.getters['admin/recruitStatistics']
        }
    },
    created() {
        this.$store.dispatch('admin/requestRecruitStatistics', {
        requestCallback: () => {
            this.$store.dispatch('');
        },
        failedCallback: (error) => {
            console.error('실패');
            console.error(error);
            this.$store.commit('common/setSuccess', false);
        }
        });
    }
}
</script>

<style scoped>
.dashboard-container {
    margin: 100px 60px;
}
</style>