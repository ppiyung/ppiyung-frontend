<template>
<basic-layout>
<b-row>
    <b-col cols="12" md="auto">{{boardDetail.articleTitle}}</b-col>
    <b-col>{{boardDetail.articleCreatedAt}}</b-col>
    <b-col col lg="2">{{boardDetail.memberNickname}}</b-col>
</b-row>
<b-row>
  <b-col cols="12" md="auto">{{boardDetail.articleContent}}</b-col>
</b-row>
</basic-layout>

</template>
<script>
import BasicLayout from '@/components/common/BaseLayout.vue';

export default {
    name: 'BoardDetailView',

    components :{
       BasicLayout
    },
    computed :{
        articleId(){
            return this.$route.params.id;
        },
        boardDetail(){
            return this.$store.getters['board/boardDetail'];
        }
    },
    created() {
    this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch('board/requestBoardDetail',this.articleId);
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

</style>
