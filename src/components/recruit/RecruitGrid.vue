<template>
  <ul class="recruit-container" ref="resultContainer">
    <recruit-card
      v-for="recruit in recruitList"
      :key="recruit.recruitId"
      :recuritId="recruit.recruitId"
      :companyId="recruit.companyId"
      :recruitTitle="recruit.recruitTitle"
      :recruitDetail="recruit.recruitDetail"
      :recruitStartAt="new Date(recruit.recruitStartAt).toISOString()"
      :recruitEndAt="new Date(recruit.recruitEndAt).toISOString()"/>
  </ul>
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
      this.$store.commit("recruit/setPageOption", {page: 1} ); // 페이지를 초기화해준다.
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
