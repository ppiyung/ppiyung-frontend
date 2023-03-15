<template>
    <basic-layout>
        
        <h2>이력서 공개 지원자</h2>
        <recruit-work-area-control />
        <recruit-opened-resume-list />
    </basic-layout>

</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import RecruitWorkAreaControl from '@/components/recruit/RecruitWorkAreaControl.vue';
import RecruitOpenedResumeList from '@/components/recruit/RecruitOpenedResumeList.vue';

export default {
  name: 'RecruitJobOfferView',
  components : {
    BasicLayout,
    RecruitWorkAreaControl,
    RecruitOpenedResumeList
  }
}
</script>
