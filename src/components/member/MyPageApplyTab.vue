<template>
  <b-tab title="지원현황" active>
<!-- 지원현황 API /recruit/apply/member/{회원 ID} -->
  <div>
     <b-table striped hover :items="applyList"></b-table>
  </div>
{{ applyList }}
    <span>
    </span>
  </b-tab>
</template>

<script>
export default {

    computed: {
      memberInfo() {
        return this.$store.getters['auth/memberInfo']
      },
      applyList(){
        return this.$store.getters['recruit/applyListById']
      }
},
    mounted() {
        this.$store.dispatch('auth/authRequest', {
            requestCallback: () => {
                this.$store.dispatch('recruit/applyListById', this.memberInfo.memberId);
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

<style>
.duplicate-indicator {
  margin-bottom: 10px;
}
</style>