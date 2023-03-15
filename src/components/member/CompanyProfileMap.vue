<template>
  <div class="map-container" ref="map_container"></div>
</template>

<script>
export default {
  props: [
    'coordX', 'coordY'
  ],
  mounted() {
    const container = this.$refs.map_container;
    const options = {
      // eslint-disable-next-line
      center: new kakao.maps.LatLng(this.coordY, this.coordX), // 지도의 중심좌표.
      level: 3
    };

    // eslint-disable-next-line
    this.mapRef = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // eslint-disable-next-line
    this.markerRef = new kakao.maps.Marker({
      position: this.mapRef.getCenter()
    });

    this.markerRef.setMap(this.mapRef);
  }
};
</script>

<style scoped>
.map-container {
  width: 500px;
  height: 400px;
}
</style>
