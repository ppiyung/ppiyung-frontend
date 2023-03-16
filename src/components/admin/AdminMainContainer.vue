<template>
    <div class="dashboard-container">
        <current-recruit-dashboard />
        <current-applying-dashboard />
    </div>
</template>

<script>
import CurrentApplyingDashboard from './CurrentApplyingDashboard.vue'
import CurrentRecruitDashboard from './CurrentRecruitDashboard.vue'

export default {
    components: {
        CurrentApplyingDashboard, CurrentRecruitDashboard
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