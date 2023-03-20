<template>
  <b-tab title="지원현황" active>
    <h3>{{ memberInfo.memberNickname }}님이 지원한 목록</h3>
<!-- 지원현황 API /recruit/apply/member/{회원 ID} -->
  <div class= "apply-container">
    <div v-if="!applyList.length" class="fadeNotice">지원한 이력이 없습니다.</div>
    <div v-else>
        <div v-for="apply in applyList" :key="apply.applyId"> 
        <div>
          <span class="applyBox">회사이름:</span>{{ apply.applyMember.memberName }} 
          <span class="applyBox">채용공고:</span><span @click="moveToDetailPage(recuritId)" >{{ apply.applyRecruit.recruitTitle }}</span>
          <span class="applyBox">직무분야:</span>{{ apply.applyRecruit.workAreaId }}
          <span class="applyBox">채용 시작일:</span>{{ apply.applyRecruit.recruitStartAt }}
          <span class="applyBox">채용 마감일:</span>{{ apply.applyRecruit.recruitEndAt }}
        </div>
    </div>
 
    </div>
  </div> 
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
    methods: {
    moveToDetailPage(id) {
      console.log(id);
      this.$router.push({
        name: 'recruitDetail',
        params: { id }
      });
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
.applyBox { 
  font-weight: 900;
}
.fadeNotice{
    font-weight: 900;
    text-align: center;
    margin-top: 100px;
    color: darkgray;
    font-size: 35px;
}
</style>