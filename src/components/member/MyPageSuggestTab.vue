<template>
  <b-tab title="입사 제안">
             <h3>{{memberInfo.memberNickname}}님에게 온 입사 제안</h3> <br>
               <div v-if="!suggestList.length" class="fadeNotice">아직 입사 제안이 오지 않았습니다.</div>
                <div v-else>{{ suggestList }}</div>

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
              console.log('asdf2');
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
