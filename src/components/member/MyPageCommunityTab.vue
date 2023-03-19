<template>
    <b-tab title="지원현황" active>

    </b-tab>
</template>


<script>
export default {
  computed: {
        memberInfo() {
            return this.$store.getters["auth/memberInfo"];
      },
        suggestList(){
          return this.$store.getters["recruit/suggestList"]
        }
    
    },
      mounted() {
          this.$store.dispatch('auth/authRequest', {
              requestCallback: () => {
                  this.$store.dispatch('recruit/suggestList', this.memberInfo.memberId);
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
.duplicate-indicator {
  margin-bottom: 10px;
}
</style>