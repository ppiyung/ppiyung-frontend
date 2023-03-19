<template>
  <b-tab title="입사 제안">
             <h3>{{memberInfo.memberNickname}}님에게 온 입사 제안</h3> <br>
            {{ suggestList }}
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

<style>
</style>
