<template>
    <div>
        <b-button>
            진행중인 채용지원자 조회
        </b-button>

        <ul>
            <li>현재 채용 지원자: {{statistics.applyMembers}}명</li>
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