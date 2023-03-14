<template>
    <b-card :title="recruitTitle" :sub-title="companyId" img-src="https://picsum.photos/600/400/?image=82" class="mb-2">
            <b-card-text>
            공고 시작: {{recruitStartAt}} <br>
            공고 마감: {{recruitEndAt}}
            </b-card-text>
    </b-card>
</template>

<script>
export default {
  props: [
    'recuritId', 'companyId', 'recruitTitle', 'recruitDetail',
    'workAreaId', 'recruitStartAt', 'recruitEndAt'
  ],
  data() {
    return {
      query: '',
      searchResult: [],
      mapRef: null,
      markerRef: null,
      addrInput: '',
      coordX: null,
      coordY: null
    };
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style scoped>
.card {
  width: 250px;
}
</style>
