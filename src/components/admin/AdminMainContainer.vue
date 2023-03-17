<template>
    <div class="dashboard-container">
        <ul>
            <li>현재 진행중인 채용: {{statistics.ongoingRecruits}}건</li>
            <li>현재 채용 지원자: {{statistics.applyMembers}}명</li>
        </ul>
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