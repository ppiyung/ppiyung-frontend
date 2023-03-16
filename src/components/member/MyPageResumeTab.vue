<template>
  <b-tab title="나의 이력서 관리" active>
    마이페이지
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="업로드할 이미지를 선택해주세요."
      drop-placeholder="이곳에 이미지 드래그"
    ></b-form-file>
    <b-button @click="uploadImg">업로드</b-button>
    <img :src="imgUrl" />

    <b-form-file
      v-model="resumeFile"
      :state="Boolean(resumeFile)"
      placeholder="업로드할 이력서를 선택해주세요."
      drop-placeholder="이곳에 이력서 드래그"
    ></b-form-file>
    <b-button @click="uploadResume">업로드</b-button>
    <b-button @click="getResume">이력서 다운로드</b-button>``

  </b-tab>
</template>

<script>
export default {
  name: "ResumeTab",
  data() {
    return {
      file: null,
      imgUrl: "",
      resumeFile: null,
    };
  },
  computed: {
    memberInfo() {
      return this.$store.getters["auth/memberInfo"];
    },
  },
  methods: {
    uploadImg() {
      this.$axios
        .postForm(
          // `${this.$apiUri.member}/img/${this.memberInfo.memberId}`,
          `${this.$apiUri.member}/img`,
          {
            file: this.file,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${this.$store.getters["auth/accessToken"]}`,
            },
          }
        )
        .then((result) => {
          console.log(result);
          this.imgUrl = `${this.$apiUri.resources}/images/${result.data.payload.imgLocation}`;
        })
        .catch((result) => {
          console.error(result);
        });
    },
    uploadResume() {
      this.$axios
        .postForm(
          // `${this.$apiUri.member}/${this.memberInfo.memberId}/resume`,
          `${this.$apiUri.member}/resume`,
          {
            file: this.resumeFile,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${this.$store.getters["auth/accessToken"]}`,
            },
          }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((result) => {
          console.error(result);
        });
    },
    getResume() {
      this.$axios
        .get(`${this.$apiUri.member}/${this.memberInfo.memberId}/resume`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/accessToken"]}`,
          },
          responseType: "blob",
        })
        .then((response) => {
          const blob = new Blob([response.data]);
          const fileObjectUrl = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = fileObjectUrl;
          link.style.display = "none";

          const disposition = response.headers["content-disposition"];
          console.log(response.headers);
          link.download = decodeURI(
            disposition
              .match(/fileName[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
              .replace(/['"]/g, "")
          );

          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(fileObjectUrl);
        })
        .catch((response) => {
          console.error(response);
          alert("이력서 다운로드에 실패했습니다.");
        });
    }
  }
};
</script>

<style>
</style>
