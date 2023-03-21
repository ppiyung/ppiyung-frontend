<template>
  <basic-layout>
    <b-row>
      <b-col lg="8">
        <b-card
          :img-src="recruitDetail.imgLocation"
        >
          <h1>{{recruitDetail.recruitTitle}}</h1>

          <div>
            <router-link :to="{ name: 'companyProfile', params: { id: recruitDetail.companyId } }">{{recruitDetail.companyName}}</router-link>
            <br><br>
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
          <b-button variant="primary" @click="requestApply" :disabled="isAlreadyApplied">
            {{isAlreadyApplied ? '지원완료' : '지원하기'}}
          </b-button> &nbsp;
          <b-button variant="secondary" @click="requestAddBookmark" :disabled="isAlreadyBookmarked">
            {{isAlreadyBookmarked ? '관심공고 추가 완료' : '관심공고'}}
          </b-button>
        </div>
      </b-col>

      <b-col lg="4" class="apply-control-right">
        <div class="apply-control">
          <b-button variant="primary" @click="requestApply" size="lg" :disabled="isAlreadyApplied">
            {{isAlreadyApplied ? '지원완료' : '지원하기'}}
          </b-button> &nbsp;
          <b-button variant="secondary" size="lg" @click="requestAddBookmark" :disabled="isAlreadyBookmarked">
            {{isAlreadyBookmarked ? '관심공고 추가 완료' : '관심공고'}}
          </b-button>
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
      },
      preloadApplyResult: {
        success: null
      },
      preloadBookmarkResult: {
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
    bookmarkHistory() {
      return this.$store.getters['recruit/bookMarkList'];
    },
    applyHistory() {
      return this.$store.getters['recruit/applyListById'];
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
    },
    isAlreadyBookmarked() {
      if (!this.preloadApplyResult.success
          || !this.preloadBookmarkResult.success) {
            return;
      }

      const result = this.bookmarkHistory.find(item => {
        if (item.recruit_id === this.recruitDetail.recruitId) {
          return true;
        }
      });
      
      return result === undefined ? false : true;
    },
    isAlreadyApplied() {
      const result = this.applyHistory.find(item => {
        if (item.applyRecruit.recruitId === this.recruitDetail.recruitId) {
          return true;
        }
      });

      return result === undefined ? false : true;
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
          this.$router.go(0);
        } else if (val === false) {
          alert('공고 지원에 실패했습니다.');
        }
        this.applyResult.success = null;
      }
    },
    'bookmarkResult.success': {
      handler(val) {
        if (val === true) {
          alert('관심공고 추가에 성공했습니다.');
          this.$router.go(0);
        } else if (val === false) {
          alert('관심공고 추가에 실패했습니다.');
        }
        this.applyResult.success = null;
      }
    },
    'preloadBookmarkResult.success': {
      handler(val) {
        if (val === false) {
          alert('데이터를 로드하는 중 문제가 발생했습니다.');
        }
      }
    },
    'preloadApplyResult.success': {
      handler(val) {
        if (val === false) {
          alert('데이터를 로드하는 중 문제가 발생했습니다.');
        }
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
              resultRef: this.applyResult
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
            { recruitId: this.recruitId, resultRef: this.bookmarkResult }
          );
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.bookmarkResult.success = false;
        }
      });
    },
    loadApplyHistory() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch(
            'recruit/requestApplyList',
            { memberId: this.memberInfo.memberId, resultRef: this.preloadApplyResult }
          );
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.preloadResult.success = false;
        }
      });
    },
    loadBookmarkHistory() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch(
            'recruit/requestBookmark',
            { memberId: this.memberInfo.memberId, resultRef: this.preloadBookmarkResult }
          );
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.preloadResult.success = false;
        }
      });
    }
  }
};
</script>

<style scoped>
a {
  color: #007bff !important;
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