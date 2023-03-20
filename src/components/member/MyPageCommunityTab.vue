<template>
    <b-tab title="내가 쓴 게시글" >
        <h3> {{memberInfo.memberNickname}} 님이 쓴 게시글 </h3>
    <br>
      <div v-if="!myCommunityList.length" class="fadeNotice">게시글이 존재하지 않습니다.</div>
      <div v-else>{{ myCommunityList }}</div>
 
    </b-tab>
</template>


<script>
export default {
  computed: {
        memberInfo() {
            return this.$store.getters["auth/memberInfo"];
      },
        myCommunityList(){
          return this.$store.getters["board/myCommunityList"]
        }
    
    },
      mounted() {
          this.$store.dispatch('auth/authRequest', {
              requestCallback: () => {
                  this.$store.dispatch('board/myCommunityList', this.memberInfo.memberId);
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