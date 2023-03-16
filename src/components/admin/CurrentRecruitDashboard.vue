<template>
    <div>
        <b-button>
            진행중인 채용건 조회
        </b-button>

        <ul>
            <li>현재 진행중인 채용: {{statistics.ongoingRecruits}}건</li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        statistics() {
            return this.$store.getters['admin/recruitStatistics']
        }
    }
}
</script>

<style>

</style>