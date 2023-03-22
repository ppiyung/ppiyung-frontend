<template>
  <div class="recruit-container" ref="resultContainer">
    <recruit-card
      v-for="recruit in recruitList"
      :key="recruit.recruitId"
      :recuritId="recruit.recruitId"
      :companyName="recruit.companyName"
      :recruitTitle="recruit.recruitTitle"
      :recruitDetail="recruit.recruitDetail"
      :companyImg="recruit.imgLocation ? `${$apiUri.resources}/images/${recruit.imgLocation}` : 'default.png'"
      :recruitStartAt="recruit.recruitStartAt"
      :recruitEndAt="recruit.recruitEndAt"/>

      <div v-if="recruitList.length === 0">
        등록된 채용 공고가 없습니다.
      </div>
  </div>
</template>

<script>
import RecruitCard from './RecruitCard.vue';

export default {
  components: {
    RecruitCard
  },
  methods: {
    handleWindowScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
       this.handleLoadMore();
      }
    },
    handleLoadMore() {
      if (this.currentPage < this.totalPage) {
        this.$store.commit(
          "recruit/setPageOption",
          { page: this.currentPage + 1 }
        );
        this.dispatchGetMore(false);
      }
    },
    dispatchGetMore() {
        this.$store.dispatch('auth/authRequest', {
          requestCallback: () => {
            this.$store.dispatch('recruit/requestRecruitListByWorkAreaAccumualtion');
          },
          failedCallback: (error) => {
            console.error('실패');
            console.error(error);
            this.$store.commit('common/setSuccess', false);
          }
        });
    }
  },
  computed: {
    recruitList() {
      return this.$store.getters['recruit/recruitList'];
    },
    workArea() {
      return this.$store.getters['recruit/selectedWorkArea'];
    },
    currentPage() {
      return this.$store.getters['recruit/pageOption'].page;
    },
    totalPage() {
      return this.$store.getters['recruit/pageOption'].total;
    }
  },
  watch: {
    workArea() {
      this.$store.commit("recruit/setPageOption", {page: 1, closed: false} ); // 페이지를 초기화해준다.
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch('recruit/requestRecruitListByWorkArea');
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.$store.commit('common/setSuccess', false);
        }
      });
    }
  },
  mounted() {
    this.$store.commit("recruit/setPageOption", {page: 1, size: 12, closed: false} ); 

    document.addEventListener('scroll', this.handleWindowScroll);

    this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch('recruit/requestRecruitListByWorkArea');
      },
      failedCallback: (error) => {
        console.error('실패');
        console.error(error);
        this.$store.commit('common/setSuccess', false);
      }
    });
  },

  beforeDestroy() {
    document.removeEventListener('scroll', this.handleWindowScroll);
  }
};
</script>

<style scoped>
.recruit-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>
