<template>
  <div>
    <b-card id="notify-appply"
     v-if="applyId !== 0"
     :title="'[지원현황 알림메세지] - 채용공고명: ' + recruitTitle"
     class="mb-2">
            <b-card-text v-model="notifyInfoParam">
             안녕하세요. {{ this.memberName }} 님! <br>
             해당 채용공고의 <span style="color: blue">지원자 현황</span>이 업데이트 되었습니다. <br>
             자세한 사항은 마이페이지를 확인해주세요. 
             <br><br>
             알림시간: {{ this.notifyInfoParam.createdAtFormmated }}
             <br>
             <b-button variant="primary" class="mr-2">
                <router-link class="text-white" :to="{ name: 'myCompany' }">
                  MyPage
                </router-link>
             </b-button>
            
            <b-button @click="deleteSubmit">
              Delete
            </b-button>
            </b-card-text>
    </b-card>

    <b-card id="notify-suggest"
     v-if="suggestId !== 0"
      :title="'[인재저격 알림메세지] - 채용공고명: ' + recruitTitle"
      class="mb-2">
            <b-card-text v-model="notifyInfoParam">
            안녕하세요. {{ this.memberName }} 님! <br>
            공개구직자에게 <span style="color: blue">입사제안</span>요청을 완료했습니다. <br>
            자세한 사항은 마이페이지를 확인해주세요.
            <br><br>
            알림시간: {{ this.notifyInfoParam.createdAtFormmated }}
            <br>
              <b-button variant="primary" class="mr-2">
               <router-link class="text-white" :to="{ name: 'myCompany' }">
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
  props: [
    'notificationId', 'memberId', 'applyId', 'notificationCreatedAt', 'memberName',
    'applyResult', 'recruitId', 'recruitTitle', 'suggestId'
  ],
  data() {
    return {
      query: '',
      searchResult: [],
      notifyInfoParam: {
        createdAtFormmated: dayjs.utc(this.notificationCreatedAt).format("YYYY년 MM월 DD일 HH시 mm분 ss초"),
         memberId: this.$store.getters['auth/memberInfo'].memberId
      }
    };
  },

  methods: {
    deleteSubmit() {
      this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch('notify/requestDeleteCompanyNotify', this.notificationId);
      },
      failedCallback: (error) => {
        console.error('실패');
        console.error(error);
        this.$store.commit('common/setSuccess', false);
      }
    });
    }
  },

  created() {
    return this.notificationCreatedAt
    

  }
};
</script>

<style scoped>
.card {
  width: 1000px;
  cursor: pointer;
}
</style>
