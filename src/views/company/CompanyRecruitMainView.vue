<template>
  <basic-layout>
    <recruit-work-area-control />
    <div>
    <b-dropdown id="dropdown-buttons" text="진행상태" class="m-2">
        <b-dropdown-item-button>채용중</b-dropdown-item-button>
        <b-dropdown-item-button active>채용마감</b-dropdown-item-button>
    </b-dropdown> 
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
  }
};
</script>
