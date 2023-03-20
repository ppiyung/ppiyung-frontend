<template>
    <base-layout>
        <company-edit-recruit-input />
    </base-layout>
</template>

<script>
import BaseLayout from '@/components/common/BaseLayout.vue';
import CompanyEditRecruitInput from '@/components/recruit/CompanyEditRecruitInput.vue';

export default {
  name: 'NewRecruitView',
  components: {
    BaseLayout, CompanyEditRecruitInput
  }
}
</script>

<style>

</style>