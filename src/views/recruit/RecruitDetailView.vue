<template>
  <basic-layout>
    <b-row>
      <b-col lg="8">
        <img src="https://picsum.photos/600/400/?image=82">
        <h1>{{recruitDetail.recruitTitle}}</h1>

        <div>
          {{recruitDetail.companyId}}
        </div>

        <div>
          지원 시작: {{new Date(new Date(recruitDetail.recruitStartAt))}} <br>
          지원 마감: {{new Date(recruitDetail.recruitEndAt)}}
        </div>

        <div>
          {{workArea}}
        </div>

        <div>
          {{recruitDetail.recruitDetail}}
        </div>

        <div class="apply-control">
          <b-button variant="primary" @click="requestApply">지원하기</b-button>&nbsp;
          <b-button variant="secondary">관심공고</b-button>
        </div>
      </b-col>

      <b-col lg="4" class="apply-control-right">
        <div class="apply-control">
          <b-button variant="primary" @click="requestApply" size="lg">지원하기</b-button>&nbsp;
          <b-button variant="secondary" size="lg">관심공고</b-button>
        </div>
      </b-col>
    </b-row>

  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
export default {
  name: 'RecruitDetailView',
  data() {
    return {
      applyResult: {
        success: null
      }
    };
  },
  components: {
    BasicLayout
  },
  computed: {
    recruitId() {
      return this.$route.params.id;
    },
    recruitDetail() {
      return this.$store.getters['recruit/recruitDetail'];
    },
    isSuccess() {
      return this.$store.getters['common/isSuccess'];
    },
    workArea() {
      if (this.recruitDetail.workAreaId === 1) {
        return '프론트엔드';
      }
      if (this.recruitDetail.workAreaId === 2) {
        return '웹개발';
      }
      return '알 수 없음';
    }
  },
  watch: {
    isSuccess(val) {
      if (!val) {
        alert('공고를 불러오는데 실패했습니다.');
      }
    },
    'applyResult.success': {
      handler(val) {
        if (val) {
          alert('공고 지원에 성공했습니다.');
        } else {
          alert('공고 지원에 실패했습니다.');
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('recruit/requestRecruitById', this.recruitId);
  },
  methods: {
    requestApply() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch(
            'recruit/requestAddApply',
            { recruitId: this.recruitId, resultRef: this.applyResult }
          );
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.applyResult.success = false;
        }
      });
    }
  }
};
</script>

<style scoped>
img {
  max-height: 500px;
  max-width: 600px;
}
h1 {
  margin-top: 20px;
}
.apply-control {
  margin-top: 25px;
  margin-bottom: 25px;
}
@media ( max-width : 1400px) {
  .apply-control-right {
    display: none;
  }
}
</style>