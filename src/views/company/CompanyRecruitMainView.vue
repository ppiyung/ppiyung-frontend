<template>
  <basic-layout>
    <h1>우리 회사의 지원 공고</h1>

    <recruit-work-area-control />

    <div class="company-recruit-control">
      <b-dropdown id="dropdown-buttons" text="진행상태" class="m-2" v-model="isClosed">
          <b-dropdown-item-button
            @click="changeClosedOption(false)" :active="!isClosed">
            채용중만 조회
          </b-dropdown-item-button>
          <b-dropdown-item-button
            @click="changeClosedOption(true)" :active="isClosed">
            마감 포함
          </b-dropdown-item-button>
      </b-dropdown>

      <div>
        <b-button
          class="new-recruit-btn"
          variant="primary"
          @click="() => { this.$router.push({ name: 'company/newRecruit' }) }">새 공고</b-button>
      </div>
    </div>

    <company-recruit-list />
   </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import RecruitWorkAreaControl from '@/components/recruit/RecruitWorkAreaControl.vue';
import CompanyRecruitList from '@/components/recruit/CompanyRecruitList.vue';

export default {
  name: 'CompanyRecruitView',
  components: {
    BasicLayout,
    RecruitWorkAreaControl,
    CompanyRecruitList
  },
  data() {
    return {
      isClosed: false
    }
  },
  methods: {
    changeClosedOption(option) {
      this.isClosed = option;
    }
  },
  computed: {
    workArea() {
      return this.$store.getters['recruit/selectedWorkArea'];
    }
  },
  watch: {
    isClosed(val) {
      this.$store.commit('recruit/setPageOption', { closed: val });
    }
  }
};
</script>

<style scoped>
.company-recruit-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>