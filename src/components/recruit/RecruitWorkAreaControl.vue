<template>
  <b-container>
    <b-button class="mr-2" v-for="workArea in workAreaList"
      :key="workArea.workAreaId"
      pill
      :variant="workAreaId === workArea.workAreaId ? 'primary' : 'outline-primary'"
      @click="setWorkArea(workArea.workAreaId)">
      {{ workArea.workAreaName }}
    </b-button>
  </b-container>
</template>

<script>
export default {
  computed: {
    workAreaId() {
      return this.$store.getters['recruit/selectedWorkArea'];
    },
    workAreaList() {
      return this.$store.getters['common/workArea'];
    }
  },
  methods: {
    setWorkArea(id) {
      this.$store.commit('recruit/setWorkArea', id);
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
