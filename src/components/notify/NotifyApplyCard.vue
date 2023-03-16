<template>
  <div>
    <b-card
      :title="'입사지원 알림메세지 - 채용공고명: ' + this.recruitTitle"
      class="mb-2">
        <b-card-text>
          지원자 {{ this.memberId }} 님, 채용기업 {{ this.memberId }}에서 이력서를 열람했습니다. <br>
          진행상황은 마이페이지를 확인해주세요.
          <b-button @click="moveToMyPage(this.memberId)" variant="primary">마이페이지</b-button>
        </b-card-text>

    </b-card>
    <h1>(card)......</h1>

    <b-card
      :title="'입사지원 알림메세지 - 채용공고명: ' + this.recruitTitle"
      class="mb-2">
            <b-card-text>
             지원자 {{ this.memberId }} 님, 채용기업 {{ this.memberId }}의 채용공고 지원결과가 반영되었습니다. <br>
             진행상황은 마이페이지를 확인해주세요.
             <b-button @click="moveToMyPage(this.memberId)" variant="primary">마이페이지</b-button>
            </b-card-text>
    </b-card>

    <h1>(card)?.....</h1>
  </div>
</template>

<script>
export default {
  props: [
    'notificationId', 'memberId', 'applyId', 'notificationCreatedAt', 
    'applyResult', 'recruitId', 'recruitTitle'
  ],
  data() {
    return {
      query: '',
      searchResult: []
    };
  },
  methods: {
    moveToDetailPage(id) {
       console.log(id);
       this.$router.push({
         name: "notifyDetail",
         params: { id }
       });

  }
},

};
</script>

<style scoped>
.card {
  width: 500px;
  cursor: pointer;
}
</style>
