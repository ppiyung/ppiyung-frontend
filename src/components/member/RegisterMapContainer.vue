<template>
  <div>
    <b-row>
      <b-col>
        <b-row>
          <b-col lg="4" class="pb-2">
            <b-form-input
                v-model="query"
                placeholder="기업 검색"
            ></b-form-input>
          </b-col>
          <b-col lg="2" class="pb-2">
            <b-button
              variant="light"
              @click="searchBtn">검색</b-button>
          </b-col>
        </b-row>
        <div class="map-container" ref="map_container"></div>
      </b-col>
      <b-col lg="6" class="pb-2">
        <div v-for="place in searchResult" :key="place.id">
            <b-card :sub-title="place.place_name" @click="selectPlace(place)">
                  <b-card-text>
                    {{place.road_address_name}}
                  </b-card-text>
            </b-card>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-form-input
          v-model="addrInput"
          placeholder="주소 수동 입력"
      ></b-form-input>
    </b-row>
    <b-row>
      <b-form-input
          v-model="coordY"
          placeholder="위도 수동 입력"
      ></b-form-input>
      <b-form-input
          v-model="coordX"
          placeholder="경도 수동 입력"
      ></b-form-input>
    </b-row>
  </div>
</template>

<script>
export default {
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
  watch: {
    addrInput(val) {
      this.$store.commit('member/setRegisterInfo', { memberAddr: val });
    },
    coordX(val) {
      this.$store.commit('member/setRegisterInfo', { memberCoordX: val });
    },
    coordY(val) {
      this.$store.commit('member/setRegisterInfo', { memberCoordY: val });
    }
  },
  methods: {
    selectPlace(place) {
      // eslint-disable-next-line
      const LatLng = new kakao.maps.LatLng(place.y, place.x)

      this.mapRef.setCenter(LatLng);
      this.markerRef.setPosition(LatLng);

      this.addrInput = place.road_address_name;
      this.coordX = place.x;
      this.coordY = place.y;

      this.searchResult = [];
    },
    searchBtn() {
      this.$axios.get(
        this.$apiUri.kakaoLocationByKeyword,
        {
          params: {
            query: this.query
          },
          headers: {
            Authorization: this.$secret.KAKAO_REST_HEADER
          }
        }
      )
        .then((result) => {
          this.searchResult = result.data.documents;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  mounted() {
    const container = this.$refs.map_container;
    const options = {
      // eslint-disable-next-line
      center: new kakao.maps.LatLng(37.5063203551829, 127.041231426975), // 지도의 중심좌표.
      level: 3
    };

    // eslint-disable-next-line
    this.mapRef = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // eslint-disable-next-line
    this.markerRef = new kakao.maps.Marker({
      position: this.mapRef.getCenter()
    });

    this.markerRef.setMap(this.mapRef);

    // eslint-disable-next-line
    kakao.maps.event.addListener(this.mapRef, 'click', (mouseEvent) => {
      const latlng = mouseEvent.latLng;
      console.log(latlng);
      this.markerRef.setPosition(latlng);

      this.coordY = latlng.getLat();
      this.coordX = latlng.getLng();
    });
  }
};
</script>

<style scoped>
.map-container {
  width: 500px;
  height: 400px;
}
</style>
