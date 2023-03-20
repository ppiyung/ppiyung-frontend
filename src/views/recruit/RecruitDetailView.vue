<template>
  <basic-layout>
    <b-row>
      <b-col lg="8">
        <b-card
          :img-src="recruitDetail.imgLocation"
        >
          <h1>{{recruitDetail.recruitTitle}}</h1>

          <div>
            모집 기업: {{recruitDetail.companyName}}
          </div>
          
          <div>
            지원 시작: {{recruitDetail.recruitStartAt}} <br>
            지원 마감: {{recruitDetail.recruitEndAt}}
          </div>

          <div>
            채용 분야: {{workArea}}
          </div>

          <div v-html="recruitDetail.recruitDetail" class="recruit-detail">
          </div>
        </b-card>

        <div class="apply-control">
          <b-button variant="primary" @click="requestApply">지원하기</b-button>&nbsp;
          <b-button variant="secondary" @click="requestAddBookmark">관심공고</b-button>
        </div>
      </b-col>

      <b-col lg="4" class="apply-control-right">
        <div class="apply-control">
          <b-button variant="primary" @click="requestApply" size="lg">지원하기</b-button>&nbsp;
          <b-button variant="secondary" size="lg" @click="requestAddBookmark">관심공고</b-button>
        </div>
      </b-col>
    </b-row>

    <router-link :to="{ name: 'recruit' }">목록으로</router-link>
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
// eslint-disable-next-line
import dayjs from 'dayjs';

export default {
  name: 'RecruitDetailView',
  data() {
    return {
      applyResult: {
        success: null
      },
      bookmarkResult: {
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
      const raw = this.$store.getters['recruit/recruitDetail'];

      if (raw && Object.keys(raw).length > 0) {
        return {
          ...raw,
          recruitStartAt: dayjs.unix(raw.recruitStartAt / 1000).format('YYYY년 MM월 DD일'),
          recruitEndAt: dayjs.unix(raw.recruitStartAt / 1000).format('YYYY년 MM월 DD일'),
          imgLocation: raw.imgLocation ? `${this.$apiUri.resources}/images/${raw.imgLocation}` : '/default.png'
        }
      } else {
        return raw;
      }
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
    },
    memberInfo() {
      return this.$store.getters['auth/memberInfo'];
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
        if (val === true) {
          alert('공고 지원에 성공했습니다.');
          
        } else if (val === false) {
          alert('공고 지원에 실패했습니다.');
        }
        this.applyResult.success = null;
      }
    },
    'bookmarkResult.success': {
      handler(val) {
        if (val === true) {
          alert('공고 지원에 성공했습니다.');
          
        } else if (val === false) {
          alert('공고 지원에 실패했습니다.');
        }
        this.applyResult.success = null;
      }
    }
  },
  mounted() {
    this.loadRecruitDetail();
    this.loadApplyHistory();
    this.loadBookmarkHistory();
  },
  methods: {
    loadRecruitDetail() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch('recruit/requestRecruitById', this.recruitId);
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.$store.commit('common/setSuccess', false);
        }
      });
    },
    requestApply() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch(
            'recruit/requestAddApply',
            {
              recruitId: this.recruitId,
              memberId: this.memberInfo.memberId,
              resultRef: this.bookmarkResult
            }
          );
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.applyResult.success = false;
        }
      });
    },
    requestAddBookmark() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch(
            'recruit/requestAddBookmark',
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
a {
  color: #007bff !important;
  text-decoration: underline !important;
  cursor: pointer;
}
h1 {
  margin-top: 20px;
}
.apply-control {
  margin-top: 25px;
  margin-bottom: 25px;
}
.recruit-detail {
  margin: 20px;
}
@media ( max-width : 1400px) {
  .apply-control-right {
    display: none;
  }
}
</style>