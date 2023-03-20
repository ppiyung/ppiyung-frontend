<template>
    <base-layout>
        <company-new-recruit-input />
    </base-layout>
</template>

<script>
import BaseLayout from '@/components/common/BaseLayout.vue';
import CompanyNewRecruitInput from '@/components/recruit/CompanyNewRecruitInput.vue';

export default {
  name: 'NewRecruitView',
  components: {
    BaseLayout, CompanyNewRecruitInput
  }
}
</script>

<style>

</style>