<template>
  <basic-layout>
    마이페이지
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="업로드할 이미지를 선택해주세요."
      drop-placeholder="이곳에 이미지 드래그"
    ></b-form-file>
    <b-button @click="uploadImg">업로드</b-button>
    <img :src="imgUrl">
  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';

export default {
  data() {
    return {
      file: null,
      imgUrl: ''
    };
  },
  computed: {
    memberInfo() {
      return this.$store.getters['auth/memberInfo'];
    }
  },
  methods: {
    uploadImg() {
      this.$axios.postForm(
        // `${this.$apiUri.member}/img/${this.memberInfo.memberId}`,
        `${this.$apiUri.member}/img`,
        {
          file: this.file
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${this.$store.getters['auth/accessToken']}`
          }
        }
      )
        .then((result) => {
          console.log(result);
          this.imgUrl = `${this.$apiUri.resources}/images/${result.data.payload.imgLocation}`;
        })
        .catch((result) => {
          console.error(result);
        });
    }
  },
  components: {
    BasicLayout
  }
};
</script>

<style>

</style>
