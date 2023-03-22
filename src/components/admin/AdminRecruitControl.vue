<template>
  <b-container>
    <b-form-group label="마감공고 포함 여부" v-slot="{ ariaDescribedby }">
      <b-form-radio v-model="closed" :aria-describedby="ariaDescribedby" name="some-radios" value="false">제외</b-form-radio>
      <b-form-radio v-model="closed" :aria-describedby="ariaDescribedby" name="some-radios" value="true">포함</b-form-radio>
    </b-form-group>
    
    <b-button v-for="workArea in workAreaList"
        :key="workArea.workAreaId"
        pill
        :variant="workAreaId === workArea.workAreaId ? 'primary' : 'outline-primary'"
        @click="setWorkArea(workArea.workAreaId)">
        {{ workArea.workAreaName }}
    </b-button>
    <b-button
        pill
        :variant="workAreaId === 2 ? 'primary' : 'outline-primary'"
        @click="setWorkArea(2)">
        웹개발
    </b-button>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      closed: "false"
    }
  },
  computed: {
    workAreaId() {
      return this.$store.getters['admin/recruitManage'].queryOption.workArea;
    },
    workAreaList() {
      return this.$store.getters['common/workArea'];
    }
  },
  methods: {
    setWorkArea(id) {
      this.$store.commit('admin/setRecruitOption', {
        ...this.$store.getters['admin/recruitManage'].queryOption,
        workArea: id
      });
    }
  },
  watch: {
    closed(val) {
      let valueByBool;
      if (val === 'true') {
        valueByBool = true;
      } else {
        valueByBool = false;
      }

      this.$store.commit('admin/setRecruitOption', {
        ...this.$store.getters['admin/recruitManage'].queryOption,
        closed: valueByBool
      });
    }
  }
};
</script>

<style scoped>
.container {
    margin-top: 25px;
    margin-bottom: 15px;
}
</style>
