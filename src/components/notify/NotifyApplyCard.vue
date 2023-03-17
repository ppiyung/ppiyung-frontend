<template>
  <div>
    <b-card id="notify-appply"
     v-if="applyId != 0"
     
      :title="'지원결과 알림메세지 - 채용공고명: ' + this.recruitTitle"
      class="mb-2">
            <b-card-text v-model="notifyInfoParam">
             지원자 {{ this.member }} 님, 채용기업 {{ this.memberId }}의 지원결과가 반영되었습니다. <br>
             진행상황은 마이페이지를 확인해주세요.
             <br>
             알림시간: {{ this.notificationCreatedAt }}
             <br>
             <b-button variant="primary" class="mr-2">
                <router-link class="text-white" :to="{ name: 'mypage' }">
                  MyPage
                </router-link>
             </b-button>
             
            <b-button @click="deleteSubmit">
              Delete
            </b-button>
            </b-card-text>
    </b-card>

    <b-card id="notify-suggest"
     v-if="suggestId != 0"
      :title="'입사제안 알림메세지 - 채용공고명: ' + this.recruitTitle"
      class="mb-2">
            <b-card-text v-model="notifyInfoParam">
             지원자 {{ this.memberId }} 님, 채용기업 {{ this.memberId }}에서 입사제안을 요청했습니다. <br>
             진행상황은 마이페이지를 확인해주세요.
             <br>
             알림시간: {{ notificationCreatedAt }}
             <br>
             <b-button variant="primary" class="mr-2">
                <router-link class="text-white" :to="{ name: 'mypage' }">
                  MyPage
                </router-link>
            </b-button>
            <b-button @click="deleteSubmit">
              Delete
            </b-button>
            </b-card-text>
    </b-card>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  component: { dayjs },

  props: [
    'notificationId', 'memberId', 'applyId', 'notificationCreatedAt', 
    'applyResult', 'recruitId', 'recruitTitle', 'suggestId'
  ],
  data() {
    // dayjs(); // 현재 날짜 및 시간 가져오기

    return {
      query: '',
      searchResult: [],
      // notifyInfoParam: {notificationCreatedAt : dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"), memberId : this.$store.getters['auth/memberInfo'].memberId }
      notifyInfoParam: {
        notificationCreatedAt: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
         memberId: this.$store.getters['auth/memberInfo'].memberId
      }
    };
  },

  methods: {
    deleteSubmit() {
      this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch('notify/requestDeleteNotify', this.notificationId);
      },
      failedCallback: (error) => {
        console.error('실패');
        console.error(error);
        this.$store.commit('common/setSuccess', false);
      }
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
