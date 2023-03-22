<template>
    <b-card
      :title="recruitTitle"
      :sub-title="companyName"
      :img-src="companyImg"
      class="mb-2"
      @click="moveToDetailPage(recuritId)">
            <b-card-text>
            공고 시작: {{recruitStartAtFormatted}} <br>
            공고 마감: {{recruitEndAtFormatted}}
            </b-card-text>
    </b-card>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: [
    'recuritId', 'companyName', 'recruitTitle', 'recruitDetail',
    'workAreaId', 'recruitStartAt', 'recruitEndAt', 'companyImg'
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
  computed: {
    recruitStartAtFormatted() {
      return dayjs.utc(this.recruitStartAt).format("YYYY년 MM월 DD일");
    },
    recruitEndAtFormatted() {
      return dayjs.utc(this.recruitEndAt).format("YYYY년 MM월 DD일");
    }
  },
  methods: {
    moveToDetailPage(id) {
      console.log(id);
      this.$router.push({
        name: 'recruitDetail',
        params: { id }
      });
    }
  },
  mounted() {
  }
};
</script>

<style scoped>
.card {
  width: 250px;
  cursor: pointer;
}
</style>
