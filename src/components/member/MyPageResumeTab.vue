<template>
  <b-tab title="나의 이력서 관리" active>
    <!-- {{memberInfo}} -->
    <h3>
      <span id="mypageNickname">{{ memberInfo.memberNickname }}</span> 님의
      이력서
    </h3>
    <br/>
    <div>
      {{ memberInfo.memberNickname }} 님의 이력서 :
      {{ memberDetail.memberResume.resumeFilename }} <br><br>
      이력서 올린 날짜:{{ memberDetail.memberResume.resumeUpdatedAt }} <br><br>
      이력서 공개 여부:

      {{ memberDetail.memberResume.resumeOpen }} 
      <input
        type="radio"
        name="resumeOpen"
        value="true"
        checked="checked"
      />공개 <input type="radio" name="resumeOpen" value="false" />비공개 <br><br>
    </div>

    <b-form-file
      v-model="resumeFile"
      :state="Boolean(resumeFile)"
      placeholder="업로드할 이력서를 선택해주세요."
      drop-placeholder="이곳에 이력서 드래그"
    ></b-form-file>
    <div class="resumeButtonContainer">  
        <b-button @click="uploadResume" style=" margin-right: 10px;">업로드</b-button>
    <b-button @click="getResume">이력서 다운로드</b-button>
    </div>

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
    memberDetail() {
      return this.$store.getters["member/memberDetail"];
    },
  },
  methods: {
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
    },
  },
};
</script>

<style>
#mypageNickname {
  background-color: cornsilk;
}
.resumeButtonContainer{
   float: right;
  margin: 50px;

}
</style>
