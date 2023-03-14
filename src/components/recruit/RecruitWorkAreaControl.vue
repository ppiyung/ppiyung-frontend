<template>
  <b-container>
    <b-button
        pill
        :variant="workAreaId === 1 ? 'primary' : 'outline-primary'"
        @click="setWorkArea(1)">
        프론트엔드
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
  computed: {
    workAreaId() {
      return this.$store.getters['recruit/selectedWorkArea'];
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
